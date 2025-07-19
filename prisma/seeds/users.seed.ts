import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const seedUsers = async () => {
  const hashPassword = await bcrypt.hash("1234", 10);

  const getRole = async (nameRole: string) => {
    const role: any = await prisma.roles.findFirst({
      where: {
        name: nameRole,
      },
      select: {
        id: true,
      },
    });

    return role.id;
  };

  const users = [
    {
      email: "admin@bookbun.com",
      password: hashPassword,
      firstname: "John",
      lastname: "Anderson",
      roles: {
        create: [{ role: { connect: { id: await getRole("Admin") } } }],
      },
    },
    {
      email: "somying.happy@bookbun.com",
      password: hashPassword,
      firstname: "Sarah",
      lastname: "Wilson",
      roles: {
        create: [{ role: { connect: { id: await getRole("Admin") } } }],
      },
    },
    {
      email: "owner.store@bookbun.com",
      password: hashPassword,
      firstname: "Michael",
      lastname: "Thompson",
      roles: {
        create: [{ role: { connect: { id: await getRole("Store Owner") } } }],
      },
    },
    {
      email: "sales.team@bookbun.com",
      password: hashPassword,
      firstname: "Emily",
      lastname: "Johnson",
      roles: {
        create: [{ role: { connect: { id: await getRole("Sales Staff") } } }],
      },
    },
    {
      email: "stock.manager@bookbun.com",
      password: hashPassword,
      firstname: "David",
      lastname: "Brown",
      roles: {
        create: [{ role: { connect: { id: await getRole("Stock Manager") } } }],
      },
    },
    {
      email: "content.writer@bookbun.com",
      password: hashPassword,
      firstname: "Jessica",
      lastname: "Miller",
      roles: {
        create: [
          { role: { connect: { id: await getRole("Content Manager") } } },
        ],
      },
    },
    {
      email: "moderator.team@bookbun.com",
      password: hashPassword,
      firstname: "Robert",
      lastname: "Davis",
      roles: {
        create: [{ role: { connect: { id: await getRole("Moderator") } } }],
      },
    },
    {
      email: "marketing.pro@bookbun.com",
      password: hashPassword,
      firstname: "Amanda",
      lastname: "Garcia",
      roles: {
        create: [
          { role: { connect: { id: await getRole("Marketing Specialist") } } },
        ],
      },
    },
    {
      email: "support.help@bookbun.com",
      password: hashPassword,
      firstname: "Kevin",
      lastname: "Martinez",
      roles: {
        create: [{ role: { connect: { id: await getRole("Support Staff") } } }],
      },
    },
    {
      email: "data.analyst@bookbun.com",
      password: hashPassword,
      firstname: "Lisa",
      lastname: "Rodriguez",
      roles: {
        create: [{ role: { connect: { id: await getRole("Data Analyst") } } }],
      },
    },
    {
      email: "customer1@bookbun.com",
      password: hashPassword,
      firstname: "Christopher",
      lastname: "Lee",
      roles: {
        create: [{ role: { connect: { id: await getRole("Customer") } } }],
      },
    },
    {
      email: "customer2@bookbun.com",
      password: hashPassword,
      firstname: "Michelle",
      lastname: "White",
      roles: {
        create: [{ role: { connect: { id: await getRole("Customer") } } }],
      },
    },
    {
      email: "customer3@bookbun.com",
      password: hashPassword,
      firstname: "Daniel",
      lastname: "Taylor",
      roles: {
        create: [{ role: { connect: { id: await getRole("Customer") } } }],
      },
    },
    {
      email: "customer4@bookbun.com",
      password: hashPassword,
      firstname: "Nicole",
      lastname: "Clark",
      roles: {
        create: [{ role: { connect: { id: await getRole("Customer") } } }],
      },
    },
    {
      email: "customer5@bookbun.com",
      password: hashPassword,
      firstname: "Ryan",
      lastname: "Lewis",
      roles: {
        create: [{ role: { connect: { id: await getRole("Customer") } } }],
      },
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
