import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessages, clearMessages } from '../redux/chatSlice';
import axios from 'axios';
import ChatPanel from './chatPanel';

// This component is the main chat component. 
// It is responsible for rendering the chat panel and handling the user's input.
function Chat() {
  const chatState = useSelector(state => state.chat);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  // When the component is first rendered, load the chat history from local storage.
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

  // When the chat history changes, save it to local storage.
  useEffect(() => {
    localStorage.setItem('chat', JSON.stringify(chatState.messages));
  }, [chatState.messages]);

  // When the user sends a message, send it to the server and add 
  // the AI's response to the chat history.
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

  // When the user clears the chat, clear the Redux store and local storage.
  const onClearChat = () => {
    localStorage.removeItem('chat');
    dispatch(clearMessages());
    const initialMessage = { 
      role: 'system', 
      content: "Hello! I am your helpful assistant, ready to help you pick PC parts and build your dream computer. Please type your questions or requirements below."
    };
    dispatch(addMessages([initialMessage]));    
  };    

  // Render the chat panel.
  return (
    <div className="flex flex-col h-full bg-gray-800 bg-opacity-50">
      <ChatPanel onSendMessage={onSendMessage} onClearChat={onClearChat} input={input} setInput={setInput} messages={chatState.messages} />
    </div>
  );
}

export default Chat;