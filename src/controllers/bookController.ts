import { BookService } from "@/services/bookService";
import { status } from "elysia";
import logger from "@/utils/logger";



export class BookController {
  private bookService = new BookService();

  async getAll (ctx: any) {
    try {
        const { reply } = ctx;
        const resp = await this.bookService.getAll();
        return reply.ok(resp);
    } catch (error:any) {
        logger.error("❌ getAll error:", error);
        throw error;
    };
  }

  async getById (ctx: any) {
    try {
        const { params, reply } = ctx;
        const resp = await this.bookService.getById(params.id);
        if(resp) {
            reply.ok(resp);
        } else {
            reply.fail(404,{
                code: 'NOT_FOUND',
                message: 'Book not found'
            })
        }
    } catch (error:any) {
        logger.error("❌ getById error:", error);
        throw error;
    }
  };

  async createBook (ctx: any) {
    try {
        const { body, reply } = ctx;
        const resp = await this.bookService.create(body);
        return reply.ok(resp);
    } catch (error:any) {
        logger.error("❌ createBook error:", error);
        throw error;
    }
  };

  async updateBook(ctx: any) {
    try {
        const { params, body, reply } = ctx;
        const resp = await this.bookService.update(params.id, body);
        return reply.ok(resp);
    } catch (error:any) {
        logger.error("❌ updateBook error:", error);
        throw error;
    }
  }

  async delete(ctx: any){
    try {
        const { params, reply } = ctx;
        const resp = await this.bookService.delete(params.id);
        return reply.ok(resp);
    } catch (error:any) {
        logger.error("❌ deleteBook error:", error);
        throw error;
    }
  }
}
