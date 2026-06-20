const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API emihack",
      version: "1.0.0",
      description: "Documentation API"
    },
    servers: [
      {
        url: "http://localhost:7777"
      }
    ]
  },

  apis: [
    "./src/routes/*.js"
  ]
};

module.exports = swaggerJsdoc(options);