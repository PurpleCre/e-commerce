console.log("controllers admin")

const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['admin']
  console.log('here')
  try {
    mongo.getDatabase().db("e-commerce").collection('admin').find().toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['admin']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid admin id to find a admin.');
  }
  const adminId = new ObjectId(req.params.id);
  try { 
    mongo.getDatabase().db('e-commerce').collection('admin').find({ _id: adminId }).toArray().then((result) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    })
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const createAdmin = async (req, res) => {
  //#swagger.tags=['admin']
  const admin = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    level: req.body.level,
    phone: req.body.phone,
    address: req.body.address
  };
  const response = await mongo.getDatabase().db("e-commerce").collection('admin').insertOne(admin);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user.');
  }
};

const updateAdmin = async (req, res) => {
  //#swagger.tags=['admin']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid admin id to update a admin.');
  }

  const adminId = new ObjectId(req.params.id);
  const admin = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    level: req.body.level,
    phone: req.body.phone,
    address: req.body.address
  };
  const response = await mongo
    .getDatabase()
    .db("e-commerce")
    .collection('admin')
    .replaceOne({ _id: adminId }, admin);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user.');
  }
};

const deleteAdmin = async (req, res) => {
  //#swagger.tags=['admin']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid admin id to delete a admin.');
  }

  const adminId = new ObjectId(req.params.id);
  const response = await mongo
    .getDatabase()
    .db("e-commerce")
    .collection('admin')
    .deleteOne({ _id: adminId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createAdmin,
  updateAdmin,
  deleteAdmin
};
