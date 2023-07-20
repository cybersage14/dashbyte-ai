import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessages, clearMessages } from '../redux/chatSlice';
import axios from 'axios';
import ChatInput from './chatInput';
import ChatList from './chatList';

function MiniChat() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);  // New state variable for tracking minimized/maximized state

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

  const handleToggleMinimize = () => {
    setIsMinimized(!isMinimized);  // Toggle the isMinimized state when the button is clicked
  };

  return (
    <>
      {isMinimized && (
        <button className="fixed bottom-4 right-4 bg-user-blue text-white p-2 rounded scale-150" onClick={handleToggleMinimize}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h6l4 4 4-4h2a1 1 0 001-1z" />
          </svg>
        </button>
      )}
  
      {!isMinimized && (
        <div className="fixed bottom-4 right-4 w-96 h-96 bg-gray-800 bg-opacity-50 shadow-lg rounded-lg p-4 flex flex-col">
          <button className="self-start mb-2 p-1 rounded bg-red-500 text-white scale-75" onClick={handleToggleMinimize}>
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
              <path fillRule="evenodd" d="M5 9a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <ChatList messages={messages} />
          <ChatInput input={input} setInput={setInput} onSendMessage={onSendMessage} onClearChat={onClearChat} />
        </div>
      )}
    </>
  );  
}

export default MiniChat;

