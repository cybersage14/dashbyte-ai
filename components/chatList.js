import { useSelector } from 'react-redux';

function ChatList() {
  const messages = useSelector(state => state.chat.messages);

  return (
    <div className="overflow-y-auto h-64 mb-4">
      {messages.map((message, index) => (
        <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
          <span className={`inline-block rounded px-2 py-1 ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
            {message.content}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
