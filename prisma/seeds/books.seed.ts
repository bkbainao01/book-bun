import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const seedBooks = async () => {
  const books = [
    { name: '1984', author: 'George Orwell', price: 15.99, status: true },
    { name: 'To Kill a Mockingbird', author: 'Harper Lee',  price: 15.99, status: true },
    { name: 'The Hobbit', author: 'J.R.R. Tolkien', price: 15.99, status: true },
    { name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 15.99, status: true }
  ];
  // ใช้ upsert (insert ถ้าไม่เจอ, update ถ้าเจอ)
  await Promise.all(books.map(book =>
    prisma.books.upsert({
        where: { name: book.name },
        update: {},
        create: book,
    })
  ));
};
