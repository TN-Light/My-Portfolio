'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ThreeScene from '@/components/three-scene';

const projects = [
  {
    title: 'Project Alpha',
    description: 'An interactive data visualization tool built with D3.js and React, showcasing complex datasets in an intuitive way.',
    projectUrl: '#',
    threeType: 'cube'
  },
  {
    title: 'Project Beta',
    description: 'A futuristic e-commerce platform featuring a unique 3D product viewer and a seamless checkout experience.',
    projectUrl: '#',
    threeType: 'sphere'
  },
  {
    title: 'Project Gamma',
    description: 'A generative art installation that creates unique visual masterpieces based on user input and real-time data.',
    projectUrl: '#',
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
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-center max-w-3xl mx-auto text-muted-foreground mb-16 text-lg">
            Here are some of the projects I'm proud of. Each one is a testament to my passion for creating beautiful and functional web experiences.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-card/50 to-transparent"></div>
                  <div className="h-full w-full opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    <ThreeScene type={project.threeType as "cube" | "sphere" | "torus"} />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow"></CardContent>
                <CardFooter>
                  <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 group-hover:drop-shadow-neon-accent">
                      View Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
