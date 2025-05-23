import { Elysia, t } from "elysia";
import { UserController } from "@/controllers/userController";


const routeDetail:any = {
    prefix:'/users',
    detail: {
        tags: ['Users'],
        security: [
            {
                bearerAuth: []
            }
        ]
    }
}

const userRoutes = new Elysia(routeDetail)
const userController = new UserController();

userRoutes.get("/", async({set}) =>userController.getAll());

userRoutes.get("/:id", ({ params }: { params: any }) =>userController.getById(params),
{params: t.Object({ id: t.Number() })});

userRoutes.put(
  "/:id",
  async ({ params, body, set }) => userController.updateUser({ params, body, set }),
  {
    body: t.Object({
      email: t.String(),
      password: t.String(),
      first_name: t.String(),
      last_name: t.String(),
    }),
  }
);

export { userRoutes };
