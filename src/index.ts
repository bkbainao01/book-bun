import { Elysia } from "elysia";
import { api } from "./routes/api";
import { swagger } from "@elysiajs/swagger";
import { swaggerSetting } from "./utils/swaggerSetting"
import jwt from "@elysiajs/jwt";
import { bearer } from "@elysiajs/bearer";
import { validateBearerToken } from "./utils/helper";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = new Elysia();

app
  .derive(() => ({db: prisma}))
  .use(
    jwt({
      name: "jwt",
      secret:
        process.env.JWT_SECRET_KEY ??
        (() => {
          throw new Error("JWT_SECRET_KEY environment variable is not set");
        })(),
      exp: "7d",
    })
  )
  .use(bearer())
  .derive(async ({ bearer, jwt, request, set }) => validateBearerToken({request, bearer, jwt, set}))
  .use(api)
  .get("/", () => "Welcome to Book-Bun-API", { detail: { tags: ["Default"] } })
  .use(swagger(swaggerSetting))
  .listen(3000);
console.log(
  `🦊 Elysia is running at http:${app.server?.hostname}:${app.server?.port}`
);
