const express = require('express');
const partsRouter = require('./routes/parts');
const chatRouter = require('./routes/chat');
const { connectToMongoDB, getDb } = require('./db');
const { initializeOpenAI } = require('./openai');
const { OPENAI_API_KEY, MONGO_URI } = require('../config');

// Create Express app
const app = express();

// Middleware
initializeOpenAI(OPENAI_API_KEY);

// Routes
app.use('/api/parts', partsRouter);
app.use('/api/chat', chatRouter);

// Connect to MongoDB and start server
let client;

// Connect to MongoDB
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
