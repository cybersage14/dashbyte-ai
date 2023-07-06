const express = require('express');
const router = express.Router();

// Import the model
const Part = require('../models/Part');

// Route to get all parts
router.get('/', async (req, res) => {
  try {
    const parts = await Part.find();
    res.json(parts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
