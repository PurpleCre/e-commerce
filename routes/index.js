const routes = require('express').Router();

routes.use('/', require('./swagger'));
routes.get('/', (req, res) => {
  // swagger.tags=['Hello World']
  res.send('Hello World');
});

routes.use('/user', require('./user'));
routes.use('/product', require('./product'));

module.exports = routes;
