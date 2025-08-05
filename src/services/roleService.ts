import { prisma } from "@/config/db";
import Bun, { password } from "bun";
import logger from "@/utils/logger";

export class RoleService {

  getAll(ctx:any) {
    try {
      const { params } = ctx;
      return prisma.roles.findMany();
    } catch (error) {
      logger.error("❌ getBooks error:", error);
      throw error;
    }
  }

  getById(id: string) {
    try {
      return prisma.roles.findUnique({ where: { id } });
    } catch (error) {
      logger.error("❌ getBook error:", error);
      throw error;
    }
  }
}
