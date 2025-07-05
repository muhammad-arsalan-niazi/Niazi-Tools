'use server';
/**
 * @fileOverview An AI flow to extract names and emails from text.
 *
 * - extractData - A function that takes a block of text and returns associated names and emails.
 * - ExtractDataInput - The input type for the extractData function.
 * - ExtractDataOutput - The return type for the extractData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ExtractDataInputSchema = z.object({
  text: z.string().describe('A block of text to extract data from.'),
});
export type ExtractDataInput = z.infer<typeof ExtractDataInputSchema>;

const ExtractDataOutputSchema = z.object({
  extractions: z.array(
    z.object({
      name: z
        .string()
        .describe(
          'The full name of the person or entity associated with the email. If no name is found, return an empty string.'
        ),
      email: z.string().describe('The extracted email address.'),
    })
  ).describe('An array of extracted name and email pairs.'),
});
export type ExtractDataOutput = z.infer<typeof ExtractDataOutputSchema>;

export async function extractData(input: ExtractDataInput): Promise<ExtractDataOutput> {
  return extractDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractDataPrompt',
  input: {schema: ExtractDataInputSchema},
  output: {schema: ExtractDataOutputSchema},
  prompt: `You are an expert data extraction agent. Your task is to extract names and email addresses from the provided text.

- Review the text carefully.
- For each email address you find, identify the associated full name of the person or company.
- If a name is not clearly associated with an email, you can leave the name field blank.
- Return ONLY the extracted data in the specified JSON format. Do not add any extra commentary or explanations.

Here is the text to process:
{{{text}}}
`,
});

const extractDataFlow = ai.defineFlow(
  {
    name: 'extractDataFlow',
    inputSchema: ExtractDataInputSchema,
    outputSchema: ExtractDataOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return any output.');
    }
    return output;
  }
);
