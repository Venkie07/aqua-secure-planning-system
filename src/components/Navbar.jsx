import React from 'react';
import { getCurrentUser } from '../utils/auth';

const Navbar = ({ onMenuClick }) => {
  const user = getCurrentUser();

  return (
    <nav className="fixed top-0 w-full z-50">
      <div className="card m-4 flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="text-2xl text-gray-300 hover:text-white transition-colors"
          >
            ☰
          </button>
          <h1 className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
            AquaSecure Planning System
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-gray-300 text-sm hidden sm:block">{user?.name}</span>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold hover:scale-110 transition-transform"
            title={user?.company || 'Profile'}
          >
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
