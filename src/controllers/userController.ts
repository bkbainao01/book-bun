import { UserService } from "@/services/userService";
import { UserSessionService } from "@/services/userSessionService";

export class UserController {
  private userService = new UserService();
  private userSessionService = new UserSessionService();

  async getAll() {
    try {
      return await this.userService.getAll();
    } catch (error) {
      console.error("❌ getAll error:", error);
      return { status: "error" };
    }
  }

  getById = ({ params }: any) => {
    const user = this.userService.getById((params.id));
    return user ?? { error: "User not found" };
  };

  createUser = ({ body }: any) => {
    const user = {
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      password: body.password,
    };
    return this.userService.create(user);
  };

  updateUser = ({ params, body }: any) => {
    const user = {
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      password: body.password,
    };
    return this.userService.update((params.id), user);
  };

  deleteUser = ({ params }: any) => {
    return this.userService.delete((params.id));
  };

  login = async ({ jwt, body, set }: any) => {
    try {
      const MAX_SESSIONS = 3; // กำหนดจำนวน session สูงสุดที่อนุญาต
      const { email, name, deviceInfo, ipAddress, userAgent } = body;
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
        await this.userSessionService.create({
          userId: resp.user.id,
          deviceInfo,
          ipAddress,
          userAgent,
          token: resp.token,
        });
        return {
          data: resp,
          status: "ok",
          message: "Login successful",
        };
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error: any) {
      return { status: "error", message: error.message };
    }
  };

  logout = async ({ jwt, body, set }: any) => {
    try {
      const session = await this.userSessionService.findByToken(body.token);
      if (!session || !session.isActive) {
        return {
          status: "error",
          message: "Session not found or already logged out",
        };
      }

      await this.userSessionService.update(session.id, {
        isActive: false,
      });

      return {
        status: "ok",
        message: "Logout successful",
      };
    } catch (error: any) {
      return {
        status: "error",
        message: error.message || "Logout failed",
      };
    }
  };
}
