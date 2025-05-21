import { Elysia } from "elysia";
import { router } from "./routes"
const app = new Elysia()

app.use(router).listen(3000);

console.log(
  `🦊 Elysia is running at http:${app.server?.hostname}:${app.server?.port}`
);
