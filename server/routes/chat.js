const getAiMessage = require('../openai');

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
      let errorMessage = 'An error occurred while processing your request.';
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = 'Bad request.';
            break;
          case 401:
            errorMessage = 'Unauthorized.';
            break;
          // Add more cases as needed
        }
      }
      res.status(500).json({ message: errorMessage, error: error.message });
    }    
  });
};
