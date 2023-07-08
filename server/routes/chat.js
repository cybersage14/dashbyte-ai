const express = require('express');
const { getAiMessage } = require('../openai');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const messages = req.body.messages;

    // Pass the messages array to the getAiMessage function
    const aiMessageContent = await getAiMessage(messages);
    const aiMessage = { role: 'assistant', content: aiMessageContent };

    const chat = {
      messages: [...messages, aiMessage],
    };

    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

module.exports = router;
