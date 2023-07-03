import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addMessages, clearMessages } from '../redux/chatSlice';
import ChatPanel from './chatPanel';

function Chat() {
  const chatState = useSelector(state => state.chat);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  useEffect(() => {
    const savedChat = localStorage.getItem('chat');
    dispatch(clearMessages());
    if (savedChat) {
      dispatch(addMessages(JSON.parse(savedChat)));
    } else {
      axios.post('http://localhost:5000/api/chat', { messages: [{ role: 'system', content: 'You are a helpful assistant.' }] })
        .then(response => {
          dispatch(addMessages(response.data.messages));
        })
        .catch(error => {
          console.error('An error occurred while fetching the initial messages:', error);
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chat', JSON.stringify(chatState.messages));
  }, [chatState.messages]);

  const onSendMessage = () => {
    const newMessage = { role: 'user', content: input };
    const messages = [...chatState.messages, newMessage];
    axios.post('http://localhost:5000/api/chat', { messages: messages })
      .then(response => {
        const newMessagesFromServer = response.data.messages.slice(chatState.messages.length);
        dispatch(addMessages(newMessagesFromServer));
      })
      .catch(error => {
        console.error('An error occurred while sending the message:', error);
      });
    setInput('');
  };  

  const onClearChat = () => {
    localStorage.setItem('chat', JSON.stringify([]));
    dispatch(clearMessages());
  };

  return (
    <div className="flex flex-col h-full">
      <ChatPanel onSendMessage={onSendMessage} onClearChat={onClearChat} input={input} setInput={setInput} messages={chatState.messages} />
    </div>
  );
}

export default Chat;
