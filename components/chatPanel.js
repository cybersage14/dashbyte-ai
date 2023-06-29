export default function ChatPanel({ onSendMessage }) {
    const [input, setInput] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSendMessage(input);
      setInput('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        {/* TODO: Render the chat input and controls */}
      </form>
    );
  }
  