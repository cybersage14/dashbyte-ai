const axios = require('axios');

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  }
});

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
async function getAiMessage(messages, apiKey) {
  try {
    const response = await axios.post(
      '/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages
      },
      {
        baseURL: 'https://api.openai.com/v1',
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    const aiMessage = response.data.choices[0].message.content;
    return aiMessage;
  } catch (error) {
    console.error('An error occurred while getting a message from the OpenAI API:', error);
    throw error;
  }
}

module.exports = { formatMessages, extractMessage, getAiMessage };
