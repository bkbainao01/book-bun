import { UserSessionService } from "@/services/userSessionService";

const userSessionService = new UserSessionService()

export async function verifyToken({ bearer, jwt, set, reply }: any) {
  try {
    if (!bearer) {
      set.code = 401
      return reply.fail(401, {
        code: 'UNAUTHORIZED',
        message: 'No Token Provided'
      });
    }
    const user = await jwt.verify(bearer);
    if (!user) {
      set.code = 403
      return reply.fail(403, {
        code: 'FORBIDDEN',
        message: 'Invalid token'
      });
    }
    return user;
  } catch (err: any) {
    set.code = 403
    return reply.fail(403, {
        code: 'FORBIDDEN',
        message: 'Token Verified Failed',
        details:err?.message
      });
  }
}

export async function validateSession({ bearer, set, reply }: any) {
  const session = await userSessionService.findByToken(bearer);

  if (!session || !session.isActive) {
    set.code = 401;
    return reply.fail(401, {
        code: 'UNAUTHORIZED',
        message: 'Session expired or inactive',
        details: ''
      });
  }

  return session;
}
