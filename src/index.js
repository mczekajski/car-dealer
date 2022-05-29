const app = require("./app");
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Cars API',
        version: '1.0.0'
      }
    },
    apis: ['src/routes/*.js']
  }

const swaggerDocs = swaggerJsDoc(swaggerOptions);
console.log(swaggerDocs);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Car Dealer API listening on port ${port}`);
});
