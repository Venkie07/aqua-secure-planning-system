import React from 'react';

const cardStyle = {
  borderRadius: '0.75rem',
  border: '1px solid #e2e8f0',
  padding: '1.5rem',
  transition: 'all 0.3s ease',
  background: '#ffffff',
  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)',
};

const Card = ({ children, className = '', style, ...props }) => {
  return (
    <div
      className={className}
      style={{ ...cardStyle, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
