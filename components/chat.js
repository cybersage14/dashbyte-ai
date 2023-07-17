import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessages, setMessages } from '../redux/chatSlice';
import { sendMessage } from './api/api';
import { saveChatHistory, loadChatHistory } from './localStorage';
import ChatPanel from './chatPanel';

function Chat() {
  const chatState = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  // Load the chat history when the component mounts
  useEffect(() => {
    const savedChat = loadChatHistory();
    if (savedChat) {
      dispatch(setMessages(savedChat));
    } else {
      const initialMessage = { 
        role: 'system', 
        content: "Hello! I am your helpful assistant, ready to help you pick PC parts and build your dream computer. Please type your questions or requirements below."
      };
      dispatch(addMessages([initialMessage]));
    }
  }, [dispatch]);

  // Save the chat history whenever the chat state changes
  useEffect(() => {
    saveChatHistory(chatState.messages);
  }, [chatState.messages]);

  const onSendMessage = () => {
    const newMessage = { role: 'user', content: input };
    dispatch(addMessages([newMessage]));

    const messages = [...chatState.messages, newMessage];

    sendMessage(messages)
      .then((aiMessageContent) => {
        const aiMessage = { role: 'assistant', content: aiMessageContent };
        dispatch(addMessages([aiMessage]));
      })
      .catch((error) => {
        console.error('An error occurred while sending the message:', error);
      });

    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 bg-opacity-50">
      <ChatPanel onSendMessage={onSendMessage} input={input} setInput={setInput} messages={chatState.messages} />
    </div>
  );
}

export default Chat;
