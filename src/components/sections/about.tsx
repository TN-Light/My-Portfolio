'use client';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import ThreeScene from '@/components/three-scene';

const skills = [
  'LangChain', 'LangGraph', 'CrewAI', 'AutoGen', 'OpenAI API', 'Hugging Face', 'RAG', 'HyDE', 'Query Decomposition',
  'Multi-agent orchestration', 'Tool-calling patterns', 'Self-reflective RAG', 'Chain-of-thought reasoning',
  'Model Context Protocol (MCP)', 'LLM observability', 'Evaluation frameworks', 'Prompt optimization',
  'Python (AI-enhanced)', 'Java', 'C++', 'SQL', 'JavaScript', 'React', 'AWS', 'Azure', 'MySQL', 'Git', 'Docker'
];

export default function About() {
  return (
    <section id="about" className="bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-center mb-4 tracking-tighter">
            About <span className="text-primary drop-shadow-neon-primary">Me</span>
          </h2>
          <p className="text-center max-w-3xl mx-auto text-muted-foreground mb-16 text-lg">
            AI-native Computer Science student with deep expertise in multi-agent orchestration, advanced RAG systems, and LLM application development. Daily user of AI tools for coding, debugging, and rapid prototyping.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2"
          >
            <h3 className="text-3xl font-headline font-semibold mb-6 text-primary">Education</h3>
            <div className="flex items-start gap-4 mb-8">
              <div className="mt-1 p-2 bg-primary/10 rounded-full">
                <GraduationCap className="w-6 h-6 text-primary"/>
              </div>
              <div>
                <h4 className="font-bold text-xl">B.Tech. in Computer Science (AI/ML Specialization)</h4>
                <p className="text-muted-foreground">Kalasalingam Academy of Research and Education | 2022–2026</p>
                <p className="text-sm text-muted-foreground">CGPA: 7.93/10</p>
              </div>
            </div>
            
            <h3 className="text-3xl font-headline font-semibold mb-6 text-primary">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <motion.div 
                  key={skill} 
                  className="px-3 py-1.5 bg-secondary rounded-full text-sm font-medium text-foreground/80"
                  whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="w-full h-80 md:h-96"
          >
             <div 
              className="w-full h-full rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl shadow-primary/20 flex items-center justify-center bg-secondary"
              data-ai-hint="futuristic avatar"
            >
              <ThreeScene type="avatar" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
