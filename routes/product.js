const routes = require('express').Router();
const productController = require('../controllers/product');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

routes.get('/', productController.getAll);
routes.get('/stock', productController.getInstock);
routes.get('/:id', productController.getSingle);
routes.post('/', isAuthenticated, validation.saveProduct, productController.createProduct);
routes.put('/:id', isAuthenticated, validation.saveProduct, productController.updateProduct);
// routes.put('/:id/image', isAuthenticated, validation.saveProduct, productController.updateProductImage);
routes.delete('/:id', isAuthenticated, productController.deleteProduct);

module.exports = routes;
