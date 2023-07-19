import React, { useEffect, useRef } from 'react';

const ChatList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="overflow-auto p-4 flex-grow">
      {messages.map((message, index) => (
        <div key={index} className={`my-2 p-2 rounded-lg ${message.role === 'user' ? 'bg-user-blue ml-auto text-right text-white' : 'bg-middle-gradient mr-auto text-left text-white'}`}>
          <p className="text-sm">{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
