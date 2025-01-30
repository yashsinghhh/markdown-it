// File: frontend/src/components/Header.tsx
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from './NavLink';
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">MarkdownBlog</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/blogs">Blogs</NavLink>
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal" />
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/blogs">Blogs</NavLink>
          </div>
        )}
      </nav>
    </header>
  );
};