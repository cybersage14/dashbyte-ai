import React from 'react';
import Layout from '../components/layout';
import Chat from '../components/chat';

const Page = () => {
  return (
    <Layout>
      <div className="w-full h-screen pt-100 mt-60">
        <Chat />
      </div>
    </Layout>
  );
};

export default Page;
