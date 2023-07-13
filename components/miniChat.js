import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessages, clearMessages } from '../redux/chatSlice';

const MiniChat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [isOpen, setIsOpen] = useState(true);

  const sendMessage = (message) => {
    fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: [...messages, { role: 'user', content: message }] }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(addMessages(data.messages));
      });
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 z-50">
      {isOpen && (
        <div className="p-4 bg-white rounded-lg shadow-lg w-80 h-96 flex flex-col">
          <div className="flex justify-end">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="overflow-auto flex-grow flex flex-col space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`p-2 rounded-lg ${message.role === 'user' ? 'bg-user-blue text-white' : 'bg-ai-cyan text-white'}`}
              >
                <strong>{message.role === 'user' ? 'You' : 'AI'}: </strong>
                {message.content}
              </div>
            ))}
          </div>
          <form 
            onSubmit={(event) => {
              event.preventDefault();
              const message = event.target.elements.message.value;
              sendMessage(message);
              event.target.reset();
            }}
            className="mt-4"
          >
            <input className="w-full p-2 border border-user-blue-solid rounded-lg" type="text" name="message" />
            <button className="w-full mt-2 px-4 py-2 bg-user-blue-solid text-white rounded-full" type="submit">Send</button>
          </form>
        </div>
      )}
      {!isOpen && (
        <button className="px-4 py-2 bg-user-blue-solid text-white rounded-full" onClick={() => setIsOpen(!isOpen)}>
          Open Chat
        </button>
      )}
    </div>
  );
};

export default MiniChat;
