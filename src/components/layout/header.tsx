'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { cn } from '@/lib/utils';
import { LogoIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Research', href: '#research'},
  { name: 'Experience', href: '#experience' },
  { name: 'Achievements', href: '#achievements' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const activeId = useScrollSpy(
    navLinks.map((link) => link.href.substring(1)),
    { rootMargin: '-50% 0px -50% 0px' }
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled || isMenuOpen ? 'bg-background/80 backdrop-blur-sm border-b' : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-xl font-headline font-bold">
            <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.5 }}>
              <LogoIcon className="w-8 h-8 text-primary" />
            </motion.div>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  'font-medium transition-colors hover:text-primary relative',
                  activeId === link.href.substring(1) ? 'text-primary' : 'text-foreground/60'
                )}
              >
                {link.name}
                {activeId === link.href.substring(1) && (
                  <motion.div
                    className="absolute bottom-[-6px] left-0 right-0 h-0.5 bg-primary"
                    layoutId="underline"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex">
            <Button asChild>
              <motion.a 
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center"
              >
                  Book a Call 
                  <motion.div 
                    whileHover={{ x: 4, y: -4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </motion.div>
              </motion.a>
            </Button>
          </div>
          <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X/> : <Menu />}
                  <span className="sr-only">Toggle menu</span>
              </Button>
          </div>
        </div>
        {isMenuOpen && (
          <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden absolute top-20 left-0 right-0 bg-background/90 backdrop-blur-lg border-b"
          >
            <nav className="flex flex-col items-center gap-6 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'font-medium transition-colors hover:text-primary text-lg',
                    activeId === link.href.substring(1) ? 'text-primary' : 'text-foreground/60'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button asChild onClick={() => setIsMenuOpen(false)}>
                  <motion.a 
                      href="#contact"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center"
                  >
                      Book a Call 
                      <motion.div 
                        whileHover={{ x: 4, y: -4 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </motion.div>
                  </motion.a>
              </Button>
            </nav>
          </motion.div>
        )}
      </motion.header>
  );
}
