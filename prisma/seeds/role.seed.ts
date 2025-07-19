import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const seedRoles = async () => {
  const roles = [
    {
      name: "Admin",
      description: "จัดการระบบทั้งหมด ควบคุมสิทธิ์การเข้าใช้งาน ดูแลความปลอดภัยของข้อมูล และแก้ไขปัญหาทางเทคนิค"
    },
    {
      name: "Customer",
      description: "ผู้ใช้งานทั่วไปที่สามารถค้นหา เรียกดูข้อมูลหนังสือ สั่งซื้อ เขียนรีวิว และจัดการข้อมูลส่วนตัว"
    },
    {
      name: "Store Owner",
      description: "ผู้ดูแลร้านหนังสือออนไลน์ จัดการสินค้า ดูยอดขาย จัดการคำสั่งซื้อ และกำหนดนโยบายร้านค้า"
    },
    {
      name: "Sales Staff",
      description: "ประมวลผลคำสั่งซื้อ ติดตามสถานะการจัดส่ง ตอบกลับคำถามของลูกค้า และจัดการการคืนเงิน"
    },
    {
      name: "Stock Manager",
      description: "จัดการคลังสินค้า อัพเดทจำนวนหนังสือคงเหลือ เพิ่มสินค้าใหม่ และติดตามสินค้าหมด"
    },
    {
      name: "Content Manager",
      description: "จัดการข้อมูลหนังสือ อัพเดทรายละเอียดสินค้า ตรวจสอบรีวิวของลูกค้า และจัดการหมวดหมู่"
    },
    {
      name: "Moderator",
      description: "ตรวจสอบคุณภาพข้อมูล อนุมัติรีวิวและคอมเมนต์ ควบคุมเนื้อหาที่ไม่เหมาะสม และดูแลมาตรฐานร้านค้า"
    },
    {
      name: "Marketing Specialist",
      description: "วางแผนโปรโมชั่น จัดการแคมเปญการตลาด สร้างเนื้อหาโฆษณา และวิเคราะห์พฤติกรรมลูกค้า"
    },
    {
      name: "Support Staff",
      description: "ให้บริการช่วยเหลือลูกค้า ตอบคำถาม แก้ไขปัญหา และให้คำแนะนำการใช้งานระบบ"
    },
    {
      name: "Data Analyst",
      description: "วิเคราะห์ข้อมูลการขาย สร้างรายงานธุรกิจ ติดตามแนวโน้มตลาด และให้ข้อเสนอแนะเชิงธุรกิจ"
    }
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
