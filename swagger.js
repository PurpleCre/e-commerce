const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'School Thingy',
    description: 'Certificates Api'
  },
  host: 'project2-2zzo.onrender.com',
  schemes: ['http', 'https']
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];
// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
