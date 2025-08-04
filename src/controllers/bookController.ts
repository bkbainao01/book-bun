import { BookService } from "@/services/bookService";
import { status } from "elysia";


export class BookController {
  private bookService = new BookService();

  async getAll (ctx: any) {
    try {
        const books = await this.bookService.getAll();
        return {
            data: books,
            status: "ok",
            message:'Get all books success',
        };
    } catch (error:any) {
        console.error("❌ getAll error:", error);
        return { status: "error" , message: error.message};
    };
  }

  async getById (ctx: any) {
    try {
        const { params } = ctx;
        const book = this.bookService.getById(params.id);
        return book ?? { error: "User not found" };
    } catch (error:any) {
        console.error("❌ getById error:", error);
        return { status: "error" , message: error.message};
    }
  };

  async createBook (ctx: any) {
    try {
        const { body } = ctx;
        const book = {
            nameTh: body.nameTh,
            nameEn: body.nameEn,
            author: body.author,
            publisher: body.publisher,
            attachment: body.attachment,
            rating: body.rating,
            price: body.price,
            discount: body.discount,
            description: body.description,
            summary: body.summary
        };
        return this.bookService.create(book);
    } catch (error:any) {
        console.error("❌ createBook error:", error);
        return { status: "error" , message: error.message };
    }
  };

  async updateBook(ctx: any) {
    try {
        const { params, body } = ctx;
        const book = {
            name: body.name,
            author: body.author,
            price: body.price
        }
        return this.bookService.update(params.id, book);
    } catch (error:any) {
        console.error("❌ updateBook error:", error);
        return { status: "error" , message: error.message };
    }
  }

  async delete(ctx: any){
    try {
        const { params } = ctx;
        return this.bookService.delete(params.id);
    } catch (error:any) {
        console.error("❌ deleteBook error:", error);
        return { status: "error" , message: error.message };
    }
  }
}
