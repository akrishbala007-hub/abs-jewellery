"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Instagram, Facebook, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Products', href: '/products' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="text-2xl font-serif font-bold text-primary tracking-wider">
                        ABS JEWELLERY
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-300 hover:text-primary transition-colors text-sm uppercase tracking-widest font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="https://www.instagram.com/abs_jew_making?igsh=MW8xcGJvaHhydTludA==" target="_blank" className="text-gray-400 hover:text-[#E1306C] transition-colors"><Instagram size={20} /></Link>
                        <Link href="#" className="text-gray-400 hover:text-[#1877F2] transition-colors"><Facebook size={20} /></Link>
                        <Link href="https://www.youtube.com/@SofiyaA-v6u" target="_blank" className="text-gray-400 hover:text-[#FF0000] transition-colors"><Youtube size={20} /></Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black border-b border-white/10"
                    >
                        <div className="px-4 pt-2 pb-8 space-y-4 flex flex-col items-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-300 hover:text-primary text-lg uppercase tracking-widest"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex space-x-6 pt-4">
                                <Link href="https://www.instagram.com/abs_jew_making?igsh=MW8xcGJvaHhydTludA==" target="_blank" className="text-gray-400 hover:text-[#E1306C]"><Instagram size={24} /></Link>
                                <Link href="#" className="text-gray-400 hover:text-[#1877F2]"><Facebook size={24} /></Link>
                                <Link href="https://www.youtube.com/@SofiyaA-v6u" target="_blank" className="text-gray-400 hover:text-[#FF0000]"><Youtube size={24} /></Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
