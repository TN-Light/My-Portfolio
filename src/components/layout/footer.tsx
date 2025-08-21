'use client';

import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { useEffect, useState } from 'react';
import ClientOnly from '../client-only';

const socialLinks = [
  { name: 'GitHub', icon: GithubIcon, url: 'https://github.com/TN-Light' },
  { name: 'LinkedIn', icon: LinkedinIcon, url: 'https://linkedin.com/in/venkat-abhilash' },
];

export default function Footer() {
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

  return (
    <ClientOnly>
      <footer className="bg-background border-t border-white/10">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {`© ${year} Abhilash. All rights reserved.`}
            </p>
            <div className="flex -mx-2 mt-4 sm:mt-0">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-2 text-muted-foreground transition-colors duration-300 hover:text-primary"
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </ClientOnly>
  );
}
