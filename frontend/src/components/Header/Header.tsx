'use client'

import React, { useState } from 'react';
import Link from 'next/link'; // Import Next.js Link for navigation
import Image from 'next/image'; // Import Next.js Image for optimized images

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle menu open/closed
    };

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <Link href="/" passHref>
                    <div className="flex items-center text-2xl font-bold cursor-pointer">
                        {/* <Image
                            src="/images/logo.png" // Path to your logo
                            alt="Site Logo"
                            width={50} // Width of the logo
                            height={50} // Height of the logo
                        /> */}
                        <span className="ml-2">MySite</span> {/* Optional site name next to logo */}
                    </div>
                </Link>

                {/* Navigation Links (visible on medium and larger screens) */}
                <nav className="hidden md:flex space-x-6">
                    <Link href="/products" passHref>
                        <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Products</span>
                    </Link>
                    <Link href="/signup" passHref>
                        <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Sign up</span>
                    </Link>
                    <Link href="/signin" passHref>
                        <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Login</span>
                    </Link>
                </nav>

                {/* Mobile Menu Button (visible on smaller screens) */}
                <button
                    className="md:hidden text-gray-600 focus:outline-none"
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? (
                        // Close icon when the menu is open
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        // Hamburger icon when the menu is closed
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu (visible when toggled) */}
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <nav className="flex flex-col space-y-2 p-4">
                        <Link href="/products" passHref>
                            <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Products</span>
                        </Link>
                        <Link href="/about" passHref>
                            <span className="text-gray-600 hover:text-gray-900 cursor-pointer">About Us</span>
                        </Link>
                        <Link href="/contact" passHref>
                            <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Contact</span>
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
