import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ChatList from './chatList';
import ChatPanel from './chatPanel';
import { addMessages } from '../redux/chatSlice'; // Import the addMessages action

function Chat() {
  const chatState = useSelector(state => state.chat);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  useEffect(() => {
    // Load chat history from local storage
    const savedChat = localStorage.getItem('chat');
    if (savedChat) {
      dispatch(addMessages(JSON.parse(savedChat)));
    } else {
      axios.post('http://localhost:5000/api/chat', { messages: [{ role: 'system', content: 'You are a helpful assistant.' }] })
        .then(response => {
          console.log('Initial messages:', response.data.messages);
          dispatch(addMessages(response.data.messages)); // Dispatch the addMessages action with the correct type and payload
          console.log('Current chat state:', chatState.messages);
        })
        .catch(error => {
          console.error('An error occurred while fetching the initial messages:', error);
        });
    }
  }, []);

  useEffect(() => {
    // Save chat history to local storage whenever it changes
    localStorage.setItem('chat', JSON.stringify(chatState.messages));
  }, [chatState.messages]);

  const onSendMessage = () => {
    const newMessage = { role: 'user', content: input };
    console.log('Sending message:', newMessage);
    axios.post('http://localhost:5000/api/chat', { messages: [newMessage] })
      .then(response => {
        console.log('Received response:', response.data);
        const messages = [...chatState.messages, ...response.data.messages];
        dispatch(addMessages(messages)); // Dispatch the addMessages action with the updated messages array
      })
      .catch(error => {
        console.error('An error occurred while sending the message:', error);
      });
    setInput('');
  };

  const onClearChat = () => {
    localStorage.setItem('chat', JSON.stringify([]));
    dispatch(addMessages([]));
  };

  return (
    <div className="flex flex-col h-full">
      <ChatList messages={chatState.messages} />
      <ChatPanel onSendMessage={onSendMessage} onClearChat={onClearChat} input={input} setInput={setInput} />
    </div>
  );
}

export default Chat;
