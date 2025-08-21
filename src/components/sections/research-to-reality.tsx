'use client';

import { motion } from 'framer-motion';
import { Github, FileText, Cpu, Lightbulb } from 'lucide-react';
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
    <section id="research" className="bg-background">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-center mb-4 tracking-tighter">
            From Research to <span className="text-primary drop-shadow-neon-primary">Reality</span>
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
                >
                <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm border-border overflow-hidden group transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
                    <CardHeader className="flex-row gap-4 items-center">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <Icon className="w-6 h-6 text-primary"/>
                        </div>
                        <CardTitle className="font-headline text-2xl tracking-tight flex-1">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription>{item.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-4">
                        <div className="flex flex-wrap gap-2">
                            {item.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                        </div>
                        <Button asChild variant="link" className="p-0 h-auto text-accent hover:text-accent/80">
                            <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" />
                                View on GitHub
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
