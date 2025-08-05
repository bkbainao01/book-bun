import { prisma } from "@/config/db";
import Bun, { password } from "bun";
import logger from "@/utils/logger";

export class AttachmentService {
  getAll() {
    try {
      return prisma.attachments.findMany();
    } catch (error) {
      logger.error("❌ getattachments error:", error);
      throw error;
    }
  }

  getById(id: string) {
    try {
      return prisma.attachments.findUnique({ where: { id } });
    } catch (error) {
      logger.error("❌ getBook error:", error);
      throw error;
    }
  }

  delete(id: string) {
    try {
      return prisma.attachments.delete({
        where: { id },
      });
    } catch (error) {
      logger.error("❌ deleteBook error:", error);
      throw error;
    }
  }
}
