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
    <div>
      <input type="text" value={input} onChange={handleInputChange} onKeyPress={handleKeyPress} />
      <button onClick={onSendMessage}>Send</button>
    </div>
  );
}

export default ChatPanel;
