
'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import ThreeScene from '../three-scene';

export default function Hero() {
    const FADE_UP_ANIMATION_VARIANTS = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.8 } },
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center bg-background overflow-hidden">
            <div className="absolute inset-0 z-0">
                 <ThreeScene type='particles' />
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
                    className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center"
                >
                    <div className="md:col-span-1 hidden md:flex flex-col items-center gap-16">
                        <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="[writing-mode:vertical-rl] text-sm text-muted-foreground tracking-widest uppercase">
                            AI-Native Developer
                        </motion.div>
                        <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="w-px h-24 bg-border" />
                    </div>

                    <div className="md:col-span-3 text-center md:text-left">
                        <motion.h1
                            className="text-6xl md:text-8xl lg:text-9xl font-headline font-bold tracking-tighter"
                            variants={FADE_UP_ANIMATION_VARIANTS}
                        >
                            Hello
                        </motion.h1>
                        <motion.p
                            className="mt-2 text-xl md:text-2xl text-muted-foreground"
                            variants={FADE_UP_ANIMATION_VARIANTS}
                        >
                            — I'm Abhilash.
                        </motion.p>
                        <motion.div
                            variants={FADE_UP_ANIMATION_VARIANTS}
                            className="mt-8 flex gap-8 justify-center md:justify-start"
                        >
                            <div>
                                <p className="text-3xl font-bold">+30</p>
                                <p className="text-sm text-muted-foreground">Open-Source AI Projects</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold">+15</p>
                                <p className="text-sm text-muted-foreground">Research Papers Implemented</p>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        variants={FADE_UP_ANIMATION_VARIANTS}
                        className="md:col-span-1 flex justify-center md:justify-end"
                    >
                        <Image
                            src="/profile.png"
                            width={300}
                            height={450}
                            alt="Profile picture of Abhilash"
                            className="rounded-sm object-cover"
                        />
                    </motion.div>
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
