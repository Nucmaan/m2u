import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#F7F7F9] text-center">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-6xl font-bold text-[#1A3B5D] mb-4">404</h1>
        <p className="text-xl text-[#333333] mb-4">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <p className="text-md text-[#7A7A7A] mb-6">
          It might have been moved or deleted. Please check the URL or return to the homepage.
        </p>
        <Link href={"/"} className="inline-block px-6 py-2 text-white bg-[#F47C48] rounded-lg hover:bg-[#16324A] transition duration-300">
          Go Back to Home
        </Link>        
      </div>
    </div>
  );
}
