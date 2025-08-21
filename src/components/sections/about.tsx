'use client';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const skills = [
  'LangChain', 'LangGraph', 'CrewAI', 'AutoGen', 'OpenAI API', 'Hugging Face', 'RAG', 'HyDE', 'Query Decomposition',
  'Multi-agent orchestration', 'Tool-calling patterns', 'Self-reflective RAG', 'Chain-of-thought reasoning',
  'Model Context Protocol (MCP)', 'LLM observability', 'Evaluation frameworks', 'Prompt optimization',
  'Python (AI-enhanced)', 'Java', 'C++', 'SQL', 'JavaScript', 'React', 'AWS', 'Azure', 'MySQL', 'Git', 'Docker'
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-center mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-center max-w-3xl mx-auto text-muted-foreground mb-12 text-lg">
            AI-native Computer Science student with deep expertise in multi-agent orchestration, advanced RAG systems, and LLM application development. Daily user of AI tools for coding, debugging, and rapid prototyping.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-headline font-semibold mb-6 text-primary">Education</h3>
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <GraduationCap className="w-8 h-8 text-accent"/>
              </div>
              <div>
                <h4 className="font-bold text-xl">B.Tech. in Computer Science (AI/ML Specialization)</h4>
                <p className="text-muted-foreground">Kalasalingam Academy of Research and Education | 2022–2026</p>
                <p className="text-sm text-muted-foreground">CGPA: 7.93/10</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-headline font-semibold mb-6 text-primary">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div key={skill} className="px-3 py-1.5 bg-secondary rounded-full text-sm font-medium text-secondary-foreground transition-all hover:bg-primary hover:text-primary-foreground">
                  {skill}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
