
'use client';

import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Rocket, type LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import type { achievementSchema } from '@/lib/schemas';
import type { z } from 'zod';

type Achievement = z.infer<typeof achievementSchema>;

interface AchievementsProps {
  achievements: Achievement[];
}

const iconMap: { [key: string]: LucideIcon } = {
  Trophy,
  TrendingUp,
  Rocket,
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};


export default function Achievements({ achievements = [] }: AchievementsProps) {
  return (
    <section id="achievements" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-left mb-4">
            Key Achievements
          </h2>
          <p className="text-left text-muted-foreground mb-16 text-lg">
            A snapshot of my competitive successes and recognitions in the tech field.
          </p>
        </motion.div>
        <motion.div 
            className="grid md:grid-cols-1 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
          {achievements.map((item) => {
            const Icon = iconMap[item.icon] || Trophy;

            return (
                <motion.div
                    key={item.title}
                    variants={cardVariants}
                >
                    <Card className="h-full flex flex-col bg-card border overflow-hidden group transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 text-center">
                        <CardHeader className="items-center">
                            <div className="p-4 bg-primary/10 rounded-full mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                                <Icon className="w-8 h-8 text-primary"/>
                            </div>
                            <CardTitle className="font-headline text-xl tracking-tight">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{item.description}</CardDescription>
                        </CardContent>
                    </Card>
                </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
}
