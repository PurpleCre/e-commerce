const routes = require('express').Router();
const productController = require('../controllers/product');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

routes.get('/', productController.getAll);
routes.get('/:id', productController.getSingle);
routes.post('/', isAuthenticated, validation.saveProduct, productController.createProduct);
routes.put('/:id', isAuthenticated, validation.saveProduct, productController.updateProduct);
routes.delete('/:id', isAuthenticated, productController.deleteProduct);

module.exports = routes;
