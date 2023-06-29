import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 text-center">
      <p className="mb-4">
        &copy; {new Date().getFullYear()} Dashbyte AI. All rights reserved.
      </p>
      <div className="flex justify-center space-x-4">
        <a href="https://www.facebook.com/dashbyte/" target="_blank" rel="noreferrer">
          <img src="/assets/facebook.svg" alt="Facebook" className="h-6 w-6" />
        </a>
        <a href="https://twitter.com/dash_byte" target="_blank" rel="noreferrer">
          <img src="/assets/twitter.svg" alt="Twitter" className="h-6 w-6" />
        </a>
        <a href="https://www.instagram.com/dashbyte/" target="_blank" rel="noreferrer">
          <img src="/assets/instagram.svg" alt="Instagram" className="h-6 w-6" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
