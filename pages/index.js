import React from 'react';
import Header from '../components/header';
import Chat from '../components/chat';

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <Chat />
      </div>
    </div>
  );
};

export default Page;
