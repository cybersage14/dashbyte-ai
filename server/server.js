require('dotenv').config({ path: '../.env.local' });
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

const express = require('express');
const partsRouter = require('./routes/parts');
const { connectToMongoDB, getDb } = require('./db');

const app = express();

app.use('/api/parts', partsRouter);

connectToMongoDB()
  .then(() => {
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
  await client.close();
  process.exit(0);
});
