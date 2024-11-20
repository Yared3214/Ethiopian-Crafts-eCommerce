// 'use client'

// import React, { useState } from 'react';
// import Link from 'next/link'; // Import Next.js Link for navigation
// import { useSelector } from 'react-redux'; // Import useSelector hook from react-redux
// import { RootState } from '@/store/store'; // Import RootState type
// import Cart from '../Cart/cart'

// const Header: React.FC = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility

//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen); // Toggle menu open/closed
//     };

//     const { isLoggedIn } = useSelector((state: RootState) => state.user);

//     return (
//         <header className="bg-white shadow-md">
//             <div className="container mx-auto flex justify-between items-center p-4">
//                 {/* Logo */}
//                 <Link href="/" passHref>
//                     <div className="flex items-center text-2xl font-bold cursor-pointer">
//                         {/* <Image
//                             src="/images/logo.png" // Path to your logo
//                             alt="Site Logo"
//                             width={50} // Width of the logo
//                             height={50} // Height of the logo
//                         /> */}
//                         <span className="ml-2">MySite</span> {/* Optional site name next to logo */}
//                     </div>
//                 </Link>

//                 {/* Navigation Links (visible on medium and larger screens) */}
//                 <nav className="hidden md:flex space-x-6">
//                     <Link href="/products" passHref>
//                         <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Products</span>
//                     </Link>
//                     {isLoggedIn ? (
//                         <>
//                             <div className='-py-2 text-gray-600'>
//                                 <Cart />
//                             </div>
//                             <Link href="/dashboard" passHref>
//                                 <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Dashboard</span>
//                             </Link>
//                         </>
//                     ) :
//                         (
//                             <div>
//                                 <Link href="/signin" passHref>
//                                     <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Login</span>
//                                 </Link>
//                             </div>
//                         )
//                     }



//                 </nav>

//                 {/* Mobile Menu Button (visible on smaller screens) */}
//                 <button
//                     className="md:hidden text-gray-600 focus:outline-none"
//                     onClick={toggleMenu}
//                     aria-label="Toggle Menu"
//                 >
//                     {isMenuOpen ? (
//                         // Close icon when the menu is open
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                     ) : (
//                         // Hamburger icon when the menu is closed
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
//                         </svg>
//                     )}
//                 </button>
//             </div>

//             {/* Mobile Menu (visible when toggled) */}
//             {isMenuOpen && (
//                 <div className="md:hidden bg-white shadow-lg">
//                     <nav className="flex flex-col space-y-2 p-4">
//                         <Link href="/products" passHref>
//                             <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Products</span>
//                         </Link>
//                         <Link href="/about" passHref>
//                             <span className="text-gray-600 hover:text-gray-900 cursor-pointer">About Us</span>
//                         </Link>
//                         <Link href="/contact" passHref>
//                             <span className="text-gray-600 hover:text-gray-900 cursor-pointer">Contact</span>
//                         </Link>
//                     </nav>
//                 </div>
//             )}
//         </header>
//     );
// };

// export default Header;

"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
    return (
        <div className="relative w-full flex items-center justify-center">
            <Navbar className="top-2" />
        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
            className={cn("fixed top-10 bg inset-x-0 max-w-2xl mx-auto z-50", className)}
        >
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Home">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/web-dev">Web Development</HoveredLink>
                        <HoveredLink href="/interface-design">Interface Design</HoveredLink>
                        <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
                        <HoveredLink href="/branding">Branding</HoveredLink>
                    </div>
                </MenuItem>
                
                <MenuItem setActive={setActive} active={active} item="Blogs">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/hobby">Hobby</HoveredLink>
                        <HoveredLink href="/individual">Individual</HoveredLink>
                        <HoveredLink href="/team">Team</HoveredLink>
                        <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Products">
                    <div className="  text-sm grid grid-cols-2 gap-10 p-4">
                        <ProductItem
                            title="Algochurn"
                            href="https://algochurn.com"
                            src="https://assets.aceternity.com/demos/algochurn.webp"
                            description="Prepare for tech interviews like never before."
                        />
                        <ProductItem
                            title="Tailwind Master Kit"
                            href="https://tailwindmasterkit.com"
                            src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                            description="Production ready Tailwind css components for your next project"
                        />
                        <ProductItem
                            title="Moonbeam"
                            href="https://gomoonbeam.com"
                            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                            description="Never write from scratch again. Go from idea to blog in minutes."
                        />
                        <ProductItem
                            title="Rogue"
                            href="https://userogue.com"
                            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                            description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
                        />
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
}


export default Header