import React from 'react';

const baseStyle = {
  fontWeight: 600,
  transition: 'all 0.3s ease',
  borderRadius: '0.5rem',
  padding: '0.625rem 1.25rem',
  border: '1px solid transparent',
  cursor: 'pointer',
};

const variantStyles = {
  primary: {
    color: '#ffffff',
    background: 'linear-gradient(120deg, #0ea5e9 0%, #1d4ed8 100%)',
    boxShadow: '0 8px 16px rgba(14, 165, 233, 0.25)',
  },
  secondary: {
    color: '#334155',
    background: '#ffffff',
    borderColor: '#e2e8f0',
  },
};

const Button = ({ children, variant = 'primary', className = '', style, ...props }) => {
  const computedStyle = {
    ...baseStyle,
    ...(variantStyles[variant] || variantStyles.primary),
    ...style,
  };

  return (
    <button
      className={className}
      style={computedStyle}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
