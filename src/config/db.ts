import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// Optional: handle graceful shutdown (เช่นเวลา stop server)
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
