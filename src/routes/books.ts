import { Elysia, t } from "elysia";
import { Book } from "../models/index";

const book = new Book();
const bookRoutes = new Elysia({ prefix: "/books" });

const idValidate = t.Object({ id: t.Number() });
const bookBodyValidate= t.Object({
    name: t.String(),
    author: t.String(),
    price: t.Number(),
});
const headersValidate = t.Object({
    Authorization: t.String()
})

// GET /books
bookRoutes.get("/", () => book.getBooks(),{headers: headersValidate});

// GET /books/:id
bookRoutes.get(
    "/:id",
    ({ params }) => book.getBook(Number(params.id)),
    { params: idValidate, headers: headersValidate }
);

// POST /books
bookRoutes.post(
    "/",
    ({ body, set }) => {
        const resp = book.createBook(body);
        if (resp.status === "error") {
            set.status = 400;
            return { message: "Insert Incomplete" };
        }
        return resp;
    },
    { body: bookBodyValidate, headers: headersValidate }
);

// PUT /books/:id
bookRoutes.put(
    "/:id",
    ({ params, body, set }) => {
        const resp:any = book.updateBook(Number(params.id), body);
        if (resp.status === "error") {
            set.status = 400;
            return { status: "error", message: "Insert Incomplete" };
        }
        return resp;
    },
    { params: idValidate, body: bookBodyValidate, headers: headersValidate }
);

// DELETE /books/:id
bookRoutes.delete(
    "/:id",
    ({ params, set }) => {
        const resp = book.deleteBook(Number(params.id));
        if (resp.status === "error") {
            set.status = 400;
            return { message: `Wrong ID or not have ID:${params.id}` };
        }
        return { message: `Delete ID:${params.id} Successfully` };
    },
    { params: idValidate, headers: headersValidate }
);

export { bookRoutes };
