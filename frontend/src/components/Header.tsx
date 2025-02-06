// File: frontend/src/components/Header.tsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "./NavLink";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button"; // ShadCN Button

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <nav className="container flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">MarkdownBlog</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/blogs">Blogs</NavLink>
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 pb-4 px-4">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/blogs">Blogs</NavLink>
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <Button variant="outline" className="w-full">Sign In</Button>
            </SignInButton>
          )}
        </div>
      )}
    </header>
  );
};