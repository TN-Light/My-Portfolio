'use client';

import { useState } from 'react';
import { Wand2, Loader, Palette } from 'lucide-react';
import { getPaletteSuggestions } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { SuggestPaletteOutput } from '@/ai/flows/suggest-palette';

const initialColors = {
  primaryColor: '#a729f0',
  backgroundColor: '#222222',
  accentColor: '#34d1c8',
};

function hexToHsl(hex: string): string {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

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
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export default function PaletteSuggester() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestPaletteOutput | null>(null);
  const { toast } = useToast();

  const handleSuggestPalettes = async () => {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await getPaletteSuggestions(initialColors);
      setSuggestions(result);
    } catch (error) {
      console.error("Failed to get palette suggestions:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate palettes. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const applyPalette = (palette: SuggestPaletteOutput['palettes'][0]) => {
    document.documentElement.style.setProperty('--background', hexToHsl(palette.backgroundColor));
    document.documentElement.style.setProperty('--primary', hexToHsl(palette.primaryColor));
    document.documentElement.style.setProperty('--accent', hexToHsl(palette.accentColor));
  };
  
  const resetPalette = () => {
    document.documentElement.style.setProperty('--background', hexToHsl(initialColors.backgroundColor));
    document.documentElement.style.setProperty('--primary', hexToHsl(initialColors.primaryColor));
    document.documentElement.style.setProperty('--accent', hexToHsl(initialColors.accentColor));
  }

  return (
    <Dialog onOpenChange={(open) => !open && resetPalette()}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary/20 text-primary-foreground hover:bg-primary/40 backdrop-blur-sm rounded-full shadow-lg hover:shadow-primary/50 transition-all duration-300 group"
          aria-label="Suggest Palettes"
        >
          <Palette className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-headline text-2xl">
            <Wand2 className="text-primary" /> AI Palette Suggester
          </DialogTitle>
          <DialogDescription>
            Let AI suggest some alternative color palettes. Click to preview.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Button onClick={handleSuggestPalettes} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate New Palettes'
            )}
          </Button>
        </div>
        {suggestions && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestions.palettes.map((palette, index) => (
              <Card 
                key={index} 
                className="p-4 cursor-pointer hover:border-primary transition-colors"
                onClick={() => applyPalette(palette)}
              >
                <h3 className="font-bold text-lg mb-2">Option {index + 1}</h3>
                <p className="text-sm text-muted-foreground mb-4 h-10">{palette.description}</p>
                <div className="flex justify-around">
                  <div className="w-10 h-10 rounded-full border border-border" style={{ backgroundColor: palette.backgroundColor }} />
                  <div className="w-10 h-10 rounded-full border border-border" style={{ backgroundColor: palette.primaryColor }} />
                  <div className="w-10 h-10 rounded-full border border-border" style={{ backgroundColor: palette.accentColor }} />
                </div>
              </Card>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
