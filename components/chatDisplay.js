import React from 'react';

function ChatDisplay({ messages }) {
    return (
        <div className="flex flex-col space-y-4 p-3">
            {messages.map((message, index) => (
                <div key={index} className={`flex items-start ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-lg px-4 py-2 ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
                        {message.content}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ChatDisplay;
