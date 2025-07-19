
# Setting Local Environment (Elysia + Prisma + Bun)

เอกสารแนะนำวิธีการตั้งค่าสำหรับพัฒนาโปรเจกต์ด้วย Elysia, Prisma และ Bun ในเครื่อง local

---

## 1. เตรียมเครื่องมือพื้นฐาน

- ติดตั้ง [Bun](https://bun.sh/)
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

- ติดตั้ง [Node.js](https://nodejs.org/)


## 2. ติดตั้ง dependencies ด้วย Bun

```powershell
bun install
```

## 3. ตั้งค่าไฟล์ `.env`

สร้างไฟล์ `.env` ใน root project เพื่อเก็บตัวแปร environment สำคัญ

```env
DATABASE_URL="mysql://username:password@localhost:3306/databasename"
PORT=3000
```

แก้ไขค่าให้ตรงกับฐานข้อมูลของคุณ

---

## 4. สร้าง Prisma Client และ Migration

ถ้าคุณยังไม่มี schema หรืออยากอัพเดต schema ให้ทำตามนี้

```powershell
bun prisma generate
```

ถ้าเพิ่ม model หรือแก้ schema

```powershell
npx prisma migrate dev --name init
```

หรือถ้าต้องการดัน schema เข้า DB โดยไม่ใช้ migration

```powershell
bun prisma db push
```

---

## 5. รัน Seed ข้อมูล (ถ้ามี)

ถ้าคุณมีไฟล์ seed ให้รัน

```powershell
bun prisma db seed
```

---

## 6. รันเซิร์ฟเวอร์ด้วย Bun

```powershell
bun run dev
```

---

## 7. ทดสอบ API

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
