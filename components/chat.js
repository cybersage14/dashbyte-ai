import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessages, clearMessages } from '../redux/chatSlice';
import axios from 'axios';
import ChatInput from './chatInput';
import ChatList from './chatList';

// chat component
function Chat() {
  const dispatch = useDispatch(); // dispatch function to dispatch actions to the store
  const messages = useSelector((state) => state.chat.messages); // useSelector to extract data from the Redux store state
  const [input, setInput] = useState(''); // input state to store the user's input

  useEffect(() => {
    const savedChat = localStorage.getItem('chat'); // get the saved chat from local storage
    dispatch(clearMessages()); // clear the messages in the store

    // if there is a saved chat, add it to the store
    if (savedChat) { 
      dispatch(addMessages(JSON.parse(savedChat)));
    } 
    // if there is no saved chat, add the initial message to the store
    else { 
      const initialMessage = { 
        role: 'system', 
        content: "Hello! I am your helpful assistant, ready to help you pick PC parts and build your dream computer. Please type your questions or requirements below."
      };
      dispatch(addMessages([initialMessage]));      
    }
  }, []);

  // save the chat to local storage whenever the messages in the store change
  useEffect(() => {
    localStorage.setItem('chat', JSON.stringify(messages)); // save the chat to local storage
  }, [messages]);

  // send the user's message to the server and get the response
  const onSendMessage = () => {
    const newMessage = { role: 'user', content: input }; // create a new message object
    dispatch(addMessages([newMessage])); // add the new message to the store

    const messagesWithNew = [...messages, newMessage]; // create a new array of messages with the new message
  
    // send the messages to the server
    axios.post('/api/chat', { messages: messagesWithNew })
      // if the request is successful, add the AI's response to the store
      .then(response => {
        const aiMessageContent = response.data.messages[response.data.messages.length - 1].content;
        const aiMessage = { role: 'assistant', content: aiMessageContent };
        dispatch(addMessages([aiMessage]));  
      })
      // if the request is unsuccessful, log the error
      .catch(error => {
        console.error('An error occurred while sending the message:', error);
      });

    setInput(''); // clear the input
  };

  // clear the chat
  const onClearChat = () => {
    localStorage.removeItem('chat'); // remove the chat from local storage
    dispatch(clearMessages()); // clear the messages in the store
    
    // add the initial message to the store
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
