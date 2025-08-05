import { prisma } from "@/config/db";
import Bun, { password } from "bun";
import logger from "@/utils/logger";

export class BookService {

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
      logger.error("❌ getBooks error:", error);
      throw error;
    }
  }

  getById(id: string) {
    try {
      return prisma.books.findUnique({ where: { id } });
    } catch (error) {
      logger.error("❌ getBook error:", error);
      return {};
    }
  }

  create(body: any) {
    try {
      return prisma.books.create({
        data: {
          nameTh: body.nameTh,
          nameEn: body.nameEn,
          author: body.author,
          publisher: body.publisher,
          rating: body.rating,
          price: body.price,
          discount: body.discount,
          description: body.description,
          summary: body.summary,

          attachment: body.attachment,

        },
      });
    } catch (error) {
      logger.error("❌ createBook error:", error);
      throw error
    }
  }

  update(id: string, body: any) {
    try {
      return prisma.books.update({
        where: { id },
        data: {
          name: body.name,
          author: body.author,
          price: body.price,
        },
      });
    } catch (error) {
      logger.error("❌ updateBook error:", error);
      throw error;
    }
  }

  delete(id: string) {
    try {
      return prisma.books.delete({
        where: { id },
      });
    } catch (error) {
      logger.error("❌ deleteBook error:", error);
      throw error;
    }
  }
}
