import { Database } from 'bun:sqlite';

export class Book {
  private db: Database;

  constructor() {
    this.db = new Database("mydb.sqlite");
  }

  getBooks() {
    try {
      const query = this.db.query("SELECT * FROM books;");
      console.log('✅ getBooks success');
      return query.all();
    } catch (error) {
      console.error('❌ getBooks error:', error);
      return [];
    }
  }

  getBook(id: number) {
    try {
      const query = this.db.query("SELECT * FROM books WHERE id=$id;");
      console.log('✅ getBook success');
      return query.get({ $id: id });
    } catch (error) {
      console.error('❌ getBook error:', error);
      return {};
    }
  }

  createBook(book: { name: string; author: string; price: number }) {
    try {
      const query = this.db.query(
        `INSERT INTO books ("name", "author", "price") VALUES ($name, $author, $price);`
      );
      query.run({
        $name: book.name,
        $author: book.author,
        $price: book.price
      });
      console.log('✅ createBook success');
      return {
        data: book,
        status: 'ok'
      };
    } catch (error) {
      console.error("❌ createBook error:", error);
      return {
        status: 'error',
        error
      };
    }
  }

  updateBook(id: number, book: { name: string; author: string; price: number }) {
    try {
      const query = this.db.query(`
        UPDATE books
        SET name = $name, author = $author, price = $price
        WHERE id = $id;
      `);
      const payload = {
        $id: id,
        $name: book.name,
        $author: book.author,
        $price: book.price
      };
      query.run(payload);
      console.log('✅ updateBook success');
      return payload;
    } catch (error) {
      console.error("❌ updateBook error:", error);
      return null;
    }
  }

  deleteBook(id: number) {
    try {
      const query = this.db.query("DELETE FROM books WHERE id=$id;");
      query.run({ $id: id });
      console.log('✅ deleteBook success');
      return { status: 'ok' };
    } catch (error) {
      console.error("❌ deleteBook error:", error);
      return { status: 'error', error };
    }
  }
}
