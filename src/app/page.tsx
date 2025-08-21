'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Projects from '@/components/sections/projects';
import Contact from '@/components/sections/contact';
import Experience from '@/components/sections/experience';
import PaletteSuggester from '@/components/palette-suggester';
import { getPortfolioData } from './actions';
import type { portfolioSchema } from '@/lib/schemas';
import type { z } from 'zod';
import { Skeleton } from '@/components/ui/skeleton';

type PortfolioData = z.infer<typeof portfolioSchema>;

function LoadingSkeleton() {
  return (
    <div className="space-y-16">
      <div className="container mx-auto px-6">
        <Skeleton className="h-8 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-3/4 mx-auto mt-4" />
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Skeleton className="h-80 rounded-lg" />
          <Skeleton className="h-80 rounded-lg" />
          <Skeleton className="h-80 rounded-lg" />
        </div>
      </div>
      <div className="container mx-auto px-6">
        <Skeleton className="h-8 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-3/4 mx-auto mt-4" />
        <div className="grid md:grid-cols-2 gap-16 mt-16">
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    </div>
  )
}


export default function Home() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getPortfolioData();
      setPortfolioData(data);
      setLoading(false);
    }
    fetchData();
  }, []);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        {loading ? (
          <LoadingSkeleton />
        ) : portfolioData ? (
          <>
            <About skills={portfolioData.skills} />
            <Projects projects={portfolioData.projects} />
            <Experience 
              experiences={portfolioData.experiences}
              certifications={portfolioData.certifications}
            />
          </>
        ) : (
          <div className='text-center py-20'>Failed to load portfolio data.</div>
        )}
        <Contact />
      </main>
      <Footer />
      <PaletteSuggester />
    </div>
  );
}
