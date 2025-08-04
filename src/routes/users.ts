import { Elysia, t as validate } from "elysia";
import { UserController } from "@/controllers/userController";

const routeDetail: any = {
  prefix: "/users",
  detail: {
    tags: ["Users"],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
};

const userRoutes:any = new Elysia(routeDetail);
const userController:any = new UserController();

userRoutes.get("/", async (ctx:any) =>userController.getAll(ctx));

userRoutes.get(
  "/:id",
  (ctx:any) =>userController.getById(ctx),
  { params: validate.Object({ id: validate.String() })}
);

userRoutes.put(
  "/:id",
  async (ctx:any) =>
    userController.updateUser(ctx),
  {
    body: validate.Object({
      email: validate.String(),
      password: validate.String(),
      first_name: validate.String(),
      last_name: validate.String(),
      roleIds: validate.Array(validate.String()),
    }),
  }
);

userRoutes.post(
  "/",
  async (ctx:any) =>
    userController.createUser(ctx),
  {
    body: validate.Object({
      email: validate.String(),
      password: validate.String(),
      firstname: validate.String(),
      lastname: validate.String(),
      roleIds: validate.Array(validate.String()),
    }),
  }
);

export { userRoutes };
