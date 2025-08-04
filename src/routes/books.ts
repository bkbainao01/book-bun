import { Elysia, status, t } from "elysia";
import { BookController } from "@/controllers/bookController";
const routeDetail:any = {
    prefix:'/books',
    detail: {
        tags: ['Books'],
        security: [
            {
                bearerAuth: []
            }
        ]
    }
}
const bookRoutes = new Elysia(routeDetail);

const idValidate = t.Object({ id: t.Number() });
const bookBodyValidate= t.Object({
    nameTh: t.String(),
    nameEn: t.String(),
    author: t.String(),
    publisher: t.String(),
    attachment: t.String(),
    rating: t.Number(),
    price: t.Number(),
    discount: t.Number(),
    description: t.String(),
    summary: t.String()
});
const bookController = new BookController();

// GET /books
bookRoutes.get("/", async (ctx:any) => bookController.getAll(ctx));

// GET /books/:id
bookRoutes.get(
    "/:id",
    (ctx:any) => bookController.getById(ctx),
    { params: idValidate }
);

// POST /books
bookRoutes.post(
    "/",
    (ctx) => bookController.createBook(ctx),
    { body: bookBodyValidate }
);

// PUT /books/:id
bookRoutes.put(
    "/:id",
    (ctx) => bookController.updateBook(ctx),
    { params: idValidate, body: bookBodyValidate }
);

// DELETE /books/:id
bookRoutes.delete(
    "/:id",
    ({ params, set }) => bookController.delete({ params, set }),
    { params: idValidate }
);

export { bookRoutes };
