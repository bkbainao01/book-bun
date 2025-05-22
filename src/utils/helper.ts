export const validateBearerToken = async ({request, bearer, jwt, set}:{request:any, bearer: string, jwt:any, set:any})=>{
    const req: any = request;
    const publicPaths = ["/login", "/register",'/logout'];
    for (const path in publicPaths) {
      if (req.url.includes(path)) {
        return {}; // ข้ามการตรวจสอบ
      }
    }
    if (!bearer) {
      set.status = 401;
      throw new Error("Missing token");
    }

    try {
      const user = await jwt.verify(bearer);
      return { user };
    } catch {
      set.status = 403;
      throw new Error("Invalid token");
    }
}