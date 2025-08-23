
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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


interface Theme {
    primary: string;
    background: string;
    description: string;
}

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const defaultTheme: Theme = {
    primary: '#171717',
    background: '#FFFFFF',
    description: 'Original Light',
}

const ThemeContext = createContext<ThemeContextType>({
    theme: defaultTheme,
    setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('theme-cyberpunk');

        const backgroundHsl = hexToHsl(theme.background);
        const primaryHsl = hexToHsl(theme.primary);
        
        root.style.setProperty('--background', backgroundHsl);
        root.style.setProperty('--primary', primaryHsl);
        
        if (theme.description?.toLowerCase().includes('cyberpunk')) {
            root.classList.add('theme-cyberpunk');
            const accentHsl = theme.primary ? hexToHsl(theme.primary) : primaryHsl;
            root.style.setProperty('--accent', accentHsl);
        } else {
            const accentHsl = primaryHsl; 
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
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
