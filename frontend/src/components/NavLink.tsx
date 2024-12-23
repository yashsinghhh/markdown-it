import React from 'react';
import { clsx } from 'clsx';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, children, active }) => {
  return (
    <a
      href={href}
      className={clsx(
        'text-sm font-medium transition-colors duration-200',
        active ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
      )}
    >
      {children}
    </a>
  );
};