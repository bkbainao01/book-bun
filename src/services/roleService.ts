import { prisma } from "@/config/db";
import Bun, { password } from "bun";

export class RoleService {

  getAll() {
    try {
      return prisma.roles.findMany();
    } catch (error) {
      console.error("❌ getBooks error:", error);
      return [];
    }
  }

  getById(id: string) {
    try {
      return prisma.roles.findUnique({ where: { id } });
    } catch (error) {
      console.error("❌ getBook error:", error);
      return {};
    }
  }
}
