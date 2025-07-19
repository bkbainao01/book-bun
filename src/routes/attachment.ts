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
attachmentRoutes.get("/", async () => attachmentController.getAll());

// GET /books/:id
attachmentRoutes.get(
  "/:id",
  ({ params }) => attachmentController.getById(params),
  {
    params: idValidate,
  }
);

// DELETE /books/:id
attachmentRoutes.delete(
  "/:id",
  ({ params, set }) => attachmentController.delete({ params, set }),
  { params: idValidate }
);

export { attachmentRoutes };
