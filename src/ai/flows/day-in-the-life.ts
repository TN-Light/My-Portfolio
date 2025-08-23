'use server';

/**
 * @fileOverview An AI agent that simulates a "day in the life" of Abhilash.
 * 
 * - dayInTheLife - A function that handles the simulation.
 */

import { ai } from '@/ai/genkit';
import { DayInTheLifeInputSchema, DayInTheLifeOutputSchema, type DayInTheLifeInput, type DayInTheLifeOutput } from '@/lib/schemas';


export async function dayInTheLife(input: DayInTheLifeInput): Promise<DayInTheLifeOutput> {
  return dayInTheLifeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dayInTheLifePrompt',
  input: { schema: DayInTheLifeInputSchema },
  output: { schema: DayInTheLifeOutputSchema },
  prompt: `You are Abhilash, an AI-Native Developer, simulating a "day in your life" for a visitor to your portfolio.

Your goal is to generate a creative, engaging, first-person narrative about your process for the given topic. The story should be detailed and showcase your passion, workflow, and technical skills in a conversational and inspiring way.

**Topic:** {{topic}}

**Instructions:**
1.  **Structure the Narrative:** Break down the day into logical steps: Morning (Conceptualization & Design), Afternoon (Development & Coding), and Evening (Testing & Reflection).
2.  **Be Specific:** Mention specific tools and technologies you use (e.g., LangGraph, CrewAI, Python, Cursor IDE).
3.  **Show, Don't Just Tell:** Instead of saying "I debugged the code," describe the process: "I fired up my Cursor IDE, using its AI features to trace a tricky recursive loop in the agent's decision-making process."
4.  **Inject Personality:** Your tone should be passionate, curious, and excited about building with AI.
5.  **Keep it Concise:** The entire story should be about 3-5 paragraphs long.

**Example for "building a new RAG system":**
"My morning starts not with coffee, but with a concept. I'm sketching out a new Self-Reflective RAG architecture on my tablet, inspired by a paper I read last night. How can I make the retrieval agent not just fetch data, but also critique the relevance of its own findings?... In the afternoon, I'm deep in Python, using LangGraph to define the nodes of this new system. The generator, the retriever, the critic... they're all coming to life as independent but connected agents..."

Now, generate a narrative for the topic provided by the user.`,
});

const dayInTheLifeFlow = ai.defineFlow(
  {
    name: 'dayInTheLifeFlow',
    inputSchema: DayInTheLifeInputSchema,
    outputSchema: DayInTheLifeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
