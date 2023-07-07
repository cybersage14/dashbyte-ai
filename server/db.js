const { MongoClient } = require('mongodb');
const { MONGO_URI } = require('../config'); // Import MONGO_URI from config.js

const client = new MongoClient(MONGO_URI, { // Use MONGO_URI instead of uri
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

const connectToMongoDB = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB and pinged your deployment.");
    db = client.db('user_benchmarks');
    console.log('Connected to the user_benchmarks database');
    return client;
  } catch (err) {
    console.error('An error occurred while connecting to MongoDB:', err.stack);
    process.exit(1);
  }
};

const getDb = () => {
  if (!db) {
    console.error('Database not initialized');
    process.exit(1);
  }
  return db;
};

module.exports = { connectToMongoDB, getDb };
