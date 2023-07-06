require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

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

app.get('/api/parts/:partType', async (req, res) => {
  try {
    const partType = req.params.partType;
    const db = getDb();
    console.log(`Fetching parts from collection: ${partType}_UserBenchmarks`);
    const parts = await db.collection(`${partType}_UserBenchmarks`).find().toArray();
    console.log(`Fetched ${parts.length} parts from collection: ${partType}_UserBenchmarks`);
    res.json(parts);
  } catch (err) {
    console.error(`Failed to fetch parts from collection: ${req.params.partType}_UserBenchmarks`, err); // Log the entire error object
    res.status(500).json({ error: 'Failed to fetch parts.' });
  }
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
  connectToDb();
});
