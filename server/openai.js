const axios = require('axios');
const { OPENAI_API_KEY } = require('../config');

// This variable will be initialized in the initializeOpenAI function below.
let openai;

// This function initializes the OpenAI API client.
const initializeOpenAI = () => {
  openai = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    }
  });
};

// Call the function here to initialize 'openai'
initializeOpenAI();

// This function formats chat messages for interaction with the OpenAI API.
function formatMessages(chatMessages) {
  let messages = [{ role: 'system', content: 'You are a helpful assistant, who specializes in helping user pick PC parts and build computers.' }];
  
  messages = messages.concat(chatMessages.map(message => ({ role: message.role, content: message.content })));

  return messages;
}

// This function extracts the AI's message from the OpenAI API response.
function extractMessage(response) {
  return response.data.choices[0].message.content;
}

// This function sends a POST request to the OpenAI API to get a response from the AI model.
// It takes an array of messages as input, where each message is an object with a 'role' and 'content' property.
// It returns a promise that resolves to the response from the OpenAI API.
async function getAiMessage(messages) {
  try {
    const response = await openai.post(
      '/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages
      }
    );

    // Extract the content of the AI's message from the response
    const aiMessageContent = response.data.choices[0].message.content;

    // Return the content of the AI's message
    return aiMessageContent;
  } catch (error) {
    console.error('An error occurred while getting a message from the OpenAI API:', error);
    throw error;
  }
}

// Export the functions
module.exports = { initializeOpenAI, formatMessages, extractMessage, getAiMessage };
