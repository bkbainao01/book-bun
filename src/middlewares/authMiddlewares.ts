import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function authMiddleware(token: string) {
  // ตรวจสอบ JWT
//   const payload = verifyJWT(token);
//   if (!payload) throw new Error("Invalid token");

  // ตรวจสอบใน DB ว่ายัง active
  const session = await prisma.userSessions.findUnique({
    where: { token }
  });
  if (!session || !session.isActive) {
    throw new Error("Session expired or invalid");
  }

  return session.userId;
}

export const verifyToken = async ({bearer, jwt, request, set}:any)=>{
  try {
    const req: any = request;
    const publicPaths = ["login", "register",'logout'];
    for (const path of publicPaths) {
      if (req.url.includes(path)) {
        return {};
      }
    }
    if (!bearer) {
      set.status = 401;
      throw new Error("Missing token");
    }
      const user = await jwt.verify(bearer);
      if(!user) {
        set.status = 403;
        throw new Error("Invalid token");
      }
      return { user };
    } catch(error:any) {
        set.status = 400;
        throw new Error(error.message);
    }
}