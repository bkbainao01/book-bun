import { prisma } from "@/config/db";
import bcrypt from "bcrypt";
import Bun from "bun";
import logger from "@/utils/logger";


export class UserService {
  authenticate = async (
    user: { email: string; password: string },
    set: any
  ) => {
    try {
      const foundUser: any = await prisma.users.findUnique({
        where: { email: user.email },
        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      });
      if (!foundUser) {
        set.status = 401;
        throw new Error("User not found");
      }
      const isMatch = await bcrypt.compare(user.password, foundUser.password);
      delete foundUser.password;
      if (!isMatch) {
        set.status = 400;
        throw new Error("Invalid email or password");
      }
      return {
        user: foundUser,
        token: null,
        isLoggedIn: true,
      };
    } catch (error) {
      logger.error("❌ Login fail:", error);
      throw error;
    }
  };

  getAll = async (ctx:any) => {
    try {
      const { query } = ctx;
      return prisma.users.findMany({
        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      });
    } catch (error) {
      logger.error("❌ getUsers error:", error);
      throw error;
    }
  };

  async getById(id: string) {
    try {
       const resp:any = await prisma.users.findUnique({
        where: {
          id: id,
        },
        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      });
       if(resp?.roles){
        const roles = resp.roles.map((r:any)=>r.role)
        resp.roles = roles
       }
      return resp
    } catch (error) {
      logger.error("❌ getUser error:", error);
      throw error;
    }
  }

  async getByEmail(user: any) {
    try {
      return prisma.users.findUnique({
        where: {
          email: user.email,
        },
      });
    } catch (error: any) {
      logger.error("❌ getUserByEmail error:");
      throw error;
    }
  }

  create = async (body:any) => {
    try {
      const hashedPassword = await Bun.password.hash(body.password, {
        algorithm: "bcrypt",
        cost: 4,
      });
      return prisma.users.create({
        data: {
          email: body.email,
          password: hashedPassword,
          firstname: body.firstname,
          lastname: body.lastname,
          roles: {
            create: body.roleIds.map((roleId:string) => ({
              role: { connect: { id: roleId } },
            })),
          },
        },
      });
    } catch (error) {
      logger.error("❌ createUser error:", error);
      throw error;
    }
  };

  update = async ({ id, body }:any) => {
    try {
      return prisma.users.update({
        where: { id: id },
        data: {
          email: body.email,
          firstname: body.firstname,
          lastname: body.lastname,
          roles: {
            deleteMany: {},
            create: body.roleIds.map((roleId: string) => ({
              role: { connect: { id: roleId } },
            })),
          },
        },
      });
    } catch (error) {
      logger.error("❌ updateUser error:", error);
      throw error;
    }
  };

  delete(id: string) {
    try {
      return prisma.users.delete({
        where: { id },
      });
    } catch (error) {
      logger.error("❌ deleteUser error:", error);
      throw error;
    }
  }
}
