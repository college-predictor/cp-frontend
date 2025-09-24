'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, User } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <span className="font-bold text-xl">EP</span>
            </div>
            <span className="text-xl font-bold text-gray-800">EduPortal</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search colleges, exams, courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Auth & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <User className="h-5 w-5" />
              <span>Login</span>
            </Link>
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block border-t md:border-t-0 pt-4 md:pt-0 pb-4`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0">
            <li>
              <Link href="/colleges" className="block py-2 px-4 md:px-0 text-gray-700 hover:text-blue-600 font-medium">
                Colleges
              </Link>
            </li>
            <li>
              <Link href="/exams" className="block py-2 px-4 md:px-0 text-gray-700 hover:text-blue-600 font-medium">
                Exams
              </Link>
            </li>
            <li>
              <Link href="/courses" className="block py-2 px-4 md:px-0 text-gray-700 hover:text-blue-600 font-medium">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="block py-2 px-4 md:px-0 text-gray-700 hover:text-blue-600 font-medium">
                Reviews
              </Link>
            </li>
            <li>
              <Link href="/forums" className="block py-2 px-4 md:px-0 text-gray-700 hover:text-blue-600 font-medium">
                Forums
              </Link>
            </li>
            <li>
              <Link href="/news" className="block py-2 px-4 md:px-0 text-gray-700 hover:text-blue-600 font-medium">
                News
              </Link>
            </li>
            <li>
              <Link href="/predictor" className="block py-2 px-4 md:px-0 text-blue-600 hover:text-blue-800 font-semibold">
                College Predictor
              </Link>
            </li>
          </ul>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search colleges, exams, courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;