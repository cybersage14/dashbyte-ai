const { MongoClient } = require('mongodb');
const { MONGO_URI } = require('../config'); // Import MONGO_URI from config.js

// Create a new MongoClient
const client = new MongoClient(MONGO_URI, { // Use MONGO_URI instead of uri
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Declare a variable to store the database
let db;

// Function for connecting to MongoDB
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

// Function for getting the database
const getDb = () => {
  if (!db) {
    console.error('Database not initialized');
    process.exit(1);
  }
  return db;
};

module.exports = { connectToMongoDB, getDb };
