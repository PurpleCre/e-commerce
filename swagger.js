const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'e-commerce',
    description: 'e-commerce Api'
  },
  host: 'e-commerce-xk2o.onrender.com',
  schemes: ['http', 'https']
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];
// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
