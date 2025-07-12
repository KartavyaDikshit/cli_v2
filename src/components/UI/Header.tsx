
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header>
      {/* Top Bar */}
      <div className="bg-blue-900 text-white text-sm py-2 px-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <a href="tel:+1-315-215-1633" className="hover:text-blue-200"><i className="fas fa-phone mr-1"></i> +1-315-215-1633</a>
          <a href="mailto:sales@thebrainyinsights.com" className="hover:text-blue-200"><i className="fas fa-envelope mr-1"></i> sales@thebrainyinsights.com</a>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-blue-200"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="hover:text-blue-200"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/images/logo.png" alt="The Brainy Insights" width={150} height={40} />
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-blue-900 font-medium hover:text-blue-700">Home</Link>
            
            <div className="dropdown relative">
              <button className="text-blue-900 font-medium hover:text-blue-700 flex items-center">
                Industries <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className="dropdown-menu absolute hidden bg-white shadow-lg rounded-md mt-2 py-2 w-64 z-50">
                <Link href="/industry/healthcare" className="block px-4 py-2 hover:bg-blue-50">Healthcare</Link>
                <Link href="/industry/information-technology-semiconductors" className="block px-4 py-2 hover:bg-blue-50">Information Technology & Semiconductors</Link>
                <Link href="/industry/machinery-equipment" className="block px-4 py-2 hover:bg-blue-50">Machinery & Equipment</Link>
                <Link href="/industry/aerospace-defence" className="block px-4 py-2 hover:bg-blue-50">Aerospace & Defence</Link>
                <Link href="/industry/chemicals-materials" className="block px-4 py-2 hover:bg-blue-50">Chemicals & Materials</Link>
                <Link href="/industry/food-beverages" className="block px-4 py-2 hover:bg-blue-50">Food & Beverages</Link>
                <Link href="/industry/agriculture" className="block px-4 py-2 hover:bg-blue-50">Agriculture</Link>
                <Link href="/industry/energy-power" className="block px-4 py-2 hover:bg-blue-50">Energy & Power</Link>
                <Link href="/industry/consumer-goods" className="block px-4 py-2 hover:bg-blue-50">Consumer Goods</Link>
                <Link href="/industry/automotive-transportation" className="block px-4 py-2 hover:bg-blue-50">Automotive & Transportation</Link>
              </div>
            </div>
            
            <div className="dropdown relative">
              <button className="text-blue-900 font-medium hover:text-blue-700 flex items-center">
                Services <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className="dropdown-menu absolute hidden bg-white shadow-lg rounded-md mt-2 py-2 w-64 z-50">
                <Link href="/services#consulting" className="block px-4 py-2 hover:bg-blue-50">Consulting Services</Link>
                <Link href="/services#tailored-insights" className="block px-4 py-2 hover:bg-blue-50">Tailored Insights</Link>
                <Link href="/services#emerging-technologies" className="block px-4 py-2 hover:bg-blue-50">Emerging Technologies</Link>
                <Link href="/services#syndicated-market-reports" className="block px-4 py-2 hover:bg-blue-50">Syndicated Market Reports</Link>
                <Link href="/services#competitive-intelligence" className="block px-4 py-2 hover:bg-blue-50">Competitive Intelligence</Link>
                <Link href="/services#customer-research" className="block px-4 py-2 hover:bg-blue-50">Customer Research</Link>
                <Link href="/services#market-intelligence" className="block px-4 py-2 hover:bg-blue-50">Market Intelligence</Link>
                <Link href="/services#industry-development" className="block px-4 py-2 hover:bg-blue-50">Industry Development</Link>
              </div>
            </div>
            
            <Link href="/about" className="text-blue-900 font-medium hover:text-blue-700">About Us</Link>
            <Link href="/contact" className="text-blue-900 font-medium hover:text-blue-700">Contact Us</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="lg:hidden text-blue-900">
              <i className="fas fa-bars text-xl"></i>
            </button>
            <button className="text-blue-900">
              <i className="fas fa-search text-xl"></i>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
