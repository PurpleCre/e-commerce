const routes = require('express').Router();
const userController = require('../controllers/user');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");


routes.get('/', userController.getAll);
routes.get('/:id', userController.getSingle);
routes.post('/', isAuthenticated, validation.saveUser, userController.createUser);
routes.put('/:id', isAuthenticated, validation.saveUser, userController.updateUser);
routes.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = routes;
