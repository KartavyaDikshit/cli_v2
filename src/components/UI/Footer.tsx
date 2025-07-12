
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white pt-16 pb-8" itemScope itemType="https://schema.org/Organization">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-8">
            <Link href="/" className="flex items-center mb-6">
              <Image src="/images/logo-white.png" alt="The Brainy Insights" width={150} height={40} />
            </Link>
            <h3 className="text-xl font-semibold mb-4">Connect with Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/thebrainyinsights" className="hover:text-blue-300"><i className="fab fa-facebook-f text-xl"></i></a>
              <a href="https://www.linkedin.com/company/thebrainyinsights" className="hover:text-blue-300"><i className="fab fa-linkedin-in text-xl"></i></a>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="hover:text-blue-300">FAQs</Link></li>
              <li><Link href="/press-releases" className="hover:text-blue-300">Press Release</Link></li>
              <li><Link href="/policy" className="hover:text-blue-300">Privacy Policy</Link></li>
              <li><Link href="/terms-and-condition" className="hover:text-blue-300">Terms & Conditions</Link></li>
              <li><Link href="/services" className="hover:text-blue-300">Services</Link></li>
              <li><Link href="/contact" className="hover:text-blue-300">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p className="mb-2">The Brainy Insights,</p>
              <p className="mb-2">Office 102, Sanskriti Aspirations,</p>
              <p className="mb-2">Near Icon Tower, Baner Road,</p>
              <p className="mb-2">Pune, MH, India - 411045</p>
              <p className="mb-2"><a href="tel:+91-9370600191" className="hover:text-blue-300">+91-9370600191</a></p>
              <p className="mb-2"><a href="tel:+1-315-215-1633" className="hover:text-blue-300">+1-315-215-1633</a></p>
              <p><a href="mailto:sales@thebrainyinsights.com" className="hover:text-blue-300">sales@thebrainyinsights.com</a></p>
            </address>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">We accept</h3>
            <Image src="/images/payment-options.png" alt="Payment options" width={200} height={50} />
          </div>
        </div>
        
        <div className="border-t border-blue-800 pt-8 mt-8 text-center text-blue-300">
          <p>&copy; 2025 The Brainy Insights. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
