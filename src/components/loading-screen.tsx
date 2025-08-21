
'use client';

import { motion } from 'framer-motion';

const LogoIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 100" 
        className="w-24 h-24"
    >
        <motion.path
            d="M50 15 L85 85 H15 Z"
            strokeWidth="5"
            stroke="hsl(var(--primary))"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
        />
        <motion.path
            d="M50 15 L50 60"
            strokeWidth="4"
            stroke="hsl(var(--primary))"
            strokeLinecap="round"
            fill="transparent"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
        />
        <motion.path
            d="M35 60 L65 60"
            strokeWidth="4"
            stroke="hsl(var(--primary))"
            strokeLinecap="round"
            fill="transparent"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeInOut" }}
        />
    </svg>
);


export default function LoadingScreen() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delay: 0.1,
        when: "beforeChildren",
      } 
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    }
  };
  
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            delay: 1.5,
            duration: 0.8,
        }
     },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <motion.div
        animate={{
            scale: [1, 1.05, 1],
            transition: {
                delay: 1.8,
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }}
      >
        <LogoIcon />
      </motion.div>
      <motion.p 
        variants={textVariants}
        className="mt-6 text-lg font-medium text-muted-foreground"
      >
        Initializing Portfolio...
      </motion.p>
    </motion.div>
  );
}
