import React, { useEffect } from 'react';

function ChatList({ messages }) {
  // Log the messages prop when it changes
  useEffect(() => {
    console.log('Messages:', messages);
  }, [messages]);

  return (
    <div className="space-y-4 bg-gray-200 h-96 overflow-auto p-4">
      {messages.length > 0 ? messages.map((message, index) => (
        message.role !== 'system' && (
        <div key={index} className={`max-w-xs mx-2 ${message.role === 'user' ? 'ml-auto bg-user-blue text-white rounded-br-none' : 'mr-auto bg-ai-cyan text-white rounded-bl-none'} rounded-md p-2`}>
          {message.content}
        </div>
        )
      )) : (
        <div className="max-w-xs mx-2 bg-white text-gray-800 rounded-md p-2">
          Start a conversation by typing a message below...
        </div>
      )}
    </div>
  );
}

export default ChatList;
