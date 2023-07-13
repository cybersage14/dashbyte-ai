import React from 'react';
import { useSelector } from 'react-redux';

const MiniChat = () => {
  const messages = useSelector((state) => state.chat.messages);

  return (
    <div className="fixed bottom-0 right-0 m-4 p-4 bg-white rounded-lg shadow-lg max-w-xs overflow-auto">
      {messages.map((message, index) => (
        <p key={index} className="my-2">
          <strong>{message.role}: </strong>
          {message.content}
        </p>
      ))}
    </div>
  );
};

export default MiniChat;
