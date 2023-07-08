const express = require('express');
const { getAiMessage } = require('../openai');
const { saveChat } = require('../db');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const messages = req.body.messages;
    const userMessage = messages[messages.length - 1];

    const aiMessageContent = await getAiMessage(userMessage.content);
    const aiMessage = { role: 'assistant', content: aiMessageContent };

    const chat = {
      _id: uuidv4(),
      messages: [...messages, aiMessage],
    };

    await saveChat(chat);
    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

module.exports = router;
