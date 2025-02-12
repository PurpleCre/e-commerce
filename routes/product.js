const routes = require('express').Router();
const productController = require('../controllers/product');
const validation = require('../middleware/validate');

routes.get('/', productController.getAll);
routes.get('/:id', productController.getSingle);
routes.post('/', validation.saveProduct, productController.createProduct);
routes.put('/:id', validation.saveProduct, productController.updateProduct);
routes.delete('/:id', productController.deleteProduct);

module.exports = routes;
