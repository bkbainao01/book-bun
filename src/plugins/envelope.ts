import logger from '@/utils/logger';
import type { Elysia } from 'elysia';

type Meta = Record<string, unknown>;
type AppError = { code: string; message: string; details?: unknown };

const envelope = (data: unknown, meta: Meta = {}, error: AppError | null = null) => ({ data, error, meta });

export const envelopePlugin = (app: Elysia) =>
  app
    // Observability: requestId + tookMs
    .derive(({ request, set }) => {
      const requestId = request.headers.get('x-request-id') ?? crypto.randomUUID();
      set.headers['X-Request-ID'] = requestId;
      const start = performance.now();
      return { requestId, __start: start };
    })
    .onAfterHandle(({ set, __start }) => {
      const tookMs = Math.round(performance.now() - __start);
      set.headers['X-Response-Time'] = `${tookMs}ms`;
      set.headers['X-Took-Ms'] = String(tookMs);
    })
    // ใส่ helper ตอบกลับแบบมาตรฐาน
    .decorate('reply', {
      ok: (data: unknown, meta: Meta = {}) => {
        return envelope(data, meta, null);
      },
      created: (data: unknown, meta: Meta = {}) => {
        return new Response(JSON.stringify(envelope(data, meta, null)), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        });
      },
      noContent: () => new Response(null, { status: 204 }),
      fail: (status: number, error: AppError, meta: Meta = {}) => {
        return new Response(JSON.stringify(envelope(null, meta, error)), {
          status,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } as const)
    // Error กลาง → envelope เดียวกันเสมอ
    .onError((err:any) => {
      const  { code, error, set, request, setCookie, store } = err;
      set.headers['Content-Type'] = 'application/json';
      const tookMs = Number(set.headers['X-Took-Ms'] ?? 0);
      const requestId = request.headers.get('x-request-id') ?? set.headers['X-Request-ID'];

      // map สถานะ
      const statusList:any = [
        { code:400, name:'BAD REQUEST' },
        { code:401, name:'UNAUTHORIZED' },
        { code:403, name:'FORBIDDEN' },
        { code:404, name:'NOT FOUND' },
        { code:422, name:'VALIDATION' },
        { code:500, name:'INTERNAL SERVER ERROR' },
      ]
      let status = statusList.find((item: any) => item.code === (set.code || code));
      status = status?.name ?? 'UNKNOWN ERROR';
      console.log('')
      const errBody: AppError = {
        code: status,
        message: error?.message ?? 'Internal Server Error',
        details: error?.details ?? 'Internal Server Error'
      };

      const meta = { requestId, tookMs };
      return new Response(JSON.stringify(envelope(null, meta, errBody)), { status: set.code || code });
    });
