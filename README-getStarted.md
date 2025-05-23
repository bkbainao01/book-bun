
# BOOK-BUN-API
Elysia + Prisma + Bun Project
โปรเจกต์ตัวอย่างที่ใช้ **Elysia** เป็น web framework, **Prisma** สำหรับ ORM และ **Bun** เป็น runtime & bundler

---

## 📦 การติดตั้ง

1. ติดตั้ง dependencies

```bash
bun install
```

2. สร้างฐานข้อมูล (เช่น SQLite, MySQL, PostgreSQL)

ตั้งค่า connection string ใน `.env`

```env
DATABASE_URL="mysql://user:password@localhost:3306/dbname"
```

---

## ⚙️ การตั้งค่า Prisma

1. สร้างไฟล์ `prisma/schema.prisma` ระบุ datasource และ model ของคุณ

2. สร้าง Prisma Client

```bash
bun prisma generate
```

3. สร้างและ run migration (ในระหว่างพัฒนา)

```bash
bun prisma migrate dev --name init
```

หรือถ้าอยากดัน schema เข้า DB อัตโนมัติโดยไม่ต้องสร้าง migration

```bash
bun prisma db push
```

---

## 🚀 การใช้งาน Elysia กับ Prisma

ตัวอย่างโค้ดเรียกใช้งาน Prisma ใน Elysia:

```ts
import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";

const app = new Elysia();
const prisma = new PrismaClient();

app.get("/users", async () => {
  return await prisma.users.findMany();
});

app.post("/user", async ({ body }) => {
  const user = await prisma.users.create({ data: body });
  return user;
});

app.listen(3000);
```

---

## 🔄 Seed ข้อมูล

สร้างไฟล์ `prisma/seed.ts` เช่น:

```ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.users.createMany({
    data: [
      { email: "admin@example.com", name: "Admin" },
      { email: "user@example.com", name: "User" }
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

เพิ่มใน `package.json` หรือ `prisma` config:

```json
"prisma": {
  "seed": "bun prisma db seed"
}
```

รัน seed ด้วย:

```bash
bun prisma db seed
```

---

## 🛠 คำสั่งที่ใช้บ่อย

| คำสั่ง                             | ความหมาย                                            |
|----------------------------------|-----------------------------------------------------|
| `bun prisma generate`             | สร้าง Prisma Client                                 |
| `bun prisma migrate dev --name <ชื่อ>` | สร้าง migration และ apply ในฐานข้อมูล (dev)          |
| `bun prisma migrate reset`       | รีเซ็ตฐานข้อมูล ลบข้อมูลและ apply migration ใหม่    |
| `bun prisma migrate deploy`      | apply migration บน production                        |
| `bun prisma db push`             | ดัน schema ไปฐานข้อมูลโดยไม่ต้องสร้าง migration    |
| `bun prisma db seed`             | รัน seed สคริปต์เติมข้อมูลเริ่มต้น                   |

---

## 📚 เอกสารอ้างอิง

- [Elysia Documentation](https://elysiajs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Bun Documentation](https://bun.sh/docs)
