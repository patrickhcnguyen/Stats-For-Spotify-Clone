import React, { useState } from 'react';
import { HomeIcon, MinusIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  title: string;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ title, isLoggedIn, onLogin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLoginClick = () => {
    if (!isLoggedIn) {
      window.location.href = 'http://localhost:8888/login'; 
    }
  };

  const handleLogoutClick = async () => {
    await fetch('http://localhost:8888/logout', {
      method: 'GET',
      credentials: 'include', 
    });

    onLogout(); 
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md h-16"> 
      <div className="w-full px-6 py-3 flex justify-between items-center"> 
        <a href="/homepage" className="flex items-center space-x-2">
          <HomeIcon className="w-7 h-7" /> 
          <span className="font-bold text-lg">Stats For Spotify</span> 
        </a>
        <div className="flex items-center space-x-6 ml-auto">
          <a href="track/top" className="hover:text-blue-600 transition-colors text-lg"> 
            Top Tracks
          </a>
          <a href="artist/top" className="hover:text-blue-600 transition-colors text-lg">
            Top Artists
          </a>
          <a href="genre/top" className="hover:text-blue-600 transition-colors text-lg">
            Top Genres
          </a>
          <a href="track/recent" className="hover:text-blue-600 transition-colors text-lg">
            Recently Played
          </a>

          {isLoggedIn ? (
            <>
              <button
                className="flex items-center hover:text-blue-600 transition-colors text-lg"
                onClick={toggleDropdown}
              >
                Account
                <ChevronDownIcon className="w-5 h-5 ml-1" />
              </button>
              {isDropdownOpen && (
                <ul className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                  <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                    Manage account
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={handleLogoutClick}>
                    Logout
                  </li>
                </ul>
              )}
            </>
          ) : (
            <button
              className="hover:text-blue-600 transition-colors text-lg"
              onClick={handleLoginClick}
            >
              Login
            </button>
          )}
        </div>
        <button
          className="md:hidden ml-auto"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          {isOpen ? <XMarkIcon className="w-6 h-6" /> : <MinusIcon className="w-6 h-6" />}
        </button>
      </div>
    </nav>

  );
};

export default Navbar;
