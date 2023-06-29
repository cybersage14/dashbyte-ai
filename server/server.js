const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Create an axios instance for OpenAI
const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  }
});

app.post('/api/chat', async (req, res) => {
  const messages = req.body.messages;

  try {
    // Send a chat completion request to the OpenAI API
    const response = await openai.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: messages
    });

    res.json({ message: response.data.choices[0].message.content });
  } catch (error) {
    console.error('An error occurred while processing the chat:', error);
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(5000, () => console.log('Server listening on port 5000'));
