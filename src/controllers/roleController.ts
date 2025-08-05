import { RoleService } from "@/services/roleService";
import logger from "@/utils/logger";



export class RoleController {
  private roleService = new RoleService();

  async getAll (ctx: any) {
    try {
        const { reply } = ctx;
        const resp = await this.roleService.getAll(ctx)
        return reply.ok(resp);
    } catch (error:any) {
        logger.error("❌ getAll Role error:", error);
        throw error;
    };
  }

  async getById (ctx: any) {
    try {
        const { params, reply } = ctx;
        const resp = await this.roleService.getById(params.id);
        if(resp) {
          return reply.ok(resp);
        } else {
          return reply.fail(404, {
            code: 'NOT_FOUND',
            message: 'Role not found'
          });
        }
    } catch (error:any) {
        logger.error("❌ getById error:", error);
        throw error;
    }
  };
}
