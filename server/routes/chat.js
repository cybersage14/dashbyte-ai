const getAiMessage = require('../openai');

module.exports = (app) => {
  app.post('/chat', async (req, res) => {
    const chatMessages = req.body.messages;
    const context = req.body.context;
    const selectedParts = req.body.selectedParts;

    try 
    {
      const aiMessage = await getAiMessage(chatMessages, context, selectedParts);
      res.json({ message:aiMessage });
    } 
    catch (error) 
    {
      console.error('An error occurred while creating chat with OpenAI API:', error);
      res.status(500).json({ message: 'An error occurred while processing your request.', error: error.message });
    }
  });
};
