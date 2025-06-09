import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Mi API de Mascotas',
    version: '1.0.0',
    description: 'Documentación generada automáticamente con Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Busca comentarios en todos los JS
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
