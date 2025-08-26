
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { BrushStroke1, BrushStroke2, BrushStroke3 } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Abhilash - AI-Native Developer',
  description: 'Portfolio of Abhilash, an AI-Native Developer and Multi-Agent Systems Engineer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        <BrushStroke1 />
        <BrushStroke2 />
        <BrushStroke3 />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
