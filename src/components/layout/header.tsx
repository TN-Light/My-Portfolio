'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { cn } from '@/lib/utils';
import { LogoIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || isMenuOpen ? 'bg-background/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-headline font-bold">
          <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.5 }}>
            <LogoIcon className="w-8 h-8 text-primary drop-shadow-neon-primary" />
          </motion.div>
          <span>Abhilash</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                'font-medium transition-colors hover:text-primary relative',
                activeId === link.href.substring(1) ? 'text-primary' : 'text-foreground'
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
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:drop-shadow-neon-primary">
            <a href="#contact">
                Get in Touch
            </a>
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
            className="md:hidden absolute top-20 left-0 right-0 bg-background/90 backdrop-blur-lg border-b border-white/10"
        >
          <nav className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  'font-medium transition-colors hover:text-primary text-lg',
                  activeId === link.href.substring(1) ? 'text-primary' : 'text-foreground'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:drop-shadow-neon-primary" onClick={() => setIsMenuOpen(false)}>
                <a href="#contact">
                    Get in Touch
                </a>
            </Button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
