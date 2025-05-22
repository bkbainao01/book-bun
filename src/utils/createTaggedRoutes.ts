import { Elysia } from 'elysia';

export const globalTags = new Set<string>();

export function createTaggedRoutes(
  prefix: string,
  tag: string,
  defineRoutes: (router: Elysia) => Elysia
): Elysia {
  console.log("tag >> ",tag)
  const base:any = new Elysia({ prefix });
  const router:any = defineRoutes(base);

  // เก็บ tag ไว้สำหรับ swagger
  globalTags.add(tag);

  for (const route of router.routes) {
    const r:any = route;
    r.detail ??= {};
    r.detail.tags ??= [];

    if (!r.detail.tags.includes(tag)) {
      r.detail.tags.push(tag);
    }
  }

  return router;
}
