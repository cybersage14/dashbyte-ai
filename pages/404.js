import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout';

const Custom404 = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-xl text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
        <Link href="/">
          <a className="mt-8 text-lg text-blue-500">Go back home</a>
        </Link>
      </div>
    </Layout>
  );
};

export default Custom404;
