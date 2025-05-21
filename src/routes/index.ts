import { Elysia } from "elysia";
import { userRoutes } from "./users";
import { bookRoutes } from "./books";

const app = new Elysia()

const router = app
.use(userRoutes)
.use(bookRoutes)
.get("/", () => "Welcome to the API");

export {
    router
}