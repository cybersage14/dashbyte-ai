import React from 'react';
import Header from '../components/header';
import Chat from '../components/chat';

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Chat />
      </div>
    </div>
  );
};

export default Page;
