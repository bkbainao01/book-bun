import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const seedBooks = async () => {
  const books = [
    { nameEn: '1984', author: 'George Orwell', price: 15.99, status: true },
    { nameEn: 'To Kill a Mockingbird', author: 'Harper Lee',  price: 15.99, status: true },
    { nameEn: 'The Hobbit', author: 'J.R.R. Tolkien', price: 15.99, status: true },
    { nameEn: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 15.99, status: true }
  ];
  // ใช้ upsert (insert ถ้าไม่เจอ, update ถ้าเจอ)
  await Promise.all(books.map(book =>
    prisma.books.upsert({
        where: { nameEn: book.nameEn },
        update: {},
        create: book,
    })
  ));
};
