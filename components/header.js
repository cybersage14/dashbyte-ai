import React from 'react';
import Link from 'next/link';

function Header() {
  return (
    <nav className="bg-gradient-to-r from-green-400 to-blue-500 p-4 flex justify-between items-center">
      <Link href="/">
        <div className="bg-black p-1 rounded">
          <img src="/images/4k-LogoTransparent.png" alt="Logo" className="h-8" />
        </div>
      </Link>
      <ul className="flex space-x-4">
        <li><Link href="/pc-builder" className="text-white">PC Builder</Link></li>
        <li><Link href="/services" className="text-white">Services</Link></li>
        <li><Link href="/about" className="text-white">About</Link></li>
        <li><Link href="/contact" className="text-white">Contact</Link></li>
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
    </nav>
  );
}

export default Header;
