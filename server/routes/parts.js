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

// POST /api/parts/select_cpu
router.post('/select_cpu', async (req, res) => {
  // Code for selecting CPU...
});

// POST /api/parts/select_gpu
router.post('/select_gpu', async (req, res) => {
  // Code for selecting GPU...
});

// POST /api/parts/select_ram
router.post('/select_ram', async (req, res) => {
  // Code for selecting RAM...
});

// POST /api/parts/select_hdd
router.post('/select_hdd', async (req, res) => {
  // Code for selecting HDD...
});

// POST /api/parts/select_ssd
router.post('/select_ssd', async (req, res) => {
  // Code for selecting SSD...
});

// POST /api/parts/select_usb
router.post('/select_usb', async (req, res) => {
  // Code for selecting USB...
});

// POST /api/parts/select_pc
router.post('/select_pc', async (req, res) => {
  const db = req.app.get('db');
  try {
    // Get the parameters from the request body
    const { cpuPerformance, gpuPerformance, ramCapacity, hddCapacity, ssdCapacity, usbCapacity } = req.body;
  
    // Call the select endpoints
    const cpu = await db.collection('CPU_UserBenchmarks').findOne({ /* query based on cpuPerformance */ });
    const gpu = await db.collection('GPU_UserBenchmarks').findOne({ /* query based on gpuPerformance */ });
    const ram = await db.collection('RAM_UserBenchmarks').findOne({ /* query based on ramCapacity */ });
    const hdd = await db.collection('HDD_UserBenchmarks').findOne({ /* query based on hddCapacity */ });
    const ssd = await db.collection('SSD_UserBenchmarks').findOne({ /* query based on ssdCapacity */ });
    const usb = await db.collection('USB_UserBenchmarks').findOne({ /* query based on usbCapacity */ });

    // Send the selected PC to the client
    res.json({ cpu, gpu, ram, hdd, ssd, usb });
  } catch (err) {
    console.error('An error occurred while selecting a PC:', err.stack);
    res.status(500).json({ message: 'An error occurred while processing your request.', error: err.stack });
  }
});

module.exports = router;

