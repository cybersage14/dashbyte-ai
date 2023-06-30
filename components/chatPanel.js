import { useState } from 'react';

function ChatPanel({ onSendMessage }) {
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className="flex items-center">
      <input type="text" value={input} onChange={handleInputChange} onKeyPress={handleKeyPress} className="flex-grow rounded-l px-2 py-1 text-black bg-white" />
      <button onClick={onSendMessage} className="bg-blue-500 text-white rounded-r px-4">Send</button>
    </div>
  );
}

export default ChatPanel;
