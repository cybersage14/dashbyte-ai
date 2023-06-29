import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ChatList from './chatList';
import ChatPanel from './chatPanel';

function Chat() {
  const dispatch = useDispatch();
  const chatState = useSelector(state => state.chat);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Fetch initial messages from the server when the component mounts
    axios.post('/api/chat', { messages: [] })
      .then(response => {
        // Dispatch an action to add the initial messages to the chat state
        dispatch({ type: 'ADD_MESSAGES', messages: response.data.messages });
      })
      .catch(error => {
        console.error('An error occurred while fetching the initial messages:', error);
      });
  }, [dispatch]);

  const handleSendMessage = () => {
    // Send the user's message to the server and get the AI's response
    axios.post('/api/chat', { messages: [...chatState.messages, { role: 'user', content: input }] })
      .then(response => {
        // Dispatch an action to add the user's message and the AI's response to the chat state
        dispatch({ type: 'ADD_MESSAGES', messages: [{ role: 'user', content: input }, { role: 'ai', content: response.data.message }] });
        setInput('');
      })
      .catch(error => {
        console.error('An error occurred while sending the message:', error);
      });
  };

  return (
    <div>
      <ChatList messages={chatState.messages} />
      <ChatPanel input={input} setInput={setInput} onSendMessage={handleSendMessage} />
    </div>
  );
}

export default Chat;
