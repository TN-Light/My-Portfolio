
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Loader2, Wand2, X } from 'lucide-react';
import { Button } from './ui/button';
import { getPaletteSuggestions } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import type { SuggestPaletteOutput } from '@/lib/schemas';
import { useTheme } from '@/hooks/use-theme';

interface Palette {
  primaryColor: string;
  backgroundColor: string;
  description?: string;
  accentColor?: string;
}

const predefinedPalettes: Palette[] = [
    {
        description: 'Cyberpunk',
        primaryColor: '#39FF14', 
        backgroundColor: '#000000', 
        accentColor: '#39FF14',
    },
    {
        description: 'Original Light',
        primaryColor: '#171717', // hsl(0 0% 9%)
        backgroundColor: '#FFFFFF', // hsl(0 0% 100%)
    },
    {
        description: 'Original Dark',
        primaryColor: '#FAFAFA', // hsl(0 0% 98%)
        backgroundColor: '#09090B', // hsl(240 10% 3.9%)
    },
];

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [palettes, setPalettes] = useState<SuggestPaletteOutput['palettes']>([]);
  const { setTheme } = useTheme();

  const handleGeneratePalettes = async () => {
    setIsLoading(true);
    setPalettes([]);
    try {
        const tempPrimaryHex = '#A729F0'; 
        const tempBackgroundHex = '#222222';

        const result = await getPaletteSuggestions({
            primaryColor: tempPrimaryHex,
            backgroundColor: tempBackgroundHex,
        });

        if (result.palettes) {
            setPalettes(result.palettes);
        } else {
             // You can add a toast notification here if you have one
        }
    } catch (error) {
        console.error('Failed to generate palettes:', error);
    } finally {
        setIsLoading(false);
    }
  };
  
  const allPalettes = [...predefinedPalettes, ...palettes];

  return (
    <>
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-28 z-50"
        >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                    size="icon"
                    className="w-14 h-14 rounded-full shadow-lg bg-background text-primary backdrop-blur-sm border hover:bg-background"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Customize Theme"
                    >
                    {isOpen ? <X className="w-6 h-6" /> : <Palette className="w-6 h-6" />}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>AI Theme Customizer</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
        </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed bottom-24 right-6 w-full max-w-sm bg-card border rounded-xl shadow-2xl flex flex-col z-50"
          >
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Wand2 className="w-6 h-6 text-primary" />
                    AI Theme Generator
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Button onClick={handleGeneratePalettes} disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Wand2 className="w-5 h-5 mr-2" />}
                    {isLoading ? 'Generating...' : 'Suggest New Palettes'}
                </Button>
                
                <div className="space-y-4">
                    {allPalettes.map((palette, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 border rounded-lg cursor-pointer hover:border-primary"
                            onClick={() => setTheme({ primary: palette.primaryColor, background: palette.backgroundColor, description: palette.description || '' })}
                        >
                            <p className="font-semibold text-sm mb-2">{palette.description}</p>
                            <div className="flex gap-2">
                                <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: palette.primaryColor }} />
                                <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: palette.backgroundColor }} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

    