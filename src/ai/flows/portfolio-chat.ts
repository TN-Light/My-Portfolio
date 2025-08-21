'use server';

/**
 * @fileOverview An AI agent that can answer questions about Abhilash's portfolio.
 * 
 * - portfolioChat - A function that handles the chat interaction.
 * - PortfolioChatInput - The input type for the portfolioChat function.
 * - PortfolioChatOutput - The return type for the portfolioChat function.
 */

import { ai } from '@/ai/genkit';
import { PortfolioChatInputSchema, PortfolioChatOutputSchema, type PortfolioChatInput, type PortfolioChatOutput } from '@/lib/schemas';


export async function portfolioChat(input: PortfolioChatInput): Promise<PortfolioChatOutput> {
  return portfolioChatFlow(input);
}

const prompt = ai.definePrompt({
    name: 'portfolioChatPrompt',
    input: { schema: PortfolioChatInputSchema },
    output: { schema: PortfolioChatOutputSchema },
    prompt: `You are "AI Abhilash", a helpful and friendly AI assistant for the portfolio website of Abhilash, an AI-Native Developer.

Your goal is to answer questions from visitors and potential employers based *only* on the information provided in the portfolio data below. Be conversational and engaging.

If a question is outside the scope of the provided data, politely decline to answer and state that you can only answer questions about Abhilash's skills, projects, and experience.

Here is Abhilash's portfolio data:
\`\`\`json
{{{json portfolioData}}}
\`\`\`

Here is the current conversation history:
{{#each messages}}
{{role}}: {{content}}
{{/each}}
Model:`,
});

const portfolioChatFlow = ai.defineFlow(
  {
    name: 'portfolioChatFlow',
    inputSchema: PortfolioChatInputSchema,
    outputSchema: PortfolioChatOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
