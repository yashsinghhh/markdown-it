// File: frontend/src/components/Footer.tsx
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <span className="text-primary/60 mb-4 md:mb-0">
            © {new Date().getFullYear()} MarkdownBlog
          </span>
          <div className="flex space-x-4">
            <a href="/about" className="text-primary/60 hover:text-primary">
              About
            </a>
            <a href="/privacy" className="text-primary/60 hover:text-primary">
              Privacy
            </a>
            <a href="/terms" className="text-primary/60 hover:text-primary">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};