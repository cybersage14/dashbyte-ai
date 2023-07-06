require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { connectToMongoDB, getDb } = require('./db'); // Import the new db module
const partsRouter = require('./routes/parts'); // Import the parts router

const app = express();
app.use(cors());

app.set('db', getDb); // Set the db object in your Express app

app.use('/api/parts', partsRouter); // Use the parts router for requests to /api/parts/...

connectToMongoDB().then(() => { // Use the connectToMongoDB function from the db module
  app.listen(5000, () => {
    console.log('Server listening on port 5000');
  });
});

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});
