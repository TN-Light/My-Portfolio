import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  impact: z.string(),
  threeSceneType: z.enum(['sphere', 'torusKnot', 'octahedron']),
  keyResearch: z.string().optional(),
});

export const experienceSchema = z.object({
  role: z.string(),
  company: z.string(),
  date: z.string(),
  description: z.string(),
});

export const certificationSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const researchImplementationSchema = z.object({
  title: z.string(),
  description: z.string(),
  githubUrl: z.string().url(),
  tags: z.array(z.string()),
});

export const portfolioSchema = z.object({
  skills: z.array(z.string()),
  projects: z.array(projectSchema),
  experiences: z.array(experienceSchema),
  certifications: z.array(certificationSchema),
  researchImplementations: z.array(researchImplementationSchema).optional(),
});
