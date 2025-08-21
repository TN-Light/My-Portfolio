'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import ThreeScene from '@/components/three-scene';

export default function About() {
  const skills = ['React', 'Next.js', 'Three.js', 'Node.js', 'TypeScript', 'GLSL', 'Figma', 'Blender'];

  return (
    <section id="about" className="min-h-screen py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-center mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-center max-w-3xl mx-auto text-muted-foreground mb-16 text-lg">
            I'm a passionate creative developer who blends code with artistry to build immersive digital experiences.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <motion.div
            className="md:col-span-2 h-96 w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <Card className="w-full h-full bg-card/50">
              <ThreeScene type="avatar" />
            </Card>
          </motion.div>

          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-headline font-semibold mb-4">Who I Am</h3>
            <p className="text-muted-foreground mb-6">
              Hello! I'm a developer and 3D enthusiast with a keen eye for design and a love for bringing ideas to life on the web. My journey started with a simple "Hello, World!" and has since evolved into creating complex, interactive 3D applications. I thrive on challenges and am constantly learning new technologies to push the boundaries of what's possible.
            </p>
            <h3 className="text-3xl font-headline font-semibold mb-4">My Skills</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <div key={skill} className="px-4 py-2 bg-secondary rounded-full text-sm font-medium text-secondary-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:scale-105">
                  {skill}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
