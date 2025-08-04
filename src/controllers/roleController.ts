import { RoleService } from "@/services/roleService";
import { status } from "elysia";


export class RoleController {
  private roleService = new RoleService();

  async getAll (ctx: any) {
    try {
        const roles = await this.roleService.getAll();
        return {
            data: roles,
            status: "ok",
            message:'Get all roles success',
        };
    } catch (error:any) {
        console.error("❌ getAll error:", error);
        return { status: "error" , message: error.message};
    };
  }

  async getById (ctx: any) {
    try {
        const { params } = ctx;
        const book = this.roleService.getById(params.id);
        return book ?? { error: "Book not found" };
    } catch (error:any) {
        console.error("❌ getById error:", error);
        return { status: "error" , message: error.message};
    }
  };
}
