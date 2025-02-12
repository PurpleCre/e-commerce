const routes = require('express').Router();
const userController = require('../controllers/user');
const validation = require('../middleware/validate');

routes.get('/', userController.getAll);
routes.get('/:id', userController.getSingle);
routes.post('/', validation.saveUser, userController.createUser);
routes.put('/:id', validation.saveUser, userController.updateUser);
routes.delete('/:id', userController.deleteUser);

module.exports = routes;
