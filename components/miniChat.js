import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessages, setMessages } from '../redux/chatSlice';
import { sendMessage } from './api/api';
import { saveChatHistory, loadChatHistory } from './localStorage';

const MiniChat = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const chatState = useSelector(state => state.chat);

  useEffect(() => {
    const savedChat = loadChatHistory();
    if (savedChat) {
      dispatch(setMessages(savedChat));
    }
  }, [dispatch]);  

  useEffect(() => {
    saveChatHistory(chatState.messages);
  }, [chatState.messages]);  

  const onSendMessage = async () => {
    const newMessage = { role: 'user', content: input };
    dispatch(addMessages([newMessage]));
    const aiMessageContent = await sendMessage([...chatState.messages, newMessage]);
    const aiMessage = { role: 'assistant', content: aiMessageContent };
    dispatch(addMessages([aiMessage]));
    setInput('');
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 z-50">
      {isOpen && (
        <div className="p-4 bg-white rounded-lg shadow-lg w-80 h-96 flex flex-col">
          <div className="flex justify-end">
            <button onClick={() => setIsOpen(!isOpen)}>
              X
            </button>
          </div>
          <div className="flex-grow overflow-auto">
            {chatState.messages.map((message, index) => (
              <div key={index} className={`my-2 p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-300 ml-auto' : 'bg-gray-300 mr-auto'}`}>
                <p>{message.content}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type your message..." className="w-full rounded-lg p-2" />
            <button onClick={onSendMessage} className="w-full rounded-lg p-2 mt-2 bg-blue-500 text-white">
              Send
            </button>
          </div>
        </div>
      )}
      {!isOpen && (
        <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-blue-500 rounded-full text-white text-2xl flex items-center justify-center">
          ?
        </button>
      )}
    </div>
  );
};

export default MiniChat;
