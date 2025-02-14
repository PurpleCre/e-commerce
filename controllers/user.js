console.log("controllers user")

const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['user']
  console.log('here')
  try {
    mongo.getDatabase().db("e-commerce").collection('user').find().toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['user']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to find a user.');
  }
  const userId = new ObjectId(req.params.id);
  try { 
    mongo.getDatabase().db('e-commerce').collection('user').find({ _id: userId }).toArray().then((result) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    })
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const createUser = async (req, res) => {
  //#swagger.tags=['user']
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  };
  const response = await mongo.getDatabase().db("e-commerce").collection('user').insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user.');
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['user']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to update a user.');
  }

  const userId = new ObjectId(req.params.id);
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    pendingOrders: req.body.pendingOrders,
    orderHistory: req.body.orderHistory,
  };
  const response = await mongo
    .getDatabase()
    .db("e-commerce")
    .collection('user')
    .replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user.');
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=['user']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to delete a user.');
  }

  const userId = new ObjectId(req.params.id);
  const response = await mongo
    .getDatabase()
    .db("e-commerce")
    .collection('user')
    .deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};
