import fs from 'fs';
import path from 'path';

const tools = [
  { id: 'copyable', name: 'Copyable Lines', desc: 'Convert text into individual, easy-to-copy lines instantly.' },
  { id: 'copyable-paragraphs', name: 'Copyable Paragraphs', desc: 'Add or upload distinct blocks of text to create a list of copyable paragraphs.' },
  { id: 'find-replace', name: 'Find & Replace', desc: 'A powerful tool to find and replace text in bulk across large documents.' },
  { id: 'data-extractor', name: 'Email Extractor', desc: 'Extract all email addresses from messy text or files in one click.' },
  { id: 'phone-extractor', name: 'Phone Number Extractor', desc: 'Quickly find and extract phone numbers from any text or Excel file.' },
  { id: 'query-generator', name: 'Query Generator', desc: 'Generate location-based search queries for local SEO and marketing.' },
  { id: 'time-interval-generator', name: 'Time Interval Generator', desc: 'Generate a list of formatted times for schedules, logs, or planning.' },
  { id: 'line-repeater', name: 'Line Repeater', desc: 'Repeat a single line of text multiple times effortlessly.' },
  { id: 'campaign-builder', name: 'Email Campaign Builder', desc: 'Assemble complete email campaign data from multiple dynamic inputs.' },
  { id: 'list-sorter', name: 'List Sorter & Randomizer', desc: 'Sort alphabetically, reverse, or completely shuffle lists of text instantly.' },
  { id: 'case-converter', name: 'Case Converter', desc: 'Change text formatting to UPPERCASE, lowercase, Title Case, and more.' },
  { id: 'counter', name: 'Character & Word Counter', desc: 'Get real-time character, word, and line counts for any text.' },
  { id: 'list-comparison', name: 'List Comparison', desc: 'Find differences and similarities between two separate lists of text.' },
  { id: 'duplicate-remover', name: 'Duplicate Line Remover', desc: 'Clean up lists by finding and removing duplicate entries automatically.' },
  { id: 'url-extractor', name: 'URL Extractor', desc: 'Scrape and extract all valid URLs and links from any block of text.' },
  { id: 'base64-converter', name: 'Base64 Converter', desc: 'Securely encode plain text to Base64 or decode Base64 back to text.' },
  { id: 'markdown-converter', name: 'Markdown to HTML', desc: 'Convert standard Markdown text into raw HTML tags instantly.' },
  { id: 'whitespace-remover', name: 'Whitespace Remover', desc: 'Clean up formatting by removing extra spaces and empty lines.' },
];

const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');

// Ensure directory exists
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

const indexExports = [];

tools.forEach(tool => {
  const toolDir = path.join(blogDir, tool.id);
  if (!fs.existsSync(toolDir)) {
    fs.mkdirSync(toolDir, { recursive: true });
  }

  const contentFile = path.join(toolDir, 'content.ts');
  const safeName = tool.name.replace(/'/g, "\\'");
  const safeDesc = tool.desc.replace(/'/g, "\\'");
  
  const tsContent = `export const ${tool.id.replace(/-/g, '_')} = {
  slug: '${tool.id}',
  title: 'Free ${safeName} Online Tool',
  description: '${safeDesc}',
  publishedDate: '2024-01-01T00:00:00Z',
  keywords: ['${tool.name.toLowerCase()}', 'free online tool', 'niazi tools'],
  content: \`
## What is the ${safeName} Tool?

The **${safeName}** tool by Niazi Tools is a completely free, fast, and secure online utility designed to help you ${safeDesc.toLowerCase()}

Because Niazi Tools is built with an offline-first architecture, all processing happens entirely within your web browser. This means your data is never uploaded to any external servers, guaranteeing 100% privacy and lightning-fast speeds.

## Key Features

- **Instant Processing:** No waiting for server responses.
- **100% Private:** Your data never leaves your device.
- **Free to Use:** No hidden fees, subscriptions, or intrusive ads.
- **Mobile Friendly:** Works perfectly on desktops, tablets, and smartphones.

## How to Use

1. Enter or paste your text into the input area.
2. Select your desired options or configurations if applicable.
3. The results will be generated instantly.
4. Click the copy button to grab your results!
  \`
};
`;

  fs.writeFileSync(contentFile, tsContent);
  indexExports.push(`export { ${tool.id.replace(/-/g, '_')} } from './${tool.id}/content';`);
});

// Create index.ts
const indexContent = `// Central registry for all blog content
${indexExports.join('\n')}

import * as allTools from './index';
export const toolsList = Object.values(allTools) as any[];
`;

fs.writeFileSync(path.join(blogDir, 'index.ts'), indexContent);

console.log('Successfully generated blog content files.');
