import { prisma } from "@/config/db";
import moment from "moment";
import logger from "@/utils/logger";

export class UserSessionService {
//   getAll = async () => {
//     try {
//       return prisma.userSessions.findMany();
//     } catch (error) {
//       logger.error("❌ getUserSessions error:", error);
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
      logger.error("❌ getUserSessions error:", error);
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
  //     logger.error("❌ getUserSession error:", error);
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
      logger.error("❌ createUser error:", error);
      throw error;
    }
  };

  update(sessionId: string, data: any) {
    try {
      return prisma.userSessions.update({
         where: { id: sessionId },
         data: data
      });
    } catch (error) {
      logger.error("❌ updateUser error:", error);
      throw error;
    }
  }

  delete(id: string) {
    try {
      return prisma.userSessions.delete({
        where: { id },
      });
    } catch (error) {
      logger.error("❌ deleteUser error:", error);
      throw error;
    }
  }

  deleteByToken(token: string) {
    try {
      return prisma.userSessions.delete({
        where: { token },
        data: { isActive: false },
      });
    } catch (error) {
      logger.error("❌ deleteUser error:", error);
      throw error;
    }
  }
}
