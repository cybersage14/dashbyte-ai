const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

const getDb = () => db;

const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('user_benchmarks'); // Connect to the 'user_benchmarks' database
  } catch (err) {
    console.error('An error occurred while connecting to MongoDB:', err);
    process.exit(1); // Exit the application if there's an error
  }
};

module.exports = { connectToMongoDB, getDb, client };
