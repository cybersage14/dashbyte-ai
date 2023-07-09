import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessages, clearMessages } from '../redux/chatSlice';
import axios from 'axios';
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
      const systemMessage = { 
        role: 'system', 
        content: "You are a versatile assistant, capable of providing information and guidance on a wide range of topics. Your primary expertise lies in computer-related topics, including software development, PC building, IT services, and website design. You can provide intelligent and interactive responses to user inputs, maintaining a consistent chat context across all pages. You are designed to be intuitive, engaging, and user-friendly, aiming to enhance the user experience on the Dashbyte platform."
      };
      const userFriendlyMessage = { 
        role: 'assistant', 
        content: "Hello! I am your helpful assistant, ready to help you pick PC parts and build your dream computer. Please type your questions or requirements below."
      };
      dispatch(addMessages([systemMessage, userFriendlyMessage]));            
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chat', JSON.stringify(chatState.messages));
  }, [chatState.messages]);

  const onSendMessage = () => {
    const newMessage = { role: 'user', content: input };
    dispatch(addMessages([newMessage]));  // Add the user's message to the Redux store
  
    const messages = [...chatState.messages, newMessage];
  
    axios.post('/api/chat', { messages })
      .then(response => {
        const aiMessageContent = response.data.messages[response.data.messages.length - 1].content;
        const aiMessage = { role: 'assistant', content: aiMessageContent };
        dispatch(addMessages([aiMessage]));  // Add the AI's message to the Redux store
      })
      .catch(error => {
        console.error('An error occurred while sending the message:', error);
      });
  
    setInput('');
  };

  const onClearChat = () => {
    localStorage.removeItem('chat');
    dispatch(clearMessages());
    const systemMessage = { 
      role: 'system', 
      content: "You are a versatile assistant, capable of providing information and guidance on a wide range of topics. Your primary expertise lies in computer-related topics, including software development, PC building, IT services, and website design. You can provide intelligent and interactive responses to user inputs, maintaining a consistent chat context across all pages. You are designed to be intuitive, engaging, and user-friendly, aiming to enhance the user experience on the Dashbyte platform."
    };
    const userFriendlyMessage = { 
      role: 'assistant', 
      content: "Hello! I am your helpful assistant, ready to help you pick PC parts and build your dream computer. Please type your questions or requirements below."
    };
    dispatch(addMessages([systemMessage, userFriendlyMessage])); 
  };  

  return (
    <div className="flex flex-col h-full bg-gray-800 bg-opacity-50">
      <ChatPanel onSendMessage={onSendMessage} onClearChat={onClearChat} input={input} setInput={setInput} messages={chatState.messages} />
    </div>
  );
}

export default Chat;
