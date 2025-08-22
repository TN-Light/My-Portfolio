'use client';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

interface AboutProps {
  skills: string[];
}

export default function About({ skills = [] }: AboutProps) {
  return (
    <section id="about" className="bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-4">
            About Me
          </h2>
          <p className="text-center max-w-4xl mx-auto text-muted-foreground mb-16 text-lg">
            AI-native Computer Science student with deep expertise in multi-agent orchestration, advanced RAG systems, and LLM application development. Daily user of AI tools for coding, debugging, and rapid prototyping.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-headline font-semibold mb-6 text-center">Education</h3>
          <div className="flex items-center justify-center gap-4 mb-12 text-center">
            <div className="mt-1 p-2 bg-primary/10 rounded-full">
              <GraduationCap className="w-6 h-6 text-primary"/>
            </div>
            <div>
              <h4 className="font-bold text-xl">B.Tech. in Computer Science (AI/ML Specialization)</h4>
              <p className="text-muted-foreground">Kalasalingam Academy of Research and Education | 2022–2026</p>
              <p className="text-sm text-muted-foreground">CGPA: 7.93/10</p>
            </div>
          </div>
          
          <h3 className="text-2xl font-headline font-semibold mb-8 text-center">Technical Skills</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill) => (
              <motion.div 
                key={skill} 
                className="px-4 py-2 bg-background border rounded-full text-sm font-medium"
                whileHover={{ 
                  scale: 1.08, 
                  backgroundColor: 'hsl(var(--primary))', 
                  color: 'hsl(var(--primary-foreground))', 
                  y: -4,
                  transition: { type: 'spring', stiffness: 400, damping: 10 }
                }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
