'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface MenuItem {
  id: number;
  title: string;
  href: string;
  order: number;
  parent: number;
  children: MenuItem[];
}

export function Navigation({
  logo,
  name,
  items,
}: {
  logo: string;
  name: string;
  items: MenuItem[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Set<number>>(new Set());
  const pathname = usePathname();

  // Filter top-level items (parent === 0)
  const topLevelItems = items
    .filter((item) => item.parent === 0)
    .sort((a, b) => a.order - b.order);

  const toggleSubmenu = (itemId: number) => {
    const newOpenSubmenus = new Set(openSubmenus);
    if (newOpenSubmenus.has(itemId)) {
      newOpenSubmenus.delete(itemId);
    } else {
      newOpenSubmenus.add(itemId);
    }
    setOpenSubmenus(newOpenSubmenus);
  };

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const renderMenuItem = (item: MenuItem, isMobile = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isSubmenuOpen = openSubmenus.has(item.id);
    const isActive = isActiveLink(item.href);

    return (
      <div key={item.id} className={cn(isMobile ? 'w-full' : 'relative')}>
        {hasChildren ? (
          <div className={cn(isMobile ? 'w-full' : 'group')}>
            <button
              onClick={() => isMobile && toggleSubmenu(item.id)}
              onMouseEnter={() =>
                !isMobile &&
                setOpenSubmenus((prev) => new Set([...prev, item.id]))
              }
              onMouseLeave={() =>
                !isMobile &&
                setOpenSubmenus((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(item.id);
                  return newSet;
                })
              }
              className={cn(
                'relative flex items-center gap-1 px-3 py-2 font-medium text-sm transition-colors',
                isActive ? 'text-white' : 'text-white/70 hover:text-white',
                isMobile ? 'w-full justify-between' : 'justify-center',
              )}>
              <span>{item.title}</span>
              {isActive && (
                <motion.div
                  className='right-0 -bottom-1 left-0 absolute bg-gradient-to-r from-purple-400 to-cyan-400 h-0.5'
                  layoutId='underline'
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              {isMobile ? (
                isSubmenuOpen ? (
                  <ChevronUp className='w-4 h-4' />
                ) : (
                  <ChevronDown className='w-4 h-4' />
                )
              ) : (
                <ChevronDown className='w-4 h-4' />
              )}
            </button>

            {/* Desktop Dropdown */}
            {!isMobile && (
              <AnimatePresence>
                {isSubmenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className='top-full left-0 z-50 absolute bg-black/90 shadow-lg backdrop-blur-md mt-1 border border-white/20 rounded-md min-w-48'
                    onMouseEnter={() =>
                      setOpenSubmenus((prev) => new Set([...prev, item.id]))
                    }
                    onMouseLeave={() =>
                      setOpenSubmenus((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(item.id);
                        return newSet;
                      })
                    }>
                    <div className='py-1'>
                      {item.children
                        .sort((a, b) => a.order - b.order)
                        .map((child) => (
                          <Link
                            key={child.id}
                            href={child.href}
                            className={cn(
                              'block px-4 py-2 text-sm transition-colors',
                              isActiveLink(child.href)
                                ? 'text-white'
                                : 'text-white/70 hover:text-white',
                            )}>
                            {child.title}
                          </Link>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* Mobile Submenu */}
            {isMobile && (
              <AnimatePresence>
                {isSubmenuOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='bg-black/50 mt-1 rounded-md overflow-hidden'>
                    <div className='py-2 pl-4'>
                      {item.children
                        .sort((a, b) => a.order - b.order)
                        .map((child) => (
                          <Link
                            key={child.id}
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              'block relative px-3 py-2 rounded-md text-sm transition-colors',
                              isActiveLink(child.href)
                                ? 'text-white'
                                : 'text-white/70 hover:text-white',
                            )}>
                            {child.title}
                            {isActiveLink(child.href) && (
                              <motion.div
                                className='right-0 -bottom-1 left-0 absolute bg-gradient-to-r from-purple-400 to-cyan-400 h-0.5'
                                layoutId={`mobile-underline-${child.id}`}
                                initial={false}
                                transition={{
                                  type: 'spring',
                                  stiffness: 300,
                                  damping: 30,
                                }}
                              />
                            )}
                          </Link>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ) : (
          <Link
            href={item.href}
            onClick={() => isMobile && setIsOpen(false)}
            className={cn(
              'block relative px-3 py-2 font-medium text-sm transition-colors',
              isActive ? 'text-white' : 'text-white/70 hover:text-white',
              isMobile ? 'w-full' : 'text-center',
            )}>
            {item.title}
            {isActive && (
              <motion.div
                className='right-0 -bottom-1 left-0 absolute bg-gradient-to-r from-purple-400 to-cyan-400 h-0.5'
                layoutId={
                  isMobile ? `mobile-underline-${item.id}` : 'underline'
                }
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        )}
      </div>
    );
  };

  return (
    <nav className='top-0 right-0 left-0 z-50 fixed bg-gradient-to-b from-black/80 to-black/0 backdrop-blur-md'>
      <div className='mx-auto px-4 max-w-6xl container'>
        <div className='flex justify-between items-center py-4 h-16'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-3'>
            <Image
              src={logo || '/placeholder.svg'}
              alt={`${name} logo`}
              width={40}
              height={40}
              className='border border-white/20 rounded-full w-10 h-10'
            />
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex space-x-4'>
            {topLevelItems.map((item) => renderMenuItem(item, false))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden text-white'
            aria-label='Toggle menu'>
            {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className='md:hidden flex flex-col space-y-4 bg-black/90 backdrop-blur-md px-6 py-4'>
              {topLevelItems.map((item) => renderMenuItem(item, true))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
