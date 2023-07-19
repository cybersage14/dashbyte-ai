import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessages, clearMessages } from '../redux/chatSlice';
import axios from 'axios';
import ChatInput from './chatInput';
import ChatList from './chatList';

function Chat() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [input, setInput] = useState('');

  useEffect(() => {
    const savedChat = localStorage.getItem('chat');
    dispatch(clearMessages());
    if (savedChat) {
      dispatch(addMessages(JSON.parse(savedChat)));
    } else {
      const initialMessage = { 
        role: 'system', 
        content: "Hello! I am your helpful assistant, ready to help you pick PC parts and build your dream computer. Please type your questions or requirements below."
      };
      dispatch(addMessages([initialMessage]));      
    }
  }, []);  

  useEffect(() => {
    localStorage.setItem('chat', JSON.stringify(messages));
  }, [messages]);

  const onSendMessage = () => {
    const newMessage = { role: 'user', content: input };
    dispatch(addMessages([newMessage]));  

    const messagesWithNew = [...messages, newMessage];
  
    axios.post('/api/chat', { messages: messagesWithNew })
      .then(response => {
        const aiMessageContent = response.data.messages[response.data.messages.length - 1].content;
        const aiMessage = { role: 'assistant', content: aiMessageContent };
        dispatch(addMessages([aiMessage]));  
      })
      .catch(error => {
        console.error('An error occurred while sending the message:', error);
      });

    setInput('');
  };

  const onClearChat = () => {
    localStorage.removeItem('chat');
    dispatch(clearMessages());
    const initialMessage = { 
      role: 'system', 
      content: "Hello! I am your helpful assistant, ready to help you pick PC parts and build your dream computer. Please type your questions or requirements below."
    };
    dispatch(addMessages([initialMessage]));    
  };    

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 bg-gray-800 bg-opacity-50 shadow-lg rounded-lg p-4">
      <div className="flex flex-col h-full">
        <ChatList messages={messages} />
        <ChatInput input={input} setInput={setInput} onSendMessage={onSendMessage} onClearChat={onClearChat} />
      </div>
    </div>
  );
}

export default Chat;
