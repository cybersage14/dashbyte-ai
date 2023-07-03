require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

let conversation = [];

//This route receives chat messages from the client, 
//sends them to the OpenAI API, and returns the AI's response to the client.
app.post('/api/chat', (req, res) => {
  conversation = [...conversation, ...req.body.messages];
  axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: conversation
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    }
  })
    .then(response => {
      conversation = [...conversation, response.data.choices[0].message];
      res.json({ messages: conversation });
    })
    .catch(error => {
      console.error('An error occurred while processing the chat:', error);
      res.status(500).json({ error: 'An error occurred while processing the chat.' });
    });
});

//This route clears the conversation history.
app.post('/api/clearChat', (req, res) => {
  conversation = [];
  res.sendStatus(200);
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
