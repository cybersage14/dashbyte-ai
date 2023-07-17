const express = require('express');
const { getAiMessage } = require('../openai');

const router = express.Router();

// Route: POST /api/chat
router.post('/', async (req, res) => {
  try {
    // Get the chat history from the request body
    const messages = req.body.messages;

    // Pass the messages array to the getAiMessage function
    const aiMessageContent = await getAiMessage(messages);
    const aiMessage = { role: 'assistant', content: aiMessageContent };

    // Send the new AI message to the client
    res.json({ aiMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

module.exports = router;
