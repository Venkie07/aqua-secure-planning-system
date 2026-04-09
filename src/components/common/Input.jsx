import React from 'react';

const labelStyle = {
  display: 'block',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#334155',
  marginBottom: '0.5rem',
};

const inputStyle = {
  width: '100%',
  borderRadius: '0.5rem',
  border: '1px solid #e2e8f0',
  padding: '0.625rem 1rem',
  outline: 'none',
  transition: 'all 0.3s ease',
  background: '#ffffff',
  color: '#0f172a',
  fontSize: '1rem',
};

const errorStyle = {
  color: '#ef4444',
  fontSize: '0.875rem',
  marginTop: '0.25rem',
};

const Input = ({ label, error, className = '', style, id, ...props }) => {
  const inputId = id || props.name || undefined;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} style={labelStyle}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={className}
        style={{
          ...inputStyle,
          ...(error ? { borderColor: '#ef4444' } : {}),
          ...style,
        }}
        {...props}
      />
      {error && (
        <p style={errorStyle}>{error}</p>
      )}
    </div>
  );
};

export default Input;
