const swaggerJSDoc = require("swagger-jsdoc");
const glob = require("glob");

const routeFiles = glob.sync('./src/route/*.js');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jaryk face project",
      version: "1.0.0",
      description: "Jaryk face description",
      contact: {
        email: "doolot928@gmail.com"
      },
    },
    servers: [
      { url: "http://localhost:3000/" }
    ]
  },
  apis: routeFiles
}

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;