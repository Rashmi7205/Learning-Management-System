import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LMS API",
      version: "1.0.0",
      description: "Learning Management System API documentation",
    },
    servers: [
      {
        url: "http://localhost:3030/api/auth",
      },
    ],
  },
  apis: ["./routes/*.js"], // auto read routes
});
