require('dotenv').config({ path: '.env.local' });

console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

const express = require('express');
const partsRouter = require('./routes/parts');
const { connectToMongoDB, getDb } = require('./db');
const { initializeOpenAI } = require('./openai');

const app = express();

app.use('/api/parts', partsRouter);

initializeOpenAI(process.env.OPENAI_API_KEY);

let client; // Add this line

connectToMongoDB(process.env.MONGO_URI)
  .then((mongoClient) => { // Modify this line
    client = mongoClient; // Add this line
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
  if (client) { // Add this line
    await client.close();
  }
  process.exit(0);
});
