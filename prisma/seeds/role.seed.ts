import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const seedRoles = async () => {
  const roles = [
    {
      name: "Admin",
    },
    {
      name: "Store Manager",
    },
    {
      name: "Staff",
    },
    {
      name: "Auther/Partner",
    },
    {
      name: "Customer",
    },
  ];

  await Promise.all(
    roles.map((role) =>
      prisma.roles.upsert({
        where: { name: role.name },
        update: {},
        create: role,
      })
    )
  );
};
