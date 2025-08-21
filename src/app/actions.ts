'use server';

import { suggestPalette as suggestPaletteFlow, type SuggestPaletteInput, type SuggestPaletteOutput } from '@/ai/flows/suggest-palette';
import { z } from 'zod';
import { contactFormSchema, portfolioSchema } from '@/lib/schemas';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDoc, doc } from 'firebase/firestore';

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

    return { success: true, message: "Thank you for your message! I'll get back to you soon." };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, message: "Something went wrong. Please try again later." };
  }
}

export async function getPaletteSuggestions(input: SuggestPaletteInput): Promise<SuggestPaletteOutput> {
  return await suggestPaletteFlow(input);
}

export async function getPortfolioData(): Promise<z.infer<typeof portfolioSchema> | null> {
  try {
    const docRef = doc(db, "portfolio", "content");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = portfolioSchema.parse(docSnap.data());
      return data;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return null;
  }
}
