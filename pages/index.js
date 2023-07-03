import React from 'react';
import Layout from '../components/layout';
import Chat from '../components/chat';

const Page = () => {
  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Chat />
        </div>
      </div>
    </Layout>
  );
};

export default Page;
