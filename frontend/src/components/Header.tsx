import React, { useState } from 'react';
import { Menu, X, Pencil } from 'lucide-react';
import { NavLink } from './NavLink';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Pencil className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">MarkdownBlog</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/" active>Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/blogs">Blogs</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3">
            <div className="flex flex-col space-y-3">
              <NavLink href="/" active>Home</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/blogs">Blogs</NavLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};