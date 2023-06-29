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
    axios.post('/api/chat', { messages: [] })
      .then(response => {
        dispatch({ type: 'ADD_MESSAGES', messages: response.data.messages });
      })
      .catch(error => {
        console.error('An error occurred while fetching the initial messages:', error);
      });
  }, [dispatch]);

  const handleSendMessage = () => {
    axios.post('/api/chat', { messages: [...chatState.messages, { role: 'user', content: input }] })
      .then(response => {
        dispatch({ type: 'ADD_MESSAGES', messages: [{ role: 'user', content: input }, { role: 'ai', content: response.data.message }] });
        setInput('');
      })
      .catch(error => {
        console.error('An error occurred while sending the message:', error);
      });
  };

  return (
    <div className="bg-white rounded shadow p-4 max-w-md mx-auto">
      <ChatList messages={chatState.messages} />
      <ChatPanel input={input} setInput={setInput} onSendMessage={handleSendMessage} />
    </div>
  );
}

export default Chat;
