
'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import ThreeScene from '../three-scene';
import { useTheme } from '@/hooks/use-theme';

export default function Hero() {
    const { primaryHsl, accentHsl } = useTheme();

    const FADE_UP_ANIMATION_VARIANTS = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.8 } },
    };
    
    const staggeredFadeUp = {
        hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: 'spring', duration: 0.8 } },
    };

    const heroTextContainer = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const helloText = "Hello".split("");
    const nameText = "— I'm Abhilash.".split("");

    return (
        <section id="hero" className="relative min-h-screen flex items-center bg-background overflow-hidden py-24">
            <div className="absolute inset-0 z-0">
                 <ThreeScene type='particles' primaryColor={primaryHsl} accentColor={accentHsl} />
            </div>
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial="hidden"
                    animate="show"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        show: {
                            transition: {
                                staggerChildren: 0.15,
                                delayChildren: 0.2,
                            },
                        },
                    }}
                    className="grid grid-cols-12 items-center"
                >
                    <div className="col-span-12">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                            <div className="md:col-span-7 text-left">
                                <div className="flex items-center gap-8">
                                    <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="[writing-mode:vertical-rl] text-lg text-muted-foreground tracking-widest uppercase self-center rotate-180">
                                        AI-Native Developer
                                    </motion.div>
                                    <div>
                                        <motion.h1
                                            className="text-6xl md:text-7xl lg:text-8xl font-headline font-bold tracking-tighter"
                                            variants={heroTextContainer}
                                            aria-label="Hello"
                                        >
                                            {helloText.map((char, index) => (
                                                <motion.span key={index} variants={staggeredFadeUp} className="inline-block">
                                                    {char === " " ? " " : char}
                                                </motion.span>
                                            ))}
                                        </motion.h1>
                                        <motion.p
                                            className="mt-2 text-3xl md:text-4xl text-muted-foreground"
                                            variants={heroTextContainer}
                                            aria-label="— I'm Abhilash."
                                        >
                                            {nameText.map((char, index) => (
                                                <motion.span key={index} variants={staggeredFadeUp} className="inline-block">
                                                    {char === " " ? " " : char}
                                                </motion.span>
                                            ))}
                                        </motion.p>
                                    </div>
                                </div>

                                <motion.div
                                    variants={FADE_UP_ANIMATION_VARIANTS}
                                    className="mt-8 flex gap-8 justify-start"
                                >
                                    <div>
                                        <p className="text-5xl font-bold">+30</p>
                                        <p className="text-lg text-muted-foreground">Open-Source AI Projects</p>
                                    </div>
                                    <div>
                                        <p className="text-5xl font-bold">+15</p>
                                        <p className="text-lg text-muted-foreground">Research Papers Implemented</p>
                                    </div>
                                </motion.div>
                            </div>

                             <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="md:col-span-5 relative flex justify-center items-center group"
                            >
                                <motion.img 
                                    src="/profile.png.png"
                                    alt="Profile of Abhilash"
                                    data-ai-hint="profile"
                                    className="w-80 h-80 object-cover rounded-full border-4 border-secondary shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
            >
                <a href="#about" className="flex flex-col items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                    Scroll down
                    <ArrowDown className="w-4 h-4" />
                </a>
            </motion.div>
        </section>
    );
}
