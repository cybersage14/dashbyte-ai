import axios from 'axios';

export async function sendMessage(messages) {
  const response = await axios.post('/api/chat', { messages });
  return response.data.messages[response.data.messages.length - 1].content;
}
