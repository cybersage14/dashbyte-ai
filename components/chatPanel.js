import { useRef } from 'react';

function ChatPanel({ onSendMessage, onClearChat, input, setInput, messages }) {
  const inputRef = useRef();

  const handleSendMessage = () => {
    onSendMessage();
    inputRef.current.focus();
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white shadow-lg rounded-lg p-4">
      <div className="flex flex-col h-full">
        <div className="overflow-auto p-4 flex-grow">
          {messages.map((message, index) => (
            <div key={index} className={`my-2 p-2 rounded-lg ${message.role === 'user' ? 'bg-user-blue ml-auto text-right text-white' : 'bg-ai-cyan mr-auto text-left text-white'}`}>
              <p className="text-sm">{message.content}</p>
            </div>
          ))}
        </div>
        <div className="border-t-2 border-gray-200 px-4 pt-2 mb-2 sm:mb-0">
          <div className="relative flex">
          <button
            type="button"
            onClick={onClearChat}
            className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-ai-cyan-solid hover:bg-ai-cyan-solid focus:outline-none mr-2"
          >
            Clear
          </button>
            <input
              type="text"
              placeholder="Write something..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
              ref={inputRef}
            />
            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              type="button"
              onClick={handleSendMessage}
              className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-user-blue-solid hover:bg-user-blue-solid focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>         
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPanel;
