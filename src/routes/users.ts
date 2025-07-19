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

const userRoutes = new Elysia(routeDetail);
const userController = new UserController();

userRoutes.get("/", async ({ set }) => userController.getAll());

userRoutes.get(
  "/:id",
  ({ params }: { params: any }) => userController.getById({params}),
  { params: validate.Object({ id: validate.String() }) }
);

userRoutes.put(
  "/:id",
  async ({ params, body, set }) =>
    userController.updateUser({ params, body, set }),
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
  async ({ params, body, set }) =>
    userController.createUser({ params, body, set }),
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

export { userRoutes };
