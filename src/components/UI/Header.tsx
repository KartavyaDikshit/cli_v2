
"use client";

import React from 'react';


const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        {/* Placeholder for Logo */}
        Logo
      </div>
      <nav>
        <ul className="flex space-x-4 items-center">
          <li><a href="#" className="hover:text-gray-300">Home</a></li>
          <li><a href="#" className="hover:text-gray-300">Products</a></li>
          <li><a href="#" className="hover:text-gray-300">Services</a></li>
          <li><a href="#" className="hover:text-gray-300">Contact</a></li>
          <li></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
