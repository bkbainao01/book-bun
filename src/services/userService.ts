import { prisma } from "@/config/db";
import bcrypt from "bcrypt";
import Bun from "bun";
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
      console.error("❌ Login fail:", error);
      return {
        loggedIn: false,
        error,
      };
    }
  };

  getAll = async (query:any) => {
    try {
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
      console.error("❌ getUsers error:", error);
      return { status: "error" };
    }
  };

  getById(id: string) {
    try {
      return prisma.users.findUnique({
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
    } catch (error) {
      console.error("❌ getUser error:", error);
      return { status: "error" };
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
      console.error("❌ getUserByEmail error:");
      return {
        data: {
          isLoggedIn: false,
        },
        status: "error",
        error: error.message,
      };
    }
  }

  create = async (user: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    roleIds: string[];
  }) => {
    try {
      const hashedPassword = await Bun.password.hash(user.password, {
        algorithm: "bcrypt",
        cost: 4,
      });
      return prisma.users.create({
        data: {
          email: user.email,
          password: hashedPassword,
          firstname: user.firstname,
          lastname: user.lastname,
          roles: {
            create: user.roleIds.map((roleId) => ({
              role: { connect: { id: roleId } },
            })),
          },
        },
      });
    } catch (error) {
      console.error("❌ createUser error:", error);
      return { status: "error", error };
    }
  };

  update = async (id: string, user: any) => {
    try {
      const hashedPassword = await Bun.password.hash(user.password, {
        algorithm: "bcrypt",
        cost: 4,
      });
      return prisma.users.update({
        where: { id: id },
        data: {
          email: user.email,
          password: hashedPassword,
          firstname: user.firstname,
          lastname: user.lastname,
          roles: {
            deleteMany: {},
            create: user.roleIds.map((roleId: string) => ({
              role: { connect: { id: roleId } },
            })),
          },
        },
      });
    } catch (error) {
      console.error("❌ updateUser error:", error);
      return { status: "error", error };
    }
  };

  delete(id: string) {
    try {
      return prisma.users.delete({
        where: { id },
      });
    } catch (error) {
      console.error("❌ deleteUser error:", error);
      return { status: "error", error };
    }
  }
}
