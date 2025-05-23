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
  async ({ body, set }) => userController.createUser(body),
  {
    body: t.Object({
      email: t.String(),
      password: t.String(),
      first_name: t.String(),
      last_name: t.String(),
    }),
  }
);
// POST /login
authRoutes.post(
  "/login",
  async ({ jwt, body, set }) => userController.login({jwt, body, set}),
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
  async ({ body, set}) => userController.logout({body, set}),
);

export { authRoutes };
