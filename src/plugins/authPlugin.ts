import { verifyToken,validateSession } from './auth';

export const authPlugin = async ({ bearer, jwt, request, set }: any) => {
    const publicPaths = [
      "/api/v1/auth/login",
      "/api/v1/auth/register",
      "/api/v1/auth/logout",
      "/api-doc/swagger",
      "/",
    ];
    const currentPath = new URL(request.url).pathname;

    const isPublicPath = publicPaths.some((path) => currentPath === path || currentPath.startsWith(path + "/"));

    if (isPublicPath) {
      return {};
    }

    const user = await verifyToken({ bearer, jwt, set });
    const session = await validateSession({ bearer, set });

    return {
      authUser: user,
      session,
    };
  };
