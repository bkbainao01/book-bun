import { AttachmentService } from "@/services/attachmentService";
import { status } from "elysia";
import logger from "@/utils/logger";


export class AttachmentController {
  private attachmentService = new AttachmentService();

  async getAll(ctx: any) {
    try {
      const { query, reply } = ctx;
      const resp = await this.attachmentService.getAll();
      return reply.ok(resp);
    } catch (error: any) {
      logger.error("❌ getAll error:", error);
      throw error;
    }
  }

  async getById(ctx: any) {
    try {
      const { params,reply } = ctx;
      const resp = await this.attachmentService.getById(String(params.id));
      if (resp) {
        return reply.ok(resp);
      } else {
        return reply.fail(404, {
          code: 'NOT_FOUND',
          message: 'Attachment not found'
        });
      }
    } catch (error: any) {
      logger.error("❌ getById error:", error);
      return { status: "error", message: error.message };
    }
  }

  async delete(ctx: any) {
    try {
      const { params, set, reply } = ctx;
      const resp = await this.attachmentService.delete(String(params.id));
      return reply.ok(resp);
    } catch (error: any) {
      logger.error("❌ delete Attachment error:", error);
      return { status: "error", message: error.message };
    }
  }
}
