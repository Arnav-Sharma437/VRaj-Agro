import React from 'react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-150 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-green-700">
              Vraj Agro
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-green-700 font-medium">
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-green-700 font-medium">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-700 font-medium">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-700 font-medium">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
