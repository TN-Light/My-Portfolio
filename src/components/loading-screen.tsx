
'use client';

import { motion } from 'framer-motion';
import { LogoIcon } from './icons';

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
            delay: 1,
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
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut", repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.5 }
        }}
      >
        <LogoIcon className="w-32 h-auto" />
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
