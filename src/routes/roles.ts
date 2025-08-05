import { Elysia, status, t } from "elysia";
import { RoleController } from "@/controllers/roleController";
const routeDetail:any = {
    prefix:'/roles',
    detail: {
        tags: ['Roles'],
        security: [
            {
                bearerAuth: []
            }
        ]
    }
}
const roleRoutes = new Elysia(routeDetail);

const idValidate = t.Object({ id: t.Number() });

const roleController = new RoleController();

// GET /books
roleRoutes.get("/", async (ctx:any) =>roleController.getAll(ctx));

// GET /books/:id
roleRoutes.get(
    "/:id",
    (ctx:any) => roleController.getById(ctx),
    { params: idValidate }
);

export { roleRoutes };
