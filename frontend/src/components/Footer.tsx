import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              About
            </h3>
            <p className="mt-4 text-gray-600">
              A modern markdown blog platform built with React and TypeScript.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-600">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-blue-600">
                  About
                </a>
              </li>
              <li>
                <a href="/blogs" className="text-gray-600 hover:text-blue-600">
                  Blogs
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Connect
            </h3>
            <div className="mt-4 flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} MarkdownBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};