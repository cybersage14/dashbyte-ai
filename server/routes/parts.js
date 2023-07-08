const express = require('express');
const router = express.Router();

// GET /api/parts/:part
router.get('/:part', async (req, res) => {
  const db = req.app.get('db');
  try {
    const partType = req.params.part.toUpperCase();
    const collectionName = `${partType}_UserBenchmarks`;
    console.log(`Fetching parts of type ${partType} from collection ${collectionName}`);
    const collection = db.collection(collectionName);
    const parts = await collection.find().toArray();
    res.json(parts);
  } catch (err) {
    console.error('An error occurred while fetching parts:', err.stack);
    res.status(500).json({ message: 'An error occurred while processing your request.', error: err.stack });
  }  
});

module.exports = router;
