import { prisma } from "@/config/db";
import Bun, { password } from "bun";

export class AttachmentService {
  getAll() {
    try {
      return prisma.attachments.findMany();
    } catch (error) {
      console.error("❌ getattachments error:", error);
      return [];
    }
  }

  getById(id: string) {
    try {
      return prisma.attachments.findUnique({ where: { id } });
    } catch (error) {
      console.error("❌ getBook error:", error);
      return {};
    }
  }

  delete(id: string) {
    try {
      return prisma.attachments.delete({
        where: { id },
      });
    } catch (error) {
      console.error("❌ deleteBook error:", error);
      return { status: "error", error };
    }
  }
}
