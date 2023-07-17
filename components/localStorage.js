export function saveChatHistory(messages) {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }
  
  export function loadChatHistory() {
    const chatHistory = localStorage.getItem('chatHistory');
    return chatHistory ? JSON.parse(chatHistory) : [];
  }
  