import React from 'react';
import Header from '../components/header';
import Chat from '../components/chat';

// This component is the main page component.
const Page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black bg-logo">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <Chat />
      </div>
    </div>
  );
};

export default Page;
