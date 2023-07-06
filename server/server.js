const express = require('express');
const { MongoClient } = require('mongodb');
const partsRouter = require('./routes/parts');

const app = express();

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

const getDb = () => db;

const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('user_benchmarks');
    app.set('db', db);
    app.listen(5000, () => console.log('Server listening on port 5000'));
  } catch (err) {
    console.error('An error occurred while connecting to MongoDB:', err);
    process.exit(1);
  }
};

app.use('/api/parts', partsRouter);

connectToMongoDB();

// Shutdown function
process.on('SIGINT', async () => {
  console.log('Gracefully shutting down...');
  await client.close();
  process.exit(0);
});
