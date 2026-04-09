import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/25 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-56 sm:w-64 card m-2 sm:m-3 md:m-4 mt-20 p-4 sm:p-6 z-50 transform transition-all duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-4 sm:space-y-6">
          <Link
            to="/"
            className="block text-sm sm:text-base text-slate-700 hover:text-slate-950 hover:pl-2 transition-all font-medium"
            onClick={onClose}
          >
            ← Home
          </Link>

          <Link
            to="/dashboard"
            className="block text-sm sm:text-base text-slate-700 hover:text-slate-950 hover:pl-2 transition-all font-medium"
            onClick={onClose}
          >
            Dashboard
          </Link>

          <Link
            to="/new-project"
            className="block text-sm sm:text-base text-slate-700 hover:text-slate-950 hover:pl-2 transition-all font-medium"
            onClick={onClose}
          >
            New Project
          </Link>

          <Link
            to="/existing-project"
            className="block text-sm sm:text-base text-slate-700 hover:text-slate-950 hover:pl-2 transition-all font-medium"
            onClick={onClose}
          >
            View Project
          </Link>

          <hr className="border-slate-200" />

          <button
            onClick={handleLogout}
            className="block text-sm sm:text-base text-red-600 hover:text-red-700 transition-all w-full text-left font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
