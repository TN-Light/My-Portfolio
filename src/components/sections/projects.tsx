'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { ArrowUpRight, BookCheck } from 'lucide-react';
import type { projectSchema } from '@/lib/schemas';
import type { z } from 'zod';
import Image from 'next/image';

type Project = z.infer<typeof projectSchema>;

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects = [] }: ProjectsProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="projects" className="bg-background">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-4">
            AI Project Highlights
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
              <Card className="h-full flex flex-col bg-card border overflow-hidden group transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="font-headline text-xl tracking-tight">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between space-y-4">
                  <CardDescription>{project.description}</CardDescription>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Impact:</h4>
                    <p className="text-sm text-muted-foreground">{project.impact}</p>
                  </div>
                   {project.keyResearch && (
                    <div>
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><BookCheck size={18}/> Key Research:</h4>
                        <p className="text-sm text-muted-foreground">{project.keyResearch}</p>
                    </div>
                  )}
                  </CardContent>
                  <CardFooter>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                  </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-16">
            <Button asChild variant="outline" size="lg" className="group">
                <a href="https://github.com/TN-Light?tab=repositories&q=awesome" target="_blank" rel="noopener noreferrer">
                    View AI Research on GitHub
                    <ArrowUpRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
            </Button>
        </div>
      </div>
    </section>
  );
}
