import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 card m-4 mt-20 p-6 z-50 transform transition-all duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          <Link
            to="/dashboard"
            className="block text-lg text-gray-200 hover:text-white hover:pl-2 transition-all"
            onClick={onClose}
          >
            Dashboard
          </Link>

          <Link
            to="/new-project"
            className="block text-lg text-gray-200 hover:text-white hover:pl-2 transition-all"
            onClick={onClose}
          >
            New Project
          </Link>

          <Link
            to="/existing-project"
            className="block text-lg text-gray-200 hover:text-white hover:pl-2 transition-all"
            onClick={onClose}
          >
            Existing Project
          </Link>

          <hr className="border-dark-600" />

          <button
            onClick={handleLogout}
            className="block text-lg text-red-400 hover:text-red-300 transition-all w-full text-left"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
