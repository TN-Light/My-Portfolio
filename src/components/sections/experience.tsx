'use client';

import { motion } from 'framer-motion';
import { Briefcase, Award } from 'lucide-react';

const experiences = [
  {
    role: 'AI Engineering Lead',
    company: 'WoowLocal Retail Tech',
    date: 'Apr–Jun 2025',
    description: 'Led cross-functional team building agentic workflows for automated project management. Implemented LLM observability and evaluation frameworks, achieving 25% faster delivery cycles.'
  },
  {
    role: 'Founder & AI Systems Architect',
    company: 'Shrink (MSME Registered)',
    date: 'Oct 2023–Jan 2025',
    description: 'Designed multi-agent prototyping system for automated 3D design and simulation workflows. Advanced to national finals using novel AI agent orchestration for creative processes.'
  }
];

const certifications = [
  {
    title: 'Generative AI Professional – Oracle',
    description: 'Multi-agent systems & LLM orchestration'
  },
  {
    title: 'NLP Specialist – Microsoft Azure',
    description: 'Production RAG implementation'
  },
  {
    title: 'Google Project Management',
    description: 'Cross-functional AI team leadership'
  },
  {
    title: 'Advanced Algorithms & DBMS – CodeChef',
    description: ''
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-center mb-16">
            Experience & <span className="text-primary">Certifications</span>
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-headline font-semibold mb-8 flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-primary" />
              Work Experience
            </h3>
            <div className="relative border-l-2 border-primary/20 pl-8 space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[38px] top-1 h-4 w-4 rounded-full bg-primary" />
                  <p className="text-sm font-semibold text-primary">{exp.date}</p>
                  <h4 className="text-xl font-bold mt-1">{exp.role}</h4>
                  <p className="text-muted-foreground font-medium">{exp.company}</p>
                  <p className="mt-2 text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-headline font-semibold mb-8 flex items-center gap-3">
              <Award className="w-8 h-8 text-primary" />
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
