'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Loader2, Bot } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { getChatbotResponse } from '@/app/actions';
import type { portfolioSchema } from '@/lib/schemas';
import type { z } from 'zod';

type PortfolioData = z.infer<typeof portfolioSchema>;

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface ChatbotProps {
    portfolioData: PortfolioData;
}

export default function Chatbot({ portfolioData }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
        setIsLoading(true);
        setTimeout(() => {
            setMessages([
              { role: 'model', content: "Hi! I'm AI Abhilash, your personal guide to this portfolio. Feel free to ask me anything about Abhilash's skills, projects, or experience." },
            ]);
            setIsLoading(false);
        }, 1000);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatbotResponse({
          portfolioData,
          messages: [...messages, userMessage],
      });
      setMessages((prev) => [...prev, { role: 'model', content: response.content }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages((prev) => [...prev, { role: 'model', content: "Sorry, I seem to be having some trouble right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed bottom-24 right-6 w-full max-w-sm h-[70vh] bg-card border rounded-xl shadow-2xl flex flex-col z-50"
          >
            <header className="p-4 border-b flex justify-between items-center">
              <h3 className="font-headline text-lg flex items-center gap-2">
                <Bot className="w-6 h-6 text-primary" />
                AI Abhilash
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </header>
            <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-end gap-2',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'model' && <Bot className="w-6 h-6 text-primary shrink-0" />}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={cn(
                        'max-w-xs px-4 py-2 rounded-xl text-sm',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary'
                      )}
                    >
                      {message.content}
                    </motion.div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-end gap-2 justify-start">
                    <Bot className="w-6 h-6 text-primary shrink-0" />
                    <motion.div
                        className="max-w-xs px-4 py-3 rounded-xl bg-secondary flex items-center"
                    >
                       <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    </motion.div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <footer className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my projects..."
                  className="flex-grow"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="icon"
          className="w-14 h-14 rounded-full shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
        </Button>
      </motion.div>
    </>
  );
}
