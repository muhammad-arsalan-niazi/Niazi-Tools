'use server';
/**
 * @fileOverview An AI flow to clean up text lines by fixing grammar and spelling.
 *
 * - cleanupLines - A function that takes an array of strings and returns the cleaned-up version.
 * - CleanupLinesInput - The input type for the cleanupLines function.
 * - CleanupLinesOutput - The return type for the cleanupLines function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CleanupLinesInputSchema = z.object({
  lines: z.array(z.string()).describe('An array of text lines to clean up.'),
});
export type CleanupLinesInput = z.infer<typeof CleanupLinesInputSchema>;

const CleanupLinesOutputSchema = z.object({
  cleanedLines: z.array(z.string()).describe('The array of cleaned-up text lines.'),
});
export type CleanupLinesOutput = z.infer<typeof CleanupLinesOutputSchema>;

export async function cleanupLines(input: CleanupLinesInput): Promise<CleanupLinesOutput> {
  return cleanupLinesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cleanupLinesPrompt',
  input: {schema: CleanupLinesInputSchema},
  output: {schema: CleanupLinesOutputSchema},
  prompt: `You are an expert copy editor. Your task is to correct spelling and grammar mistakes in the provided lines of text.

- Review each line carefully.
- Correct any errors you find.
- Preserve the original number of lines and their order.
- Return ONLY the corrected text for each line in the specified JSON format. Do not add any extra commentary or explanations.

Here are the lines to process:
{{#each lines}}
- {{{this}}}
{{/each}}
`,
});

const cleanupLinesFlow = ai.defineFlow(
  {
    name: 'cleanupLinesFlow',
    inputSchema: CleanupLinesInputSchema,
    outputSchema: CleanupLinesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return any output.');
    }
    // Basic validation to ensure the output matches the input line count.
    if (output.cleanedLines.length !== input.lines.length) {
      console.warn('AI returned a different number of lines. Returning original lines.');
      return { cleanedLines: input.lines };
    }
    return output;
  }
);
