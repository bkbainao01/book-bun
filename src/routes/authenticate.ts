import { Elysia, t } from "elysia";
import { User } from "../models/index";

const user = new User();
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
  async ({ body, set }: { body: any; set: any }) => {
    try {
      body.password = await Bun.password.hash(body.password, {
        algorithm: "bcrypt",
        cost: 4, //number between 4-31
      });
      const resp: any = user.createUser({
        email: body.email,
        password: body.password,
        first_name: body.first_name,
        last_name: body.last_name,
      });
      if (resp.status === "error") {
        set.status = 400;
        throw new Error("form is invalid");
      }
      return resp;
    } catch (error: any) {
      console.log("🚀 ~ error:", error)
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
// POST /login
authRoutes.post(
  "/login",
  async ({ jwt, body, set }) => {
    try {
      const bodyData:any = body
      const resp: any = await user.getUserByEmail({
        email: bodyData.email,
        password: bodyData.password
      });
      if (!resp.data.isLoggedIn) {
        set.status = 400;
        throw new Error("Email or password is invalid");
      }
       const token = await jwt.sign({
        email: body.email,
      });
      resp.data.token = token;
      return resp;
    } catch (error: any) {
      return { status: "error", message: error.message };
    }
  },
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
  async ({ body, set}) => {
    try {
      return { status:'ok', message: 'Logout Successful' };
    } catch (error: any) {
      return { status: "error", message: error.message };
    }
  },
);

export { authRoutes };
