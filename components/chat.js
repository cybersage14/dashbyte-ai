import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessages, clearMessages } from '../redux/chatSlice';
import { getAiMessage, clearChat } from '../lib/openai';
import ChatPanel from './chatPanel';
console.log('OPENAI_API_KEY in chat.js:', process.env.OPENAI_API_KEY);

//This is a React component that handles the chat interface. 
//It uses the Redux state for managing chat messages and interacts with the OpenAI API
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
      getAiMessage([{ role: 'system', content: 'You are a helpful assistant, who specializes in helping user pick PC parts and build computers.' }])
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
    dispatch(addMessages([newMessage])); // Dispatch the new message to the Redux store
    const messages = [...chatState.messages, newMessage];
    getAiMessage(messages)
      .then(response => {
        const newMessagesFromServer = response.data.choices.map(choice => choice.message);
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
