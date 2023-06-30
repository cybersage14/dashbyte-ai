import React from 'react';

function ChatList({ messages }) {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div key={index} className={`max-w-xs mx-2 ${message.role === 'user' ? 'ml-auto bg-blue-500 text-white rounded-br-none' : 'mr-auto bg-white text-gray-800 rounded-bl-none'} rounded-md p-2`}>
          {message.content}
        </div>
      ))}
    </div>
  );
}

export default ChatList;

