const path = require('path');
require('dotenv').config({ path: __dirname + '/../../.env.local' });

console.log(process.env.OPENAI_API_KEY);

const axios = require('axios');

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  }
});
console.log('Authorization:', openai.defaults.headers['Authorization']);

//This function formats chat messages for interaction with the OpenAI API.
function formatMessages(chatMessages) {
  let messages = chatMessages.map(message => ({ role: message.role, content: message.content }));

  // Add a default message if messages is empty
  if (messages.length === 0) {
    messages = [{ role: 'system', content: 'Start of the conversation.' }];
  }

  return messages;
}

//This function extracts the AI's message from the OpenAI API response.
function extractMessage(response) {
  return response.data.choices[0].message.content;
}

//This function sends a POST request to the OpenAI API to get a response from the AI model.
async function getAiMessage(messages) {
  try {
    const response = await openai.post(
      '/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages
      }
    );

    // Return the entire response object
    return response;
  } catch (error) {
    console.error('An error occurred while getting a message from the OpenAI API:', error);
    throw error;
  }
}

module.exports = { formatMessages, extractMessage, getAiMessage };
