## Prisma Setting
สร้างไฟล์ตั้งต้น สร้างโฟลเดอร์ prisma/ พร้อม schema.prisma และ .env
 ```sh
bunx prisma init
```
สร้าง Prisma Client ตาม schema
 ```sh
bunx prisma generate
```
สร้าง Prisma Client ตาม schema
 ```sh
bunx prisma migrate dev --name init
```
สร้าง Prisma Client ตาม schema
```sh
npx prisma studio
```
คำสั่ง Seed ข้อมูล
```sh
npx prisma db seed
```


## 🧬 Prisma Schema & Migration Commands

คำสั่งที่ใช้จัดการกับ Prisma schema และฐานข้อมูล:

| คำสั่ง | ความหมาย |
|--------|-----------|
| `npx prisma format` | จัดรูปแบบไฟล์ `schema.prisma` ให้เป็นระเบียบ |
| `npx prisma generate` | สร้าง Prisma Client ใหม่ตาม schema ปัจจุบัน |
| `npx prisma db push` | ดัน schema ไปที่ฐานข้อมูลโดยไม่สร้าง migration (ไม่แนะนำสำหรับ production) |
| `npx prisma migrate dev --name <ชื่อ>` | สร้างไฟล์ migration และ apply ไปยังฐานข้อมูล (ใช้ใน development) |
| `npx prisma migrate reset` | ล้างฐานข้อมูลทั้งหมด และ apply migration ใหม่ทั้งหมด (ใช้ใน local/dev เท่านั้น) |


### ตัวอย่าง

```bash
# สร้าง migration ใหม่พร้อม apply
npx prisma migrate dev --name add-user-isAdmin

# สร้างไฟล์ model
npm run prisma:make Example

# รีเซ็ตฐานข้อมูลและ apply migration ใหม่ทั้งหมด (ข้อมูลจะหาย)
npx prisma migrate reset

# นำ migration ไปใช้บน production
npx prisma migrate deploy

# ตรวจสอบสถานะ migration
npx prisma migrate status

# แก้ schema.prisma แล้วดัน schema ไปฐานข้อมูลเลย
npx prisma db push
```
