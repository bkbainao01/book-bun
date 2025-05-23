import { BookService } from "@/services/bookService";
import { status } from "elysia";


export class BookController {
  private bookService = new BookService();

  async getAll () {
    try {
        const books = await this.bookService.getAll();
        return {
            data:{
                books
            },
            status: "ok",
            message:'Get all books success',
        };
    } catch (error:any) {
        console.error("❌ getAll error:", error);
        return { status: "error" , message: error.message};
    };
  }

  async getById ({ params }: any) {
    try {
        const book = this.bookService.getById(Number(params.id));
        return book ?? { error: "User not found" };
    } catch (error:any) {
        console.error("❌ getById error:", error);
        return { status: "error" , message: error.message};
    }
  };

  async createBook ({ body }: any) {
    try {
        if (!body.name || !body.price || !body.author) {
            return { error: "Invalid input" };
        }
        const book = {
        name: body.name,
        author: body.author,
        price: body.price
        }
        return this.bookService.create(book);
    } catch (error:any) {
        console.error("❌ createBook error:", error);
        return { status: "error" , message: error.message };
    }
  };
  async updateBook({ params, body }: any) {
    try {
        const book = {
            name: body.name,
            author: body.author,
            price: body.price
        }
        return this.bookService.update(Number(params.id), book);
    } catch (error:any) {
        console.error("❌ updateBook error:", error);
        return { status: "error" , message: error.message };
    }
  }
  async delete({ params }: any){
    try {
        return this.bookService.delete(Number(params.id));
    } catch (error:any) {
        console.error("❌ deleteBook error:", error);
        return { status: "error" , message: error.message };
    }
  }
}
