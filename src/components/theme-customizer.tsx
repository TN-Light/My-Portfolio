
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Loader2, Wand2, X } from 'lucide-react';
import { Button } from './ui/button';
import { getPaletteSuggestions } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useToast } from '@/hooks/use-toast';

interface Palette {
  primaryColor: string;
  backgroundColor: string;
  accentColor: string;
  description?: string;
}

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
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const { toast } = useToast();

  const handleGeneratePalettes = async () => {
    setIsLoading(true);
    setPalettes([]);
    try {
        const currentStyle = getComputedStyle(document.documentElement);
        // These are assumed to be in HSL string format "H S% L%"
        const primaryHsl = currentStyle.getPropertyValue('--primary').trim();
        const backgroundHsl = currentStyle.getPropertyValue('--background').trim();
        const accentHsl = currentStyle.getPropertyValue('--accent').trim();

        // This is a simplified conversion and might not be perfectly accurate
        // A proper HSL to Hex conversion is needed for the AI input
        const tempPrimaryHex = '#A729F0'; 
        const tempBackgroundHex = '#222222';
        const tempAccentHex = '#34D1C8';

        const result = await getPaletteSuggestions({
            primaryColor: tempPrimaryHex,
            backgroundColor: tempBackgroundHex,
            accentColor: tempAccentHex,
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
  
  const applyPalette = (palette: Palette) => {
    const root = document.documentElement;
    root.style.setProperty('--primary', hexToHsl(palette.primaryColor));
    root.style.setProperty('--background', hexToHsl(palette.backgroundColor));
    // For simplicity, we might derive other colors or just set the main ones
    root.style.setProperty('--secondary', hexToHsl(palette.accentColor)); // Example: mapping accent to secondary
    root.style.setProperty('--accent', hexToHsl(palette.accentColor));
    
    // We need to decide how to handle light vs dark mode consistently
    const isDark = (hexToHsl(palette.backgroundColor).split(' ')[2].replace('%','')) < '50';
    if(isDark) {
        root.classList.add('dark');
        root.style.setProperty('--foreground', '0 0% 98%');
        root.style.setProperty('--primary-foreground', '240 5.9% 10%');
        root.style.setProperty('--card', '240 10% 3.9%');
    } else {
        root.classList.remove('dark');
        root.style.setProperty('--foreground', '0 0% 3.9%');
        root.style.setProperty('--primary-foreground', '0 0% 98%');
        root.style.setProperty('--card', '0 0% 100%');
    }

    toast({ title: "Theme Applied!", description: palette.description || "The new color palette has been applied." });
  }

  return (
    <>
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-20 right-6 z-50"
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
            className="fixed bottom-[140px] right-6 w-full max-w-sm bg-card border rounded-xl shadow-2xl flex flex-col z-50"
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
                    {palettes.map((palette, index) => (
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
                                <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: palette.accentColor }} />
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
