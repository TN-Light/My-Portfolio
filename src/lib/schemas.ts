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

export const achievementSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
});

export const portfolioSchema = z.object({
  skills: z.array(z.string()),
  projects: z.array(projectSchema),
  experiences: z.array(experienceSchema),
  certifications: z.array(certificationSchema),
  researchImplementations: z.array(researchImplementationSchema).optional(),
  achievements: z.array(achievementSchema).optional(),
});


// Chatbot Schemas
const MessageSchema = z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
});

export const PortfolioChatInputSchema = z.object({
  portfolioData: portfolioSchema.describe("JSON object containing all the portfolio data for Abhilash."),
  messages: z.array(MessageSchema).describe("The history of the conversation so far."),
});
export type PortfolioChatInput = z.infer<typeof PortfolioChatInputSchema>;

export const PortfolioChatOutputSchema = z.object({
  content: z.string().describe("The AI's response to the user."),
});
export type PortfolioChatOutput = z.infer<typeof PortfolioChatOutputSchema>;


// Day in the Life Schemas
export const DayInTheLifeInputSchema = z.object({
  topic: z.string().describe("The user's question or topic for the simulation, e.g., 'building multi-agent systems'."),
});
export type DayInTheLifeInput = z.infer<typeof DayInTheLifeInputSchema>;

export const DayInTheLifeOutputSchema = z.object({
  story: z.string().describe("The AI-generated narrative of a day in the life."),
});
export type DayInTheLifeOutput = z.infer<typeof DayInTheLifeOutputSchema>;
