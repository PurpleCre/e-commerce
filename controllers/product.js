console.log("controllers product")

const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['product']
  console.log('here')
  try {
    mongo.getDatabase().db("e-commerce").collection('product').find().toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['product']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid product id to find a product.');
  }
  const productId = new ObjectId(req.params.id);
  try { 
    mongo.getDatabase().db('project2').collection('product').find({ _id: productId }).toArray().then((result) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    })
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const createProduct = async (req, res) => {
  //#swagger.tags=['product']
  const product = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discount: req.body.discount,
    inStock: req.body.inStock,
    image: req.body.image,
  };
  const response = await mongo.getDatabase().db("project2").collection('product').insertOne(product);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user.');
  }
};

const updateProduct = async (req, res) => {
  //#swagger.tags=['product']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid product id to update a product.');
  }

  const productId = new ObjectId(req.params.id);
  const product = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discount: req.body.discount,
    inStock: req.body.inStock,
    image: req.body.image,
  };
  const response = await mongo
    .getDatabase()
    .db("e-commerce")
    .collection('product')
    .replaceOne({ _id: productId }, product);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user.');
  }
};

const deleteProduct = async (req, res) => {
  //#swagger.tags=['product']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid product id to delete a product.');
  }

  const productId = new ObjectId(req.params.id);
  const response = await mongo
    .getDatabase()
    .db("e-commerce")
    .collection('product')
    .deleteOne({ _id: productId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createProduct,
  updateProduct,
  deleteProduct
};
