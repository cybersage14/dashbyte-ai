import { useState } from 'react';

function ChatInput({ onSendMessage, onClearChat }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    onSendMessage(input);
    setInput('');
  };

  return (
    <div>
      <input type="text" value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
      <button onClick={onClearChat}>Clear</button>
    </div>
  );
}

export default ChatInput;
