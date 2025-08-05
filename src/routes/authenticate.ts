import { Elysia, t } from "elysia";
import { UserController } from "@/controllers/userController";

const userController = new UserController();
const routeDetail:any = {
    prefix:'/auth',
    detail: {
        tags: ['Authenticate'],
        security: [
            {
                bearerAuth: []
            }
        ]
    }
}
const authRoutes = new Elysia(routeDetail);

// POST /register
authRoutes.post(
  "/register",
  async (ctx:any) => userController.createUser(ctx),
  {
    body: t.Object({
      email: t.String(),
      password: t.String(),
      firstname: t.String(),
      lastname: t.String(),
    }),
  }
);
// POST /login
authRoutes.post(
  "/login",
  async (ctx:any) => userController.login(ctx),
  {
    body: t.Object({
      email: t.String(),
      password: t.String()
    }),
  }
);
// POST /logout
authRoutes.post(
  "/logout",
  async (ctx:any) => userController.logout(ctx),
);

export { authRoutes };
