import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
const prisma = new PrismaClient();

export const seedUsers = async () => {
  const hashPassword = await bcrypt.hash("1234", 10);
  const users = [
    {
      email: "admin@bookbun.com",
      password: hashPassword,
      firstname: "Admin",
      lastname: "Bookbun",
    },
    {
      email: "user1@bookbun.com",
      password: hashPassword,
      firstname: "User1",
      lastname: "Bookbun",
    },
    {
      email: "user2@bookbun.com",
      password: hashPassword,
      firstname: "User2",
      lastname: "Bookbun",
    },
    {
      email: "user3@bookbun.com",
      password: hashPassword,
      firstname: "User3",
      lastname: "Bookbun",
    },
    {
      email: "user4@bookbun.com",
      password: hashPassword,
      firstname: "User4",
      lastname: "Bookbun",
    },
  ];
  // ใช้ upsert (insert ถ้าไม่เจอ, update ถ้าเจอ)
  //  ประกันลำดับการ insert/update ตาม array
  // for (const user of users) {
  // await prisma.users.upsert({
  //   where: { email: user.email },
  //   update: {},
  //   create: user,
  // });
  // }
//  ปัญหา: Promise.all() ไม่รับประกันลำดับการทำงาน
  await Promise.all(
    users.map((user) =>
      prisma.users.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      })
    )
  );
};
