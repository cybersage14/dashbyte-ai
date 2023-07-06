const express = require('express');
const router = express.Router();

router.get('/:part', async (req, res) => {
  const db = req.app.get('db');
  try {
    const collection = db.collection(`${req.params.part.toUpperCase()}_UserBenchmarks`);
    const parts = await collection.find().toArray();
    res.json(parts);
  } catch (err) {
    console.error('An error occurred while fetching parts:', err);
    res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
});

module.exports = router;
