const routes = require('express').Router();
const orderController = require('../controllers/order');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

routes.get('/', orderController.getAll);
routes.get('/:id', orderController.getSingle);
routes.post('/', isAuthenticated, validation.saveOrder, orderController.createOrder);
routes.put('/:id', isAuthenticated, validation.saveOrder, orderController.updateOrder);
routes.delete('/:id', isAuthenticated, orderController.deleteOrder);

module.exports = routes;
