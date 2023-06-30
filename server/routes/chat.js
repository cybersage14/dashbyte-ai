const getAiMessage = require('../../lib/openai');

module.exports = (app) => {
  app.post('/chat', async (req, res) => {
    const chatMessages = req.body.messages;
    const context = req.body.context;
    const selectedParts = req.body.selectedParts;

    console.log('Request body:', req.body); // Add logging

    try {
      const aiMessage = await getAiMessage(chatMessages, context, selectedParts);
      console.log('AI message:', aiMessage); // Add logging
      res.json({ message: aiMessage });
    } catch (error) {
      console.error('An error occurred while creating chat with OpenAI API:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      res.status(500).json({ message: 'An error occurred while processing your request.', error: error.message });
    }
  });
};
