
'use client';

import { motion } from 'framer-motion';
import { LogoIcon } from '@/components/icons';

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

  const logoVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
    pulse: {
        scale: [1, 1.1, 1],
        transition: {
            duration: 1.5,
            repeat: Infinity,
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
            delay: 0.5,
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
        initial="initial"
        animate={["animate", "pulse"]}
        variants={logoVariants}
      >
        <LogoIcon className="w-24 h-24 text-primary" />
      </motion.div>
      <motion.p 
        variants={textVariants}
        className="mt-6 text-lg font-medium text-muted-foreground"
      >
        Initializing AI Abhilash...
      </motion.p>
    </motion.div>
  );
}
