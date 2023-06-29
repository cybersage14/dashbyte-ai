import { useSelector } from 'react-redux';

function ChatList() {
  const messages = useSelector(state => state.chat.messages);

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <strong>{message.role === 'user' ? 'You' : 'AI'}:</strong> {message.content}
        </div>
      ))}
    </div>
  );
}

export default ChatList;
