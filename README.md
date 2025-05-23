
# Setting Local Environment (Elysia + Prisma + Bun)

เอกสารแนะนำวิธีการตั้งค่าสำหรับพัฒนาโปรเจกต์ด้วย Elysia, Prisma และ Bun ในเครื่อง local

---

## 1. เตรียมเครื่องมือพื้นฐาน

- ติดตั้ง [Bun](https://bun.sh/)
- ติดตั้ง [Node.js](https://nodejs.org/) (ถ้าจำเป็น)
- ติดตั้งฐานข้อมูลที่ใช้งาน เช่น MySQL, PostgreSQL หรือ SQLite

---

## 2. Clone โปรเจกต์

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

---

## 3. ติดตั้ง dependencies ด้วย Bun

```bash
bun install
```

---

## 4. ตั้งค่าไฟล์ `.env`

สร้างไฟล์ `.env` ใน root project เพื่อเก็บตัวแปร environment สำคัญ

```env
DATABASE_URL="mysql://username:password@localhost:3306/databasename"
PORT=3000
```

แก้ไขค่าให้ตรงกับฐานข้อมูลของคุณ

---

## 5. สร้าง Prisma Client และ Migration

ถ้าคุณยังไม่มี schema หรืออยากอัพเดต schema ให้ทำตามนี้

```bash
bun prisma generate
```

ถ้าเพิ่ม model หรือแก้ schema

```bash
bun prisma migrate dev --name init
```

หรือถ้าต้องการดัน schema เข้า DB โดยไม่ใช้ migration

```bash
bun prisma db push
```

---

## 6. รัน Seed ข้อมูล (ถ้ามี)

ถ้าคุณมีไฟล์ seed ให้รัน

```bash
bun prisma db seed
```

---

## 7. รันเซิร์ฟเวอร์ด้วย Bun

```bash
bun run start
```

หรือถ้าคุณตั้งค่าใน `package.json` ไว้

```bash
bun run dev
```

---

## 8. ทดสอบ API

เปิด browser หรือใช้ Postman, curl ทดสอบ API

เช่น

```
http://localhost:3000/users
```

---

## Troubleshooting

- ตรวจสอบว่า DATABASE_URL ถูกต้องและฐานข้อมูลรันอยู่
- ถ้ามี error ให้ลองลบไฟล์ migration แล้วสร้างใหม่
- ตรวจสอบ Bun version ว่าเป็นเวอร์ชันล่าสุด

---

## เอกสารอ้างอิง

- [Bun](https://bun.sh/docs)
- [Prisma](https://www.prisma.io/docs/)
- [Elysia](https://elysiajs.com/)
