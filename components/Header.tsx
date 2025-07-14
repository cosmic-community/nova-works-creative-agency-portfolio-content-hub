'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Nova Works
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/projects" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Projects
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Blog
            </Link>
            <Link href="/team" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Team
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Home
              </Link>
              <Link href="/projects" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Projects
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Blog
              </Link>
              <Link href="/team" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Team
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}