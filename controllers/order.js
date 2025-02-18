console.log("controllers order")

const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['order']
  console.log('here')
  try {
    mongo.getDatabase().db("e-commerce").collection('order').find().toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getByStatus = async (req, res) => {
  //#swagger.tags=['order']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid order id to find a order.');
  }
  const status = req.params.status;
  try { 
    mongo.getDatabase().db('e-commerce').collection('order').find({ _status: status }).toArray().then((result) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    })
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['order']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid order id to find a order.');
  }
  const orderId = new ObjectId(req.params.id);
  try { 
    mongo.getDatabase().db('e-commerce').collection('order').find({ _id: orderId }).toArray().then((result) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    })
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const createOrder = async (req, res) => {
  //#swagger.tags=['order']
  const order = {
    customerId: req.body.customerId,
    seller: req.body.seller,
    price: req.body.price,
    commision: req.body.commision,
    adminId: req.body.adminId,
    status: req.body.status
  };
  const response = await mongo.getDatabase().db("e-commerce").collection('order').insertOne(order);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user.');
  }
};

const updateOrder = async (req, res) => {
  //#swagger.tags=['order']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid order id to update a order.');
  }

  const orderId = new ObjectId(req.params.id);
  const order = {
    customerId: req.body.customerId,
    seller: req.body.seller,
    price: req.body.price,
    commision: req.body.commision,
    adminId: req.body.adminId,
    status: req.body.status
  };
  const response = await mongo
    .getDatabase()
    .db("e-commerce")
    .collection('order')
    .replaceOne({ _id: orderId }, order);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user.');
  }
};

const deleteOrder = async (req, res) => {
  //#swagger.tags=['order']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid order id to delete a order.');
  }

  const orderId = new ObjectId(req.params.id);
  const response = await mongo
    .getDatabase()
    .db("e-commerce")
    .collection('order')
    .deleteOne({ _id: orderId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user.');
  }
};

module.exports = {
  getAll,
  getByStatus,
  getSingle,
  createOrder,
  updateOrder,
  deleteOrder
};
