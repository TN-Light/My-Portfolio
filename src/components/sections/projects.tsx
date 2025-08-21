'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ThreeScene from '@/components/three-scene';

const projects = [
  {
    title: 'Multi-Agent Conversational Search System',
    description: 'Built production-ready conversational search using LangGraph + CrewAI orchestration with hybrid retrieval, graph RAG, and self-reflective query decomposition.',
    tags: ['LangGraph', 'CrewAI', 'RAG', 'Orchestration'],
    impact: '65% improvement in search relevance, 40% faster query resolution.',
    threeType: 'cube'
  },
  {
    title: 'AI-Native Developer Experience Platform',
    description: 'Developed specialized AI agents and MCP servers for automated code generation, context-aware debugging, and intelligent documentation using AutoGen framework.',
    tags: ['AutoGen', 'MCP', 'Code Generation', 'AI Agents'],
    impact: '50% reduction in development time, automated 80% of testing workflows.',
    threeType: 'sphere'
  },
  {
    title: 'Hydro Nexus – Agentic IoT Data Governance',
    description: 'Created multi-agent system for autonomous data pipeline management, quality monitoring, and predictive analytics using CrewAI orchestration.',
    tags: ['CrewAI', 'IoT', 'Data Governance', 'Multi-agent'],
    impact: 'Advanced to EDII-TN finals; autonomous agents reduced manual intervention by 70%.',
    threeType: 'torus'
  },
];

export default function Projects() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="projects" className="min-h-screen py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-center mb-4">
            AI Project <span className="text-primary">Highlights</span>
          </h2>
          <p className="text-center max-w-3xl mx-auto text-muted-foreground mb-16 text-lg">
            A selection of projects where I've translated cutting-edge AI research into production-ready systems.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm border-border overflow-hidden group transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20">
                <div className="h-64 w-full relative">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-card/80 to-transparent"></div>
                  <div className="h-full w-full opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    <ThreeScene type={project.threeType as "cube" | "sphere" | "torus"} />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Impact:</h4>
                    <p className="text-sm text-muted-foreground">{project.impact}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
