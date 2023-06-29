const express = require('express');
const { OpenAIAPI } = require('openai');

const app = express();
app.use(express.json());

const openai = new OpenAIAPI(process.env.OPENAI_API_KEY);

app.post('/api/chat', async (req, res) => {
    const messages = req.body.messages;
    try {
        const response = await openai.ChatCompletion.create({
            model: 'gpt-3.5-turbo',
            messages: messages
        });
        res.json({ message: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

app.listen(3000, () => console.log('Server listening on port 3000'));
