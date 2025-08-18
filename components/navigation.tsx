'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function Navigation({ logo, name }: { logo: string; name: string }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const items = [
    // { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className='top-0 right-0 left-0 z-50 fixed bg-gradient-to-b from-black/80 to-black/0 backdrop-blur-md'>
      <div className='flex justify-between items-center mx-auto py-4 max-w-6xl container'>
        <Link href='/' className='flex items-center space-x-3'>
          <Image
            src={logo}
            alt={name}
            width={40}
            height={40}
            className='border border-white/20 rounded-full'
          />
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex space-x-8'>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='relative flex items-center font-medium text-white/70 hover:text-white transition-colors'>
              {item.label}
              {pathname === item.href && (
                <motion.div
                  className='right-0 -bottom-1 left-0 absolute bg-gradient-to-r from-purple-400 to-cyan-400 h-0.5'
                  layoutId='underline'
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden text-white'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <X className='w-6 h-6' />
          ) : (
            <Menu className='w-6 h-6' />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className='md:hidden flex flex-col space-y-4 bg-black/90 backdrop-blur-md px-6 py-4'>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className='font-medium text-white/70 hover:text-white transition-colors'>
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
