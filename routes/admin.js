const routes = require('express').Router();
const adminController = require('../controllers/admin');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

routes.get('/', adminController.getAll);
routes.get('/:id', adminController.getSingle);
routes.post('/', isAuthenticated, validation.saveAdmin, adminController.createAdmin);
routes.put('/:id', isAuthenticated, validation.saveAdmin, adminController.updateAdmin);
routes.delete('/:id', isAuthenticated, adminController.deleteAdmin);

module.exports = routes;
