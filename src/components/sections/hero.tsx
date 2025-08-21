'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThreeScene from '@/components/three-scene';

export default function Hero() {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } },
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ThreeScene type="particles" />
      </div>
      <div className="relative z-10 p-6">
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="flex flex-col items-center"
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            Abhilash
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            AI-Native Developer & Multi-Agent Systems Engineer
          </motion.p>
          <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="mt-12">
            <a href="#projects">
              <Button size="lg" className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground drop-shadow-neon-primary">
                View My Work
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
