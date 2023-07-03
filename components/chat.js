import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addMessages } from '../redux/chatSlice';
import ChatInput from './chatInput';
import ChatDisplay from './chatDisplay';

function Chat() {
  const chatState = useSelector(state => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedChat = localStorage.getItem('chat');
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

  const onSendMessage = (input) => {
    const newMessage = { role: 'user', content: input };
    const messages = [...chatState.messages, newMessage];
    axios.post('http://localhost:5000/api/chat', { messages: messages })
      .then(response => {
        const updatedMessages = [...chatState.messages, ...response.data.messages];
        dispatch(addMessages(updatedMessages));
      })
      .catch(error => {
        console.error('An error occurred while sending the message:', error);
      });
  };

  const onClearChat = () => {
    localStorage.setItem('chat', JSON.stringify([]));
    dispatch(addMessages([]));
  };

  return (
    <div className="flex flex-col h-full">
      <ChatDisplay messages={chatState.messages} />
      <ChatInput onSendMessage={onSendMessage} onClearChat={onClearChat} />
    </div>
  );
}

export default Chat;
