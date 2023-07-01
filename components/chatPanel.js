import { useRef } from 'react';

function ChatPanel({ onSendMessage, onClearChat, input, setInput }) {
  const inputRef = useRef();

  const handleSendMessage = () => {
    onSendMessage();
    inputRef.current.focus();
  };

  return (
    <div className="border-t-2 border-gray-200 px-4 pt-2 mb-2 sm:mb-0">
      <div className="relative flex">
        <button
          type="button"
          onClick={onClearChat}
          className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-red-500 hover:bg-red-400 focus:outline-none mr-2"
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
            className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
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
  );
}

export default ChatPanel;
