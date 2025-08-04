import { Elysia } from "elysia";
import { apiV1 } from "./routes/apiV1";
import { swagger } from "@elysiajs/swagger";
import { swaggerSetting } from "./utils/swaggerSetting"
import jwt from "@elysiajs/jwt";
import { bearer } from "@elysiajs/bearer";
import { authPlugin } from "./plugins/authPlugin";
import { envelopePlugin } from './plugins/envelope';
import { PrismaClient } from '@prisma/client'
import { UserSessionService } from './services/userSessionService'; // service จริงของคุณ
import cors from '@elysiajs/cors'

const prisma = new PrismaClient()
const sessionService = new UserSessionService();
const app = new Elysia();
const appPort: string = process.env.APP_PORT ?? "3000";
app
  .use(cors({
    origin: '*',
    credentials: true // ถ้าคุณต้องการส่ง cookie, Authorization header
  }))
  .use(envelopePlugin)
  .derive(() => ({db: prisma}))
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET_KEY ?? 'secret-book-bun',
      exp: "7d",
    })
  )
  .use(bearer())
  .decorate('userSessionService', sessionService) // inject service
  .derive(async ({ bearer, jwt, request, set }) => authPlugin({ bearer, jwt, request, set }))
  .use(apiV1)
  .get("/", () => "Welcome to Book-Bun-API", { detail: { tags: ["Default"] } })
  .get('/health', () => ({ ok: true }), { detail: { tags: ["Default"] } })
  .use(swagger(swaggerSetting),)
  .listen(appPort);

  console.log(`running at http://localhost:${appPort}`)

