
'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import type { experienceSchema } from '@/lib/schemas';
import type { z } from 'zod';

type Experience = z.infer<typeof experienceSchema>;

interface ExperienceProps {
  experiences: Experience[];
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.3,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const lineVariants = {
    hidden: { height: 0 },
    visible: { height: '100%', transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function Experience({ experiences = [] }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-16 text-left">
            Work Experience
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-1 gap-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="relative pl-8">
                <motion.div 
                    className="absolute left-0 top-0 w-0.5 bg-border/70"
                    variants={lineVariants}
                    style={{ transform: 'translateX(-37px)' }}
                />

              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <motion.div key={index} className="relative" variants={itemVariants}>
                    <div className="absolute -left-[39px] top-1 flex items-center justify-center bg-secondary">
                      <div className="h-4 w-4 rounded-full bg-primary ring-4 ring-secondary" />
                    </div>
                    <p className="text-sm font-semibold text-primary">{exp.date}</p>
                    <h4 className="text-xl font-bold mt-1 flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-primary/80" />
                      {exp.role}
                    </h4>
                    <p className="text-muted-foreground font-medium">{exp.company}</p>
                    <p className="mt-2 text-muted-foreground">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
