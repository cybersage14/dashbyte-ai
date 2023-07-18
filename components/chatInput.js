import { useState } from 'react';

// This component is the chat input component.
function ChatInput({ onSendMessage, onClearChat }) {
  const [input, setInput] = useState('');

  // When the user sends a message, send it to the server and add
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