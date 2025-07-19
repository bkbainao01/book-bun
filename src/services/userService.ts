import { prisma } from "@/config/db";
import bcrypt from "bcrypt";
import Bun from "bun";
export class UserService {
  authenticate = async(user: { email: string; password: string },set:any) => {
    try {
      const foundUser:any = await prisma.users.findUnique({
        where: { email: user.email },
      });
      if (!foundUser) {
        set.status = 401;
        throw new Error("User not found");
      }
      const isMatch = await bcrypt.compare(user.password, foundUser.password);
      delete foundUser.password
      if (!isMatch) {
        set.status = 400;
        throw new Error("Invalid email or password");
      }
      return {
          user: foundUser,
          token: null,
          isLoggedIn: true
      };
    } catch (error) {
      console.error("❌ Login fail:", error);
      return {
        loggedIn: false,
        error,
      };
    }
  };

  getAll = async () => {
    try {
      return prisma.users.findMany();
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
        },
      });
    } catch (error) {
      console.error("❌ createUser error:", error);
      return { status: "error", error };
    }
  };

  update(id: string, user: any) {
    try {
      return prisma.users.update({
        where: { id: id },
        data: {
          email: user.email,
          password: user.password,
          firstname: user.firstname,
          lastname: user.lastname,
        },
      });
    } catch (error) {
      console.error("❌ updateUser error:", error);
      return { status: "error", error };
    }
  }

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
