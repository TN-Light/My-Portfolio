'use server';

import { suggestPalette as suggestPaletteFlow, type SuggestPaletteInput, type SuggestPaletteOutput } from '@/ai/flows/suggest-palette';
import { portfolioChat as portfolioChatFlow } from '@/ai/flows/portfolio-chat';
import { dayInTheLife as dayInTheLifeFlow } from '@/ai/flows/day-in-the-life';
import { z } from 'zod';
import { contactFormSchema, portfolioSchema, type PortfolioChatInput, type PortfolioChatOutput, DayInTheLifeInputSchema, DayInTheLifeOutputSchema, type DayInTheLifeInput, type DayInTheLifeOutput } from '@/lib/schemas';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import nodemailer from 'nodemailer';

export async function submitContactForm(data: z.infer<typeof contactFormSchema>) {
  const parsed = contactFormSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: "Invalid form data." };
  }

  try {
    await addDoc(collection(db, "contactSubmissions"), {
      ...parsed.data,
      submittedAt: serverTimestamp(),
    });

    // Send email notification
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: 'New Portfolio Contact Form Submission',
      html: `
        <h1>New Contact Form Submission</h1>
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

export async function getDayInTheLifeStory(input: DayInTheLifeInput): Promise<DayInTheLifeOutput> {
  return await dayInTheLifeFlow(input);
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
