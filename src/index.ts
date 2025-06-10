import { Elysia } from "elysia";
import { api } from "./routes/api";
import { swagger } from "@elysiajs/swagger";
import { swaggerSetting } from "./utils/swaggerSetting"
import jwt from "@elysiajs/jwt";
import { bearer } from "@elysiajs/bearer";
import { authPlugin } from "./plugins/authPlugin";
import { PrismaClient } from '@prisma/client'
import { UserSessionService } from './services/userSessionService'; // service จริงของคุณ

const prisma = new PrismaClient()
const sessionService = new UserSessionService();
const app = new Elysia();

app
  .derive(() => ({db: prisma}))
  .use(
    jwt({
      name: "jwt",
      secret:'kunikuzushi',
      exp: "7d",
    })
  )
  .use(bearer())
  .decorate('userSessionService', sessionService) // inject service
  .derive(async ({ bearer, jwt, request, set }) => authPlugin({ bearer, jwt, request, set }))
  .use(api)
  .get("/", () => "Welcome to Book-Bun-API", { detail: { tags: ["Default"] } })
  .use(swagger(swaggerSetting))
  .listen(3000);

