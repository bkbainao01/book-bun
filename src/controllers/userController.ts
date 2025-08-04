import { UserService } from "@/services/userService";
import { UserSessionService } from "@/services/userSessionService";
import { request } from "http";
import { UAParser } from 'ua-parser-js'
import { de } from "zod/v4/locales";

export class UserController {
  private userService = new UserService();
  private userSessionService = new UserSessionService();

  async getAll(ctx: any) {
    try {
      const { query } = ctx;
      const resp:any = await this.userService.getAll(query);
      return {
        data: resp,
        error: null,
        meta: {
          requestId: "uuid", // คุณสามารถใช้ UUID จริงได้ที่นี่
          tookMs: 1, // เวลาที่ใช้ในการประมวลผลคำขอ
          pagination:{
            total: resp.length, // จำนวนทั้งหมดของผู้ใช้
            page: 1, // หน้าแรก
            limit: 10, // จำนวนสูงสุดต่อหน้า
            totalPages: Math.ceil(resp.length / 10), // คำนวณจำนวนหน้าทั้งหมด
          }
        },
        message: "Users retrieved successfully",
      }
    } catch (error) {
      throw error
    }
  }

  getById = (ctx: any) => {
    try {
      const { params } = ctx;
      const resp = this.userService.getById((params.id));
      return {
        data: resp,
        error: null,
        meta: {
          requestId: "uuid", // คุณสามารถใช้ UUID จริงได้ที่นี่
          tookMs: 1, // เวลาที่ใช้ในการประมวลผลคำขอ
        },
      }
    } catch (error: any) {
      throw error
    }
  };

  createUser = (ctx: any) => {
    const { body } = ctx;
    const user = {
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      password: body.password,
      roleIds: body.roleIds
    };
    return this.userService.create(user);
  };

  updateUser = ({ params, body }: any) => {
    try {
      const user = {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: body.password,
        roleIds: body.roleIds
      };
      const resp = this.userService.getById((params.id));
      return {
        data: resp,
        error: null,
        meta: {
          requestId: "uuid", // คุณสามารถใช้ UUID จริงได้ที่นี่
          tookMs: 1, // เวลาที่ใช้ในการประมวลผลคำขอ
        },
      }
    } catch (error: any) {
      throw error;
    }
  };

  deleteUser = ({ params }: any) => {
    const resp = this.userService.getById((params.id));
    return {
        data: resp,
        error: null,
        meta: {
          requestId: "uuid", // คุณสามารถใช้ UUID จริงได้ที่นี่
          tookMs: 1, // เวลาที่ใช้ในการประมวลผลคำขอ
        },
      }
  };

  login = async (ctx: any) => {
    try {
      const { jwt, body, set, request } = ctx;
      const ipAddress =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      request.socket?.remoteAddress || 'unknown';
      const userAgent = request.headers.get('user-agent') || '';
      const parser = new UAParser(userAgent);
      const result = parser.getResult();
      const deviceInfo = {
        ua: result.ua,
        browser: {
          name: result.browser.name,
          version: result.browser.version,
          major: result.browser.major,
        },
        cpu: {
          architecture: result.cpu.architecture,
        },
        device: {
          model: result.device.model,
          vendor: result.device.vendor,
          type: result.device.type,
        },
        engine: {
          name: result.engine.name,
          version: result.engine.version,
        },
        os: {
          name: result.os.name,
          version: result.os.version,
        },
      }
      const MAX_SESSIONS = 3; // กำหนดจำนวน session สูงสุดที่อนุญาต
      const user = {
        email: body.email,
        password: body.password,
      };
      const resp = await this.userService.authenticate(user, set);
      if (resp.isLoggedIn) {
        // หา session ที่ยัง active อยู่
        const activeSessions: any =
          await this.userSessionService.getActiveSessions(resp.user.id);

        // ถ้าเกิน MAX_SESSIONS ให้ปิด session เก่าสุด
        if (activeSessions.length >= MAX_SESSIONS) {
          const sessionsToDisable = activeSessions.slice(
            0,
            activeSessions.length - MAX_SESSIONS + 1
          );
          for (const session of sessionsToDisable) {
            await this.userSessionService.update(session.id, {
              isActive: false,
            });
          }
        }
        // สร้าง JWT token
        resp.token = await jwt.sign({
          userId: resp.user.id,
          email: resp.user.email,
        });
        // บันทึก session ใหม่
        await this.userSessionService.create({
          userId: resp.user.id,
          deviceInfo: JSON.stringify(deviceInfo),
          ipAddress,
          userAgent,
          token: resp.token,
        });
        return {
          data: resp,
          error: null,
          meta: {
            requestId: "uuid", // คุณสามารถใช้ UUID จริงได้ที่นี่
            tookMs: 1, // เวลาที่ใช้ในการประมวลผลคำขอ
          },
        }
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error: any) {
      throw error;
    }
  };

  logout = async ({ jwt, body, set }: any) => {
    try {
      const session = await this.userSessionService.findByToken(body.token);
      if (!session || !session.isActive) {
        throw  { message: "Session not found or already logged out"};
      }

      const resp = await this.userSessionService.update(session.id, {
        isActive: false,
      });

      return {
        data: resp,
        error: null,
        meta: {
          requestId: "uuid", // คุณสามารถใช้ UUID จริงได้ที่นี่
          tookMs: 1, // เวลาที่ใช้ในการประมวลผลคำขอ
        },
      }
    } catch (error: any) {
      throw error;
    }
  };
}
