'use client';

import { GithubIcon, TwitterIcon, LinkedinIcon } from '@/components/icons';
import { useEffect, useState } from 'react';

const socialLinks = [
  { name: 'GitHub', icon: GithubIcon, url: '#' },
  { name: 'Twitter', icon: TwitterIcon, url: '#' },
  { name: 'LinkedIn', icon: LinkedinIcon, url: '#' },
];

export default function Footer() {
  const [copyrightText, setCopyrightText] = useState('');

  useEffect(() => {
    setCopyrightText(`© ${new Date().getFullYear()} NeonDepth Portfolio. All rights reserved.`);
  }, []);

  return (
    <footer className="bg-background border-t border-white/10">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground h-5 flex items-center">
            {copyrightText || `\u00A0`}
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
  );
}
