import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, mobile = false }) => {
  if (mobile) {
    return (
      <a
        href={href}
        className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
    >
      {children}
    </a>
  );
};

export default NavLink;