import { UserSessionService } from "@/services/userSessionService";

const userSessionService = new UserSessionService()

export async function verifyToken({ bearer, jwt, set }: any) {
  if (!bearer) {
    set.code = 401;
    throw new Error("No token provided");
  }

  try {
    const user = await jwt.verify(bearer);
    if (!user) {
      set.code = 403;
      throw new Error("Invalid token");
    }
    return user;
  } catch (err: any) {
    set.code = 403;
    throw new Error("Token verification failed");
  }
}

export async function validateSession({ bearer, set }: any) {
  const session = await userSessionService.findByToken(bearer);

  if (!session || !session.isActive) {
    set.code = 401;
    throw new Error("Session expired or inactive");
  }

  return session;
}
