
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Loader2, Wand2, X } from 'lucide-react';
import { Button } from './ui/button';
import { getPaletteSuggestions } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import type { SuggestPaletteOutput, SuggestPaletteInput } from '@/lib/schemas';

interface Palette {
  primaryColor: string;
  backgroundColor: string;
  description?: string;
  accentColor?: string;
}

// Predefined palettes
const predefinedPalettes: Palette[] = [
  {
    description: 'Cyberpunk',
    primaryColor: '#39FF14', // Neon Green
    backgroundColor: '#000000', // Black
    accentColor: '#39FF14',
  },
];


// Function to convert hex to HSL string
function hexToHsl(hex: string): string {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `${h} ${s}% ${l}%`;
}


export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [palettes, setPalettes] = useState<SuggestPaletteOutput['palettes']>([]);
  const { toast } = useToast();

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
             toast({ variant: 'destructive', title: 'Error', description: 'Could not generate palettes.' });
        }
    } catch (error) {
        console.error('Failed to generate palettes:', error);
        toast({ variant: 'destructive', title: 'Error', description: 'An unexpected error occurred.' });
    } finally {
        setIsLoading(false);
    }
  };
  
  const applyPalette = (palette: SuggestPaletteOutput['palettes'][number]) => {
    const root = document.documentElement;
    root.classList.remove('theme-cyberpunk');
  
    const backgroundHsl = hexToHsl(palette.backgroundColor);
    const primaryHsl = hexToHsl(palette.primaryColor);
    
    root.style.setProperty('--background', backgroundHsl);
    root.style.setProperty('--primary', primaryHsl);
    
    // Add theme-specific class and accent
    if (palette.description?.toLowerCase().includes('cyberpunk')) {
      root.classList.add('theme-cyberpunk');
      const accentHsl = palette.primaryColor ? hexToHsl(palette.primaryColor) : primaryHsl;
      root.style.setProperty('--accent', accentHsl);
    } else {
      const accentHsl = primaryHsl; // Default accent
      root.style.setProperty('--accent', accentHsl);
    }

    const l = parseFloat(backgroundHsl.split(' ')[2]);
    const isDark = l < 50;

    if (isDark) {
      root.classList.add('dark');
      root.style.setProperty('--foreground', '0 0% 98%');
      root.style.setProperty('--primary-foreground', '240 5.9% 10%');
      root.style.setProperty('--card', '240 10% 3.9%');
      root.style.setProperty('--card-foreground', '0 0% 98%');
      root.style.setProperty('--secondary', '240 3.7% 15.9%');
      root.style.setProperty('--secondary-foreground', '0 0% 98%');
      root.style.setProperty('--muted', '240 3.7% 15.9%');
      root.style.setProperty('--muted-foreground', '240 5% 64.9%');
      root.style.setProperty('--border', '240 3.7% 15.9%');
      root.style.setProperty('--input', '240 3.7% 15.9%');
      root.style.setProperty('--ring', '0 0% 98%');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--foreground', '0 0% 3.9%');
      root.style.setProperty('--primary-foreground', '0 0% 98%');
      root.style.setProperty('--card', '0 0% 100%');
      root.style.setProperty('--card-foreground', '0 0% 3.9%');
      root.style.setProperty('--secondary', '0 0% 96.1%');
      root.style.setProperty('--secondary-foreground', '0 0% 9%');
      root.style.setProperty('--muted', '0 0% 96.1%');
      root.style.setProperty('--muted-foreground', '0 0% 45.1%');
      root.style.setProperty('--border', '0 0% 89.8%');
      root.style.setProperty('--input', '0 0% 89.8%');
      root.style.setProperty('--ring', '0 0% 3.9%');
    }
  }

  const allPalettes = [...predefinedPalettes, ...palettes];

  return (
    <>
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 left-6 z-50"
        >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                    size="icon"
                    className="w-12 h-12 rounded-full shadow-lg"
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
            className="fixed bottom-24 left-6 w-full max-w-sm bg-card border rounded-xl shadow-2xl flex flex-col z-50"
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
                            onClick={() => applyPalette(palette)}
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

    