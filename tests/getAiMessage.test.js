import { getAiMessage } from '../server/openai';
const axios = require('axios');

jest.mock('axios');

test('getAiMessage correctly gets a message from the AI', async () => {
  const testMessages = [{ role: 'user', content: 'Hello' }];
  const testResponse = { data: { choices: [{ message: { content: 'Hello, user!' } }] } };

  axios.post.mockResolvedValue(testResponse);

  const aiMessage = await getAiMessage(testMessages, 'dummy-api-key');

  expect(axios.post).toHaveBeenCalledWith('/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: testMessages
  }, {
    headers: {
      'Authorization': 'Bearer dummy-api-key'
    },
    baseURL: 'https://api.openai.com/v1'
  });
  expect(aiMessage).toEqual('Hello, user!');
});
