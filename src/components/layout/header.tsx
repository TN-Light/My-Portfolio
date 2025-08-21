'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { cn } from '@/lib/utils';
import { LogoIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
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
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-headline font-bold">
          <LogoIcon className="w-8 h-8 text-primary drop-shadow-neon-primary" />
          <span>NeonDepth</span>
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
        <a href="#contact">
            <Button variant="outline" className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:drop-shadow-neon-primary">
                Get in Touch
            </Button>
        </a>
      </div>
    </motion.header>
  );
}
