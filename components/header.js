import React from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

function Header() {
  return (
    <nav className="bg-blue-500 p-4">
      <Link href="/">
        <a>
          <img src="/logo.png" alt="Logo" className="h-8" />
        </a>
      </Link>
      <ul className="flex space-x-4">
        <li><Link href="/"><a className="text-white">Home</a></Link></li>
        <li><Link href="/pc-builder"><a className="text-white">PC Builder</a></Link></li>
        <li><Link href="/services"><a className="text-white">Services</a></Link></li>
        <li><Link href="/about"><a className="text-white">About</a></Link></li>
        <li><Link href="/contact"><a className="text-white">Contact</a></Link></li>
      </ul>
      <div className="flex space-x-4">
        <a href="https://www.facebook.com/dashbyte/" target="_blank" rel="noreferrer">
          <img src="/facebook.svg" alt="Facebook" className="h-6" />
        </a>
        <a href="https://twitter.com/dash_byte" target="_blank" rel="noreferrer">
          <img src="/twitter.svg" alt="Twitter" className="h-6" />
        </a>
        <a href="https://www.instagram.com/dashbyte/" target="_blank" rel="noreferrer">
          <img src="/instagram.svg" alt="Instagram" className="h-6" />
        </a>
      </div>
    </nav>
  );
}

export default Header;
