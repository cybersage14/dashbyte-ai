import React from 'react';
import Layout from '../components/layout';
import Chat from '../components/chat';

const Page = () => {
  return (
    <Layout>
      <div className="relative flex place-items-center">
        <Chat />
      </div>
    </Layout>
  );
};

export default Page;
