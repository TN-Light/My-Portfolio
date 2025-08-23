'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { getDayInTheLifeStory } from '@/app/actions';
import { Card, CardContent } from '../ui/card';

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
      const result = await getDayInTheLifeStory({ topic });
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

  return (
    <section id="simulation" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center"
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
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
            <Input 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., 'optimizing a RAG pipeline'" 
              className="flex-grow"
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

          {story && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Card className="bg-secondary/50 border-dashed">
                    <CardContent className="p-6">
                        <div className="prose prose-neutral dark:prose-invert max-w-none text-left">
                            {story.split('\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
}
