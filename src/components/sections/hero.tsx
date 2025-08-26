
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

    const crazyShapeStyle = {
      clipPath: 'url(#crazy-shape-path)',
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center bg-background overflow-hidden py-24">
            <svg className="absolute w-0 h-0">
                <defs>
                    <clipPath id="crazy-shape-path" clipPathUnits="objectBoundingBox">
                        <path d="M0.773,0.999 C0.855,0.999,0.893,0.893,0.94,0.812 C1,0.715,1.012,0.589,0.995,0.485 C0.975,0.366,0.923,0.267,0.85,0.183 C0.748,0.069,0.612,0.007,0.473,0.001 C0.322,-0.006,0.18,0.057,0.08,0.156 C-0.02,0.255,-0.027,0.407,0.065,0.509 C0.113,0.563,0.223,0.64,0.23,0.752 C0.237,0.86,0.16,0.957,0.246,0.983 C0.332,1.009,0.435,0.981,0.503,0.966 C0.57,0.951,0.69,0.999,0.773,0.999 Z"></path>
                    </clipPath>
                </defs>
            </svg>
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
                                className="md:col-span-5 relative flex justify-center items-center h-[50vh] w-full group"
                            >
                                <motion.div
                                  className="absolute w-72 h-72 md:w-96 md:h-96"
                                  style={crazyShapeStyle}
                                  animate={{
                                    scale: [1, 1.02, 1],
                                    rotate: [0, 1, 0],
                                  }}
                                  transition={{
                                    duration: 20,
                                    ease: 'easeInOut',
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                  }}
                                >
                                  <img 
                                      src="/profile.png.png"
                                      alt="Profile of Abhilash"
                                      width={400}
                                      height={400}
                                      className="relative w-full h-full object-contain blur-lg opacity-70"
                                  />
                                </motion.div>

                                <motion.div
                                  className="absolute w-72 h-72 md:w-96 md:h-96"
                                  style={crazyShapeStyle}
                                  animate={{
                                    scale: [1, 1.03, 1],
                                    rotate: [0, -2, 0],
                                  }}
                                  transition={{
                                    duration: 15,
                                    ease: 'easeInOut',
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                    delay: 0.5
                                  }}
                                  whileHover={{
                                    scale: 1.5,
                                    rotate: -15,
                                    x: 50,
                                    y: -50,
                                    skew: 10,
                                    transition: { type: 'spring', stiffness: 200, damping: 15 }
                                  }}
                                >
                                    <img 
                                        src="/profile.png.png"
                                        alt="Profile of Abhilash"
                                        data-ai-hint="profile"
                                        width={400}
                                        height={400}
                                        className="relative w-full h-full object-contain"
                                    />
                                </motion.div>
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
