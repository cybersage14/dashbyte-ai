import React from 'react';
import Link from 'next/link';

// This component is the header component.
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
      </div>
    </nav>
  );
}

export default Header;
