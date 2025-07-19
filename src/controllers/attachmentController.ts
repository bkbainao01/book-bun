import { AttachmentService } from "@/services/attachmentService";
import { status } from "elysia";

export class AttachmentController {
  private attachmentService = new AttachmentService();

  async getAll() {
    try {
      const books = await this.attachmentService.getAll();
      return {
        data: books,
        status: "ok",
        message: "Get all books success",
      };
    } catch (error: any) {
      console.error("❌ getAll error:", error);
      return { status: "error", message: error.message };
    }
  }

  async getById({ params }: any) {
    try {
      const book = this.attachmentService.getById(String(params.id));
      return book ?? { error: "User not found" };
    } catch (error: any) {
      console.error("❌ getById error:", error);
      return { status: "error", message: error.message };
    }
  }

  async delete({ params }: any) {
    try {
      return this.attachmentService.delete(String(params.id));
    } catch (error: any) {
      console.error("❌ deleteBook error:", error);
      return { status: "error", message: error.message };
    }
  }
}
