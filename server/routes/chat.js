const express = require('express');
const { getAiMessage } = require('../openai');
const { saveChat } = require('../db');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const messages = req.body.messages;
    const userMessage = messages[messages.length - 1];

    const aiMessageContent = await getAiMessage({role: 'system', content: 'start'}, {role: 'user', content: userMessage.content});
    const aiMessage = { role: 'assistant', content: aiMessageContent };

    const chatId = req.body.chatId; // Get the chatId from the request body

    let chat;
    if (chatId) {
      // If a chatId is provided, update the existing chat document
      chat = await updateChat(chatId, [...messages, aiMessage]);
    } else {
      // If no chatId is provided, create a new chat document
      chat = {
        _id: uuidv4(),
        messages: [...messages, aiMessage],
      };
      await saveChat(chat);
    }

    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

module.exports = router;
