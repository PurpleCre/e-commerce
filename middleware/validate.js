const validator = require('../helpers/validate');

// validate product data
const saveProduct = (req, res, next) => {
  const validationRule = {
    title: 'required',
    description: 'required',
    price: 'required',
    discount: 'required',
    inStock: 'required|boolean',
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
// validate order data
const saveOrder = (req, res, next) => {
  const validationRule = {
    customerId: 'required',
    seller: 'required',
    price: 'required',
    commision: 'required',
    adminId: 'required',
    status: 'required'
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
// validate user data
const saveUser = (req, res, next) => {
  const validationRule = {
    username: "required|string",
    email: "required|email",
    password: "required",
    phone: "required",
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
// validate user data
const saveAdmin = (req, res, next) => {
  const validationRule = {
    username: "required|string",
    email: "required|email",
    password: "required",
    level: "required",
    phone: "required",
    address: "required"
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
  saveUser,
  saveAdmin,
  saveOrder
};
