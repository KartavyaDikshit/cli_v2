
"use client";

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div className="flex justify-center space-x-4 mb-2">
        <a href="#" className="hover:text-gray-300">About Us</a>
        <a href="#" className="hover:text-gray-300">Contact</a>
        <a href="#" className="hover:text-gray-300">Privacy Policy</a>
      </div>
      <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
