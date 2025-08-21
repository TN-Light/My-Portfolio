'use client';

import { motion } from 'framer-motion';
import { Github, FileText, Cpu, Lightbulb, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import type { researchImplementationSchema } from '@/lib/schemas';
import type { z } from 'zod';

type Implementation = z.infer<typeof researchImplementationSchema>;

interface ResearchToRealityProps {
  implementations: Implementation[];
}

const iconMap = {
    'Self-Correction': Lightbulb,
    'Multi-Agent': Cpu,
    'Zero-shot Learning': FileText,
}

export default function ResearchToReality({ implementations = [] }: ResearchToRealityProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="research" className="bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-4">
            From Research to Reality
          </h2>
          <p className="text-center max-w-3xl mx-auto text-muted-foreground mb-16 text-lg">
            I specialize in bridging the gap between academic theory and practical application. Here's how I've implemented key AI research concepts into tangible, open-source projects.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {implementations.map((item, index) => {
            const Icon = iconMap[item.tags[0] as keyof typeof iconMap] || FileText;

            return (
                <motion.div
                key={item.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
                >
                <Card className="h-full flex flex-col bg-card border overflow-hidden group transition-all duration-300 hover:border-primary hover:shadow-lg">
                    <CardHeader className="flex-row gap-4 items-center">
                        <div className="p-3 bg-secondary rounded-lg">
                            <Icon className="w-6 h-6 text-primary"/>
                        </div>
                        <CardTitle className="font-headline text-xl tracking-tight flex-1">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription>{item.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-4">
                        <div className="flex flex-wrap gap-2">
                            {item.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                        </div>
                        <Button asChild variant="link" className="p-0 h-auto text-primary group/link">
                            <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" />
                                View on GitHub
                                <motion.div 
                                  whileHover={{ x: 2, y: -2 }}
                                  transition={{ type: 'spring', stiffness: 300 }}
                                >
                                  <ArrowUpRight className="ml-1 h-4 w-4" />
                                </motion.div>
                            </a>
                        </Button>
                    </CardFooter>
                </Card>
                </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
