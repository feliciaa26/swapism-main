import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyle = "py-3 px-6 rounded-full font-medium transition-all active:scale-95";
  
  const variants = {
    primary: "bg-swap-green text-white shadow-md hover:bg-opacity-90",
    secondary: "bg-swap-mustard text-swap-dark hover:bg-opacity-90",
    outline: "border-2 border-swap-green text-swap-green bg-transparent hover:bg-swap-green hover:text-white",
    text: "text-swap-dark hover:text-swap-green bg-transparent underline",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};