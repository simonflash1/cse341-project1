const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'CSE 341 - Contacts API. Provides CRUD operations for a contacts collection stored in MongoDB.',
    version: '1.0.0',
  },
  host: 'cse341-project1-os3l.onrender.com',
  schemes: ['https'],
  tags: [
    {
      name: 'Contacts',
      description: 'Endpoints to create, read, update, and delete contacts.',
    },
  ],
};

const outputFile = './routes/swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);