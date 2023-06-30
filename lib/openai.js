const axios = require('axios');

async function getAiMessage(chatMessages, context, selectedParts) {
  const openai = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    }
  });

  let messages = chatMessages.map(message => ({ role: message.role, content: message.content }));

  // Add a default message if messages is empty
  if (messages.length === 0) {
    messages = [{ role: 'system', content: 'Start of the conversation.' }];
  }

  const response = await openai.post('/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: messages
  });

  return response.data.choices[0].message.content;
}

module.exports = getAiMessage;
