
export const swaggerSetting:any = {
      path: "/api-doc/swagger",
      documentation: {
        info: {
          title: "BOOK BUN API",
          version: "1.0.0",
        },
        tags: [
          { name: "Authenticate", description: "Authenticate endpoints" },
          { name: "Default", description: "General endpoints" },
          { name: "API", description: "General endpoints" },
          { name: "Users", description: "Users endpoints" },
          { name: "Books", description: "Books endpoints" },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [{ bearerAuth: [] }],
      },
    }