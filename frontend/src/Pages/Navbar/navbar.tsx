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
      onLogin();
    }
  };

  const handleLogoutClick = () => {
    onLogout();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4 md:space-x-6">
          <HomeIcon className="w-6 h-6 mr-2" />
          <a href="track/top" className="hover:text-blue-600 transition-colors">
            Top Tracks
          </a>
          <a href="artist/top" className="hover:text-blue-600 transition-colors">
            Top Artists
          </a>
          <a href="genre/top" className="hover:text-blue-600 transition-colors">
            Top Genres
          </a>
          <a href="track/recent" className="hover:text-blue-600 transition-colors">
            Recently Played
          </a>
        </div>
        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          {isOpen ? <XMarkIcon className="w-6 h-6" /> : <MinusIcon className="w-6 h-6" />}
        </button>
        <div className={`md:flex ${isOpen ? 'block' : 'hidden'} md:space-x-4 relative`}>
          {isLoggedIn ? (
            <button
              className="flex items-center hover:text-blue-600 transition-colors"
              onClick={toggleDropdown}
            >
              Account
              <ChevronDownIcon className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button
              className="hover:text-blue-600 transition-colors"
              onClick={handleLoginClick}
            >
              Login
            </button>
          )}
          {isLoggedIn && isDropdownOpen && (
            <ul className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
              <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                Manage
              </li>
              <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={handleLogoutClick}>
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
