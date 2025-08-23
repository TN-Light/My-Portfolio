'use server';

import { suggestPalette as suggestPaletteFlow } from '@/ai/flows/suggest-palette';
import { portfolioChat as portfolioChatFlow } from '@/ai/flows/portfolio-chat';
import { dayInTheLife as dayInTheLifeFlow } from '@/ai/flows/day-in-the-life';
import { z } from 'zod';
import { contactFormSchema, portfolioSchema, type PortfolioChatInput, type PortfolioChatOutput, DayInTheLifeInputSchema, DayInTheLifeOutputSchema, type DayInTheLifeOutput, type SuggestPaletteInput, type SuggestPaletteOutput } from '@/lib/schemas';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { Resend } from 'resend';

export async function submitContactForm(data: z.infer<typeof contactFormSchema>) {
  const parsed = contactFormSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: "Invalid form data." };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // 1. Save to Firestore
    await addDoc(collection(db, "contactSubmissions"), {
      ...parsed.data,
      submittedAt: serverTimestamp(),
    });

    // 2. Send email notification via Resend
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Must be a verified domain in Resend
      to: 'venkatabhilash432004@gmail.com', // Your personal email
      subject: `New Contact Form Submission from ${parsed.data.name}`,
      html: `
          <h1>New Contact Submission</h1>
          <p><strong>Name:</strong> ${parsed.data.name}</p>
          <p><strong>Email:</strong> ${parsed.data.email}</p>
          <p><strong>Message:</strong></p>
          <p>${parsed.data.message}</p>
      `,
    });


    return { success: true, message: "Thank you for your message! I'll get back to you soon." };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, message: "Something went wrong. Please try again later." };
  }
}

export async function getPaletteSuggestions(input: SuggestPaletteInput): Promise<SuggestPaletteOutput> {
  return await suggestPaletteFlow(input);
}

export async function getChatbotResponse(input: PortfolioChatInput): Promise<PortfolioChatOutput> {
  return await portfolioChatFlow(input);
}

export async function getDayInTheLifeStory(topic: string): Promise<DayInTheLifeOutput> {
  return await dayInTheLifeFlow(topic);
}

export async function getPortfolioData() {
    try {
      const portfolioDocRef = doc(db, 'portfolio', 'data');
      const portfolioDoc = await getDoc(portfolioDocRef);
  
      if (!portfolioDoc.exists()) {
        console.error("Portfolio document not found!");
        return { success: false, error: "Portfolio data not found in database." };
      }
      
      const data = portfolioSchema.parse(portfolioDoc.data());
      return { success: true, data };
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
      if (error instanceof z.ZodError) {
        return { success: false, error: "Data in database is malformed.", details: error.issues };
      }
      return { success: false, error: "Could not fetch portfolio data from database." };
    }
}
