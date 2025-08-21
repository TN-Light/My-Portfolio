'use client';

import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Projects from '@/components/sections/projects';
import Contact from '@/components/sections/contact';
import Experience from '@/components/sections/experience';
import PaletteSuggester from '@/components/palette-suggester';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <PaletteSuggester />
    </div>
  );
}
