require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const partsRouter = require('./routes/parts'); // Import the parts router

const app = express();
app.use(cors());

let _db;

async function connectToDb() {
  try {
    const client = new MongoClient(process.env.MONGO_URI, { useUnifiedTopology: true });
    await client.connect();
    _db = client.db('user_benchmarks');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
}

function getDb() {
  if (!_db) {
    console.error('Database not initialized');
  }
  console.log('Getting DB'); // Log a message every time getDb is called
  return _db;
}

app.set('db', getDb); // Set the db object in your Express app

app.use('/api/parts', partsRouter); // Use the parts router for requests to /api/parts/...

app.listen(5000, () => {
  console.log('Server listening on port 5000');
  connectToDb();
});
