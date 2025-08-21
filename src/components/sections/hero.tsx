'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThreeScene from '@/components/three-scene';

export default function Hero() {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-background">
        <ThreeScene type="particles" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
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
                staggerChildren: 0.25,
              },
            },
          }}
          className="flex flex-col items-center"
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-2"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            Abhilash
          </motion.h1>
          <motion.p
            className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            AI-Native Developer & Multi-Agent Systems Engineer
          </motion.p>
          <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="mt-10">
            <Button asChild size="lg" className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-full drop-shadow-neon-primary transition-transform duration-300 hover:scale-105">
              <a href="#projects">
                View My Work
                <ArrowDown className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
       <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center p-1">
          <motion.div
            className="w-1.5 h-3 bg-muted-foreground rounded-full"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
