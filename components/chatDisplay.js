function ChatDisplay({ messages }) {
    return (
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message.role}: {message.content}</p>
        ))}
      </div>
    );
  }
  
  export default ChatDisplay;
  