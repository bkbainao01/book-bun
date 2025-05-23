import { prisma } from '@/config/db';
import Bun, { password } from 'bun';

export class BookService {
  // private db: Database;

  // constructor() {
  //   this.db = new Database("mydb.sqlite");
  // }

  getAll() {
    try {
      return prisma.books.findMany();
    } catch (error) {
      console.error('❌ getBooks error:', error);
      return [];
    }
  }

  getById(id: number) {
    try {
      return prisma.books.findUnique({ where: { id } });
    } catch (error) {
      console.error('❌ getBook error:', error);
      return {};
    }
  }

  create(book: { name: string; author: string; price: number }) {
    try {
      return prisma.books.create({
        data: {
          name: book.name,
          author: book.author,
          price: book.price
        }
      });
    } catch (error) {
      console.error("❌ createBook error:", error);
      return {
        status: 'error',
        error
      };
    }
  }

  update(id: number, book: { name: string; author: string; price: number }) {
    try {
      return prisma.books.update({
        where: { id },
        data:{
        name: book.name,
        author: book.author,
        price: book.price
      }
      });
    } catch (error) {
      console.error("❌ updateBook error:", error);
      return null;
    }
  }

  delete(id: number) {
    try {
      return prisma.books.delete({
        where: { id }
      });
    } catch (error) {
      console.error("❌ deleteBook error:", error);
      return { status: 'error', error };
    }
  }
}
