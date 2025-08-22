
'use client';

import { motion } from 'framer-motion';
import { Award, GraduationCap } from 'lucide-react';
import type { certificationSchema } from '@/lib/schemas';
import type { z } from 'zod';

type Certification = z.infer<typeof certificationSchema>;

interface AboutProps {
  skills: string[];
  certifications: Certification[];
}

export default function About({ skills = [], certifications = [] }: AboutProps) {
  return (
    <section id="about" className="bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-left mb-16">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
              About Me
            </h2>
            <p className="text-muted-foreground text-lg max-w-4xl">
              AI-native Computer Science student with deep expertise in multi-agent orchestration, advanced RAG systems, and LLM application development. Daily user of AI tools for coding, debugging, and rapid prototyping.
            </p>
        </div>
        <div className="grid md:grid-cols-5 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="md:col-span-3 space-y-12"
            >
              <div>
                <h3 className="text-2xl font-headline font-semibold mb-6">Education</h3>
                <div className="flex items-start gap-4 text-left">
                  <div className="mt-1 p-2 bg-primary/10 rounded-full">
                    <GraduationCap className="w-6 h-6 text-primary"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">B.Tech. in Computer Science (AI/ML Specialization)</h4>
                    <p className="text-muted-foreground">Kalasalingam Academy of Research and Education | 2022–2026</p>
                    <p className="text-sm text-muted-foreground">CGPA: 7.93/10</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-headline font-semibold mb-8 flex items-center gap-3">
                  <Award className="w-7 h-7 text-primary" />
                  Certifications
                </h3>
                <div className="space-y-6">
                  {certifications.map((cert, index) => (
                    <div key={index}>
                      <h4 className="text-xl font-bold">{cert.title}</h4>
                      {cert.description && <p className="text-muted-foreground">{cert.description}</p>}
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="md:col-span-2"
            >
              <h3 className="text-2xl font-headline font-semibold mb-6 text-left">Technical Skills</h3>
              <div className="flex flex-wrap gap-3 justify-start text-left">
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
            </motion.div>
        </div>
      </div>
    </section>
  );
}
