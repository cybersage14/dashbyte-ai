require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());

let _db;

async function connectToDb() {
  const client = new MongoClient(process.env.MONGO_URI, { useUnifiedTopology: true });
  await client.connect();
  _db = client.db('user_benchmarks');
  console.log('Connected to MongoDB');
}

function getDb() {
  console.log('Getting DB'); // Log a message every time getDb is called
  return _db;
}

app.get('/api/parts/:partType', async (req, res) => {
  try {
    const partType = req.params.partType;
    const db = getDb();
    console.log(`Fetching parts from collection: ${partType}_UserBenchmarks`);
    const parts = await db.collection(`${partType}_UserBenchmarks`).find().toArray();
    res.json(parts);
  } catch (err) {
    console.error(`Failed to fetch parts:`, err); // Log the entire error object
    res.status(500).json({ error: 'Failed to fetch parts.' });
  }
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
  connectToDb();
});
