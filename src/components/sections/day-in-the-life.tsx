
'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, Wand2, Coffee, Code, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { getDayInTheLifeStory } from '@/app/actions';
import { Card, CardContent } from '../ui/card';

const icons = [Coffee, Code, BookOpen];

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
};

const storyCardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
};


export default function DayInTheLife() {
  const { toast } = useToast();
  const [topic, setTopic] = useState('building multi-agent systems');
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!topic.trim()) {
        toast({
            variant: 'destructive',
            title: 'Topic is required',
            description: 'Please enter a topic to generate a story.',
        });
        return;
    }
    
    setIsLoading(true);
    setStory('');

    try {
      const result = await getDayInTheLifeStory(topic);
      if (result.story) {
        setStory(result.story);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error generating story',
          description: 'The AI could not generate a story for this topic. Please try another one.',
        });
      }
    } catch (error) {
      console.error('Error generating story:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'An unexpected error occurred. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const storyParts = story.split('---').map(part => part.trim()).filter(part => part);

  return (
    <motion.section 
        id="simulation" 
        className="py-24 bg-secondary"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center"
          variants={sectionVariants}
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-primary" />
            A Day in the Life
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground mb-12 text-lg">
            Curious about my process? Ask the AI to simulate my day working on a specific topic.
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          variants={sectionVariants}
        >
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
            <Input 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., 'optimizing a RAG pipeline'" 
              className="flex-grow bg-background"
              disabled={isLoading}
            />
            <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wand2 className="mr-2 h-5 w-5" />}
              Generate Story
            </Button>
          </form>

          {isLoading && (
             <div className="flex items-center justify-center p-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
             </div>
          )}

          <AnimatePresence>
            {storyParts.length > 0 && (
              <motion.div 
                className="space-y-8"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                {storyParts.map((part, index) => {
                  const [title, ...content] = part.split(':');
                  const Icon = icons[index % icons.length];
                  
                  return (
                    <motion.div
                      key={index}
                      variants={storyCardVariants}
                    >
                      <Card className="bg-background/50 border-dashed overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-primary/10 rounded-full mt-1">
                                <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-headline font-medium text-foreground/80 mb-2">{title}</h3>
                              <p className="text-muted-foreground">{content.join(':').trim()}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}
