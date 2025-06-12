import { prisma } from "@/config/db";
import moment from "moment";

export class UserSessionService {
//   getAll = async () => {
//     try {
//       return prisma.userSessions.findMany();
//     } catch (error) {
//       console.error("❌ getUserSessions error:", error);
//       return { status: "error" };
//     }
//   };

  getActiveSessions = async (userId: string) => {
    try {
      return prisma.userSessions.findMany({
        where: {
          userId: userId,
          isActive: true,
        },
        orderBy: {
            lastUsedAt: "asc",
        }
      });
    } catch (error) {
      console.error("❌ getUserSessions error:", error);
      return { status: "error" };
    }
  };
  // getById(id: number) {
  //   try {
  //     return prisma.userSessions.findUnique({
  //       where: {
  //         id: id,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("❌ getUserSession error:", error);
  //     return { status: "error" };
  //   }
  // }

  async findByToken(token: string) {
    return await prisma.userSessions.findUnique({
      where: { token },
    });
  }

  create = async (user:any) => {
    try {
      const { deviceInfo, ipAddress, userAgent, token , userId } = user;
      const expiredAt:string = moment().add(7, 'days').toISOString();
      return prisma.userSessions.create({
            data: {
              userId,
              deviceInfo,
              ipAddress,
              userAgent,
              token,
              expiredAt: expiredAt // กำหนดวันหมดอายุ session
            }
          });
    } catch (error) {
      console.error("❌ createUser error:", error);
      return { status: "error", error };
    }
  };

  update(sessionId: string, data: any) {
    try {
      return prisma.userSessions.update({
         where: { id: sessionId },
         data: data
      });
    } catch (error) {
      console.error("❌ updateUser error:", error);
      return { status: "error", error };
    }
  }

  delete(id: number) {
    try {
      return prisma.userSessions.delete({
        where: { id },
      });
    } catch (error) {
      console.error("❌ deleteUser error:", error);
      return { status: "error", error };
    }
  }

  deleteByToken(token: string) {
    try {
      return prisma.userSessions.delete({
        where: { token },
        data: { isActive: false },
      });
    } catch (error) {
      console.error("❌ deleteUser error:", error);
      return { status: "error", error };
    }
  }
}
