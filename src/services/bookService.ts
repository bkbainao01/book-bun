import { prisma } from "@/config/db";
import Bun, { password } from "bun";

export class BookService {
  // private db: Database;

  // constructor() {
  //   this.db = new Database("mydb.sqlite");
  // }

  getAll() {
    try {
      return prisma.books.findMany({
        include: {
          attachment: true,
          createdBy: true,
          updatedBy: true,
        },
      });
    } catch (error) {
      console.error("❌ getBooks error:", error);
      return [];
    }
  }

  getById(id: string) {
    try {
      return prisma.books.findUnique({ where: { id } });
    } catch (error) {
      console.error("❌ getBook error:", error);
      return {};
    }
  }

  create(book: any) {
    try {
      return prisma.books.create({
        data: {
          nameTh: book.nameTh,
          nameEn: book.nameEn,
          author: book.author,
          publisher: book.publisher,
          rating: book.rating,
          price: book.price,
          discount: book.discount,
          description: book.description,
          summary: book.summary,

          attachment: book.attachment,

        },
      });
    } catch (error) {
      console.error("❌ createBook error:", error);
      return {
        status: "error",
        error,
      };
    }
  }

  update(id: string, book: any) {
    try {
      return prisma.books.update({
        where: { id },
        data: {
          name: book.name,
          author: book.author,
          price: book.price,
        },
      });
    } catch (error) {
      console.error("❌ updateBook error:", error);
      return null;
    }
  }

  delete(id: string) {
    try {
      return prisma.books.delete({
        where: { id },
      });
    } catch (error) {
      console.error("❌ deleteBook error:", error);
      return { status: "error", error };
    }
  }
}
