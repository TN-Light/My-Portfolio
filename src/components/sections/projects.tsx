'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ThreeScene from '@/components/three-scene';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'Multi-Agent Conversational Search System',
    description: 'Built production-ready conversational search using LangGraph + CrewAI orchestration with hybrid retrieval, graph RAG, and self-reflective query decomposition.',
    tags: ['LangGraph', 'CrewAI', 'RAG', 'Orchestration'],
    impact: '65% improvement in search relevance, 40% faster query resolution.',
    threeSceneType: 'sphere' as const,
  },
  {
    title: 'AI-Native Developer Experience Platform',
    description: 'Developed specialized AI agents and MCP servers for automated code generation, context-aware debugging, and intelligent documentation using AutoGen framework.',
    tags: ['AutoGen', 'MCP', 'Code Generation', 'AI Agents'],
    impact: '50% reduction in development time, automated 80% of testing workflows.',
    threeSceneType: 'torusKnot' as const,
  },
  {
    title: 'Hydro Nexus – Agentic IoT Data Governance',
    description: 'Created multi-agent system for autonomous data pipeline management, quality monitoring, and predictive analytics using CrewAI orchestration.',
    tags: ['CrewAI', 'IoT', 'Data Governance', 'Multi-agent'],
    impact: 'Advanced to EDII-TN finals; autonomous agents reduced manual intervention by 70%.',
    threeSceneType: 'octahedron' as const,
  },
];

export default function Projects() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="projects" className="bg-secondary/20">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-center mb-4 tracking-tighter">
            AI Project <span className="text-primary drop-shadow-neon-primary">Highlights</span>
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
              <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm border-border overflow-hidden group transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
                <div className="h-56 w-full relative overflow-hidden bg-secondary/30">
                  <ThreeScene type={project.threeSceneType} />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent"></div>
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl tracking-tight">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between space-y-4">
                  <CardDescription>{project.description}</CardDescription>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Impact:</h4>
                    <p className="text-sm text-muted-foreground">{project.impact}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-16">
            <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:drop-shadow-neon-accent group">
                <a href="https://github.com/TN-Light" target="_blank" rel="noopener noreferrer">
                    View All Projects on GitHub
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
            </Button>
        </div>
      </div>
    </section>
  );
}
