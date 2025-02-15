// mongodb
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let database;
let client;
const initDb = (callback) => {
  if (database) {
    console.log('DB is already initialised');
    return callback(null, database);
  }
  MongoClient.connect(process.env.DB_URI)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const closeDb = () => {
  if (client) {
    return client.close(); // Close the MongoDB client
  }
};

const getDatabase = () => {
  if (!database) {
    throw 'Database not initialised!';
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase,
  closeDb
};
