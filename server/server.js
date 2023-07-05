require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { connectToMongoDB } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

let conversation = [];

app.post('/api/chat', (req, res) => {
  console.log('Received request:', req.body);
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
      console.log('Response from OpenAI API:', response.data);
      conversation = [...conversation, response.data.choices[0].message];
      res.json({ messages: conversation });
    })
    .catch(error => {
      console.error('An error occurred while processing the chat:', error);
      res.status(500).json({ error: 'An error occurred while processing the chat.' });
    });
});

app.post('/api/clearChat', (req, res) => {
  conversation = [];
  res.sendStatus(200);
});

connectToMongoDB().then(() => {
  app.listen(5000, () => {
    console.log('Server listening on port 5000');
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});