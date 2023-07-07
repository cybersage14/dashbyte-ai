const express = require('express');
const partsRouter = require('./routes/parts');
const { connectToMongoDB, getDb } = require('./db');
const { initializeOpenAI } = require('./openai');
const { OPENAI_API_KEY, MONGO_URI } = require('../config');

console.log('OPENAI_API_KEY:', OPENAI_API_KEY);
console.log('MONGO_URI:', MONGO_URI);

const app = express();

app.use('/api/parts', partsRouter);

initializeOpenAI(OPENAI_API_KEY);

let client;

connectToMongoDB(MONGO_URI)
  .then((mongoClient) => {
    client = mongoClient;
    const db = getDb();
    app.set('db', db);
    app.listen(5000, () => console.log('Server listening on port 5000'));
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Shutdown function
process.on('SIGINT', async () => {
  console.log('Gracefully shutting down...');
  if (client) {
    await client.close();
  }
  process.exit(0);
});
