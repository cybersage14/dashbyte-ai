const express = require('express');
const router = express.Router();

// GET /api/parts/:part
router.get('/:part', async (req, res) => {
  const db = req.app.get('db');
  try {
    // Get the part type from the request parameters
    const partType = req.params.part.toUpperCase();

    // Get the collection name from the part type
    const collectionName = `${partType}_UserBenchmarks`;
    
    // Get the parts from the database
    const collection = db.collection(collectionName);

    // Return the parts to the client
    const parts = await collection.find().toArray();
    
    // Send the parts to the client
    res.json(parts);
  } catch (err) {
    console.error('An error occurred while fetching parts:', err.stack);
    res.status(500).json({ message: 'An error occurred while processing your request.', error: err.stack });
  }  
});

module.exports = router;
