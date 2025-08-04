import { Elysia } from "elysia";
import { userRoutes } from "./users";
import { bookRoutes } from "./books";
import { authRoutes } from "./authenticate";
import { roleRoutes } from "./roles";
import { attachmentRoutes } from "./attachment";

const routeDetail: any = {
  prefix: "/api/v1",
  detail: {
    tags: ["API"],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
};
const apiV1 = new Elysia(routeDetail)
  .use(authRoutes)
  .use(userRoutes)
  .use(bookRoutes)
  .use(roleRoutes)
  .use(attachmentRoutes);

export { apiV1 };
