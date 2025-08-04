import { Elysia, status, t } from "elysia";
import { AttachmentController } from "@/controllers/attachmentController";
const routeDetail: any = {
  prefix: "/attachments",
  detail: {
    tags: ["Attachments"],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
};
const attachmentRoutes = new Elysia(routeDetail);

const idValidate = t.Object({ id: t.Number() });
const attachmentController = new AttachmentController();

// GET /books
attachmentRoutes.get("/", async (ctx:any) => attachmentController.getAll(ctx));

// GET /books/:id
attachmentRoutes.get(
  "/:id",
  (ctx:any) => attachmentController.getById(ctx),
  {
    params: idValidate,
  }
);

// DELETE /books/:id
attachmentRoutes.delete(
  "/:id",
  (ctx:any) => attachmentController.delete(ctx),
  { params: idValidate }
);

export { attachmentRoutes };
