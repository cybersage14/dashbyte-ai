import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessages, clearMessages } from '../redux/chatSlice';
import axios from 'axios';
import ChatPanel from './chatPanel';
import { getAiMessage } from '../server/openai'; 

//This is a React component that handles the chat interface. 
//It uses the Redux state for managing chat messages and interacts with the OpenAI API
function Chat() {
  const chatState = useSelector(state => state.chat);  // Get the chat state from the Redux store
  const dispatch = useDispatch();  // Get the dispatch function from the Redux store
  const [input, setInput] = useState('');  // Store the user's input in the component's state
  const [chatId, setChatId] = useState(null);  // Store the chatId in the component's state

  // This function loads the chat history from the server when the component is first rendered
  useEffect(() => {
    const savedChat = localStorage.getItem('chat');
    dispatch(clearMessages());
    if (savedChat) {
      dispatch(addMessages(JSON.parse(savedChat)));
    } else {
      getAiMessage([{ role: 'system', content: 'You are a helpful assistant, who specializes in helping user pick PC parts and build computers.' }])
        .then(response => {
          setChatId(response.data._id);  // Update the chatId when you receive a response from the server
          dispatch(addMessages(response.data.messages));
        })
        .catch(error => {
          console.error('An error occurred while fetching the initial messages:', error);
        });
    }
  }, []);

  // This function saves the chat history to the browser's local storage when the chat history changes
  useEffect(() => {
    localStorage.setItem('chat', JSON.stringify(chatState.messages));
  }, [chatState.messages]);

  // This function sends a message to the OpenAI API and adds the response to the Redux store
  const onSendMessage = () => {
    const newMessage = { role: 'user', content: input };
    dispatch(addMessages([newMessage])); // Dispatch the new message to the Redux store
    const messages = [...chatState.messages, newMessage];

    // Make a POST request to your own server
    axios.post('/api/chat', { messages })
      .then(response => {
        const newMessagesFromServer = response.data.messages.map(message => ({ role: message.role, content: message.content }));
        dispatch(addMessages(newMessagesFromServer));
      })
      .catch(error => {
        console.error('An error occurred while sending the message:', error);
      });
    setInput('');
  };

  // This function clears the chat history from the browser's local storage and Redux store
  const onClearChat = () => {
    localStorage.setItem('chat', JSON.stringify([{ role: 'system', content: 'Start of the conversation.' }]));
    dispatch(clearMessages());
    dispatch(addMessages([{ role: 'system', content: 'Start the conversation by typing a message below...' }]));
  };

  // This function handles the user pressing the Enter key
  return (
    <div className="flex flex-col h-full bg-gray-800 bg-opacity-50">
      <ChatPanel onSendMessage={onSendMessage} onClearChat={onClearChat} input={input} setInput={setInput} messages={chatState.messages} />
    </div>
  );
}

export default Chat;
