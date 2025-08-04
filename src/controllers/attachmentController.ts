import { AttachmentService } from "@/services/attachmentService";
import { status } from "elysia";

export class AttachmentController {
  private attachmentService = new AttachmentService();

  async getAll(ctx: any) {
    try {
      const { query } = ctx;
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

  async getById(ctx: any) {
    try {
      const { params } = ctx;
      const book = this.attachmentService.getById(String(params.id));
      return book ?? { error: "User not found" };
    } catch (error: any) {
      console.error("❌ getById error:", error);
      return { status: "error", message: error.message };
    }
  }

  async delete(ctx: any) {
    try {
      const { params, set } = ctx;
      return this.attachmentService.delete(String(params.id));
    } catch (error: any) {
      console.error("❌ deleteBook error:", error);
      return { status: "error", message: error.message };
    }
  }
}
