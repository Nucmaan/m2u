import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1A3B5D', color: '#F7F7F9' }} className="py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        
        <div className="flex items-center ">
          <img 
          src="/logo.png" 
          alt="MyHome2U Logo"
          className="h-10 w-20"
          />
          <span className="text-lg font-semibold">MyHome2U</span>
        </div>

        <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:space-x-4">
          <Link href="/listings"  className="text-white hover:text-[#F47C48]">
            Property List
          </Link>
          <Link href="/contact" className="text-white hover:text-[#F47C48]">
            Contact Us
          </Link>
          <Link href="/about"  className="text-white hover:text-[#F47C48]">
            About Us
          </Link>
        </div>

        <div className="mt-4 md:mt-0">
          <span className="text-white text-sm" >
            &copy; 2024 MyHome2U. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
