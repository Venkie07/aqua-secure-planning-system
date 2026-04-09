import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      <input 
        className={`input-field text-sm sm:text-base ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
