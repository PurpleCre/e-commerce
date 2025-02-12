const validator = require('../helpers/validate');

// validate certificate data
const saveProduct = (req, res, next) => {
  const validationRule = {
    title: 'required',
    description: 'required',
    price: 'required',
    discount: 'required',
    inStock: 'required|bool',
    image: 'required'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};
// validate degrees
const saveUser = (req, res, next) => {
  const validationRule = {
    username: "required|string",
    email: "required|email",
    password: "required",
    phone: "required",
    pendingOrders: "required",
    orderHistory: "required",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveProduct,
  saveUser
};
