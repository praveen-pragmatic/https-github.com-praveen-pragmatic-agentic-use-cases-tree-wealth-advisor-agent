import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  href?: string;
  icon?: LucideIcon;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  href,
  icon: Icon,
  className = '',
}) => {
  const baseStyles = 'w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md md:py-4 md:text-lg md:px-10';
  const variants = {
    primary: 'text-white bg-blue-600 hover:bg-blue-700',
    secondary: 'text-blue-600 bg-blue-100 hover:bg-blue-200',
  };

  const buttonContent = (
    <>
      {children}
      {Icon && <Icon className="ml-2 h-5 w-5" />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {buttonContent}
      </a>
    );
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {buttonContent}
    </button>
  );
};

export default Button;