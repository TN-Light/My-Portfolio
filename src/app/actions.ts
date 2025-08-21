'use server';

import { suggestPalette as suggestPaletteFlow, type SuggestPaletteInput, type SuggestPaletteOutput } from '@/ai/flows/suggest-palette';
import { z } from 'zod';
import { contactFormSchema } from '@/lib/schemas';

export async function submitContactForm(data: z.infer<typeof contactFormSchema>) {
  const parsed = contactFormSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: "Invalid form data." };
  }

  try {
    // Here you would integrate with an email sending service like Resend or Nodemailer
    console.log("New contact form submission:", parsed.data);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true, message: "Thank you for your message! I'll get back to you soon." };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, message: "Something went wrong. Please try again later." };
  }
}

export async function getPaletteSuggestions(input: SuggestPaletteInput): Promise<SuggestPaletteOutput> {
  return await suggestPaletteFlow(input);
}
