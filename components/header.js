import React from 'react';
import Link from 'next/link';

function Header() {
  return (
    <nav className="bg-transparent p-4 flex justify-between items-center">
      <Link href="/">
        <div className="bg-black p-1 rounded">
          <img src="/images/4k_Logo_Only_FAVICON.png" alt="Logo" className="h-8" />
        </div>
      </Link>
      <div className="flex space-x-4">
        <ul className="flex space-x-4">
          <li>
            <Link href="/pcBuilder">
              <img src="/images/pcBuilderIcon.svg" alt="PC Builder" className="h-6 filter invert" />
            </Link>
          </li>
          <li>
            <Link href="/about">
              <img src="/images/questionMarkIcon.svg" alt="About" className="h-6 filter invert" />
            </Link>
          </li>
          <li>
            <Link href="/account">
              <img src="/images/accountIcon.svg" alt="Account" className="h-6 filter invert" />
            </Link>
          </li>
        </ul>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com/dashbyte/" target="_blank" rel="noreferrer">
            <img src="/images/facebook.svg" alt="Facebook" className="h-6" />
          </a>
          <a href="https://twitter.com/dash_byte" target="_blank" rel="noreferrer">
            <img src="/images/twitter.svg" alt="Twitter" className="h-6" />
          </a>
          <a href="https://www.instagram.com/dashbyte/" target="_blank" rel="noreferrer">
            <img src="/images/instagram.svg" alt="Instagram" className="h-6" />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Header;
