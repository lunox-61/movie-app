import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk dropdown
  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.href = '/login'; // Redirect ke halaman login
  };

  const username = localStorage.getItem('username') || 'Guest'; // Menampilkan 'Guest' jika tidak ada username

  return (
    <header className="bg-blue-600 p-4 text-white flex justify-between items-center relative">
      <h1 className="text-lg font-bold">
        Movie App
      </h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-200">Home</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-gray-200">Profile</Link>
          </li>
          <li className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
              className="hover:text-gray-200"
            >
              {username} {/* Tampilkan nama user atau Guest */}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg z-10">
                <button 
                  onClick={handleLogout} 
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
