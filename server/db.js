const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('user_benchmarks'); // Connect to the 'user_benchmarks' database
    console.log('Connected to the user_benchmarks database');
  } catch (err) {
    console.error('An error occurred while connecting to MongoDB:', err.stack);
    process.exit(1); // Exit the application if there's an error
  }
};


const getDb = () => {
  if (!db) {
    console.error('Database not initialized');
    process.exit(1); // Exit the application if there's an error
  }
  return db;
};

module.exports = { connectToMongoDB, getDb };
