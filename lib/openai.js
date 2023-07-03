const axios = require('axios');

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  }
});

function formatMessages(chatMessages) {
  let messages = chatMessages.map(message => ({ role: message.role, content: message.content }));

  // Add a default message if messages is empty
  if (messages.length === 0) {
    messages = [{ role: 'system', content: 'Start of the conversation.' }];
  }

  return messages;
}

async function postMessage(messages) {
  const response = await openai.post('/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: messages
  });

  return response;
}

function extractMessage(response) {
  return response.data.choices[0].message.content;
}

async function getAiMessage(chatMessages, context, selectedParts) {
  const messages = formatMessages(chatMessages);
  const response = await postMessage(messages);
  const aiMessage = extractMessage(response);

  return aiMessage;
}

module.exports = getAiMessage;
