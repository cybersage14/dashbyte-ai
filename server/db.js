const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
let db;

const connectToMongoDB = async () => {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment.");
    console.log("You successfully connected to MongoDB!");
    db = client.db('user_benchmarks');
    console.log('Connected to the user_benchmarks database');
    return client; // Add this line
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
