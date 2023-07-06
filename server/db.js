const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('user_benchmarks');
    console.log('Connected to the user_benchmarks database');
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
