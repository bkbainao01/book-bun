import { Elysia, t } from "elysia";
import { User } from "../models/index";


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

const user = new User();
const userRoutes = new Elysia(routeDetail)


userRoutes.get("/", async({set}) => {
    return user.getUsers();
});

userRoutes.get("/:id", ({ params }: { params: any }) => {
  const resp: any = user.getUser(params.id);
  return resp;
});

userRoutes.put(
  "/:id",
  async ({ params, body, set }: { params: any; body: any; set: any }) => {
    try {
      body.password = await Bun.password.hash(body.password, {
        algorithm: "bcrypt",
        cost: 4, //number between 4-31
      });
      const resp: any = user.updateUser(parseInt(params.id), {
        email: body.email,
        password: body.password,
        first_name: body.first_name,
        last_name: body.last_name,
      });
      if (resp.status === "error") {
        throw new Error("form is invalid");
      }
      return resp;
    } catch (error: any) {
      return { message: "error", error: error.message };
    }
  },
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
