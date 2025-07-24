
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FileText,
  Trash2,
  Settings,
  Replace,
  Copy,
  Layers,
  ArrowLeft,
  Github,
  Facebook,
  Linkedin,
  Moon,
  Sun,
  ShieldCheck,
  Upload,
  ClipboardPaste,
  Download,
  PlusCircle,
  X,
  Undo,
  ArrowRightLeft,
  FileSearch,
  Mail,
  MapPin,
  Pilcrow,
  Clock,
  Repeat,
  MailPlus,
  Check,
  ArrowUp,
  Pencil,
  Save,
  Loader2,
  ListOrdered,
  CaseSensitive,
  Calculator,
  Diff,
  Eraser,
  Phone,
} from "lucide-react";
import * as XLSX from 'xlsx';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CopyableLine } from "@/components/copyable-line";
import { CopyableParagraph } from "@/components/copyable-paragraph";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cleanupLines, CleanupLinesInput } from "@/ai/flows/cleanupLinesFlow";
import { extractData, ExtractDataInput } from "@/ai/flows/extractDataFlow";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ukLocations } from "@/lib/locations";
import { cn } from "@/lib/utils";
import { Copyright } from "@/components/copyright";


const formSchema = z.object({
  lines: z.string().min(1, "Please enter at least one line."),
});

type LineItem = {
  id: string;
  text: string;
  copied: boolean;
};

type CampaignLineItem = {
  id: string;
  email: string | null;
  subject: string | null;
  paragraph: string | null;
  time: string | null;
  copiedFields: Set<keyof Omit<CampaignLineItem, 'id' | 'copiedFields'>>;
};


type FindReplacePair = {
  id: number;
  find: string;
  replace: string;
}

type CopyAction = "mark" | "remove";
type CampaignCopyAction = "mark" | "remove_field";
type ActiveTool = 
  "copyable" | 
  "copyable-paragraphs" | 
  "find-replace" | 
  "data-extractor" | 
  "phone-extractor" |
  "query-generator" | 
  "time-interval-generator" | 
  "line-repeater" | 
  "campaign-builder" | 
  "list-sorter" |
  "case-converter" |
  "counter" |
  "list-comparison" |
  "duplicate-remover" |
  null;

type ExtractedDataItem = {
    email: string;
    count: number;
};

type ExtractedPhoneItem = {
  phone: string;
  count: number;
};

type DynamicPair = {
  id: number;
  value: string;
};


const toolHelpContent = {
  copyable: {
    description: "This tool allows you to paste a block of text and convert it into a list of individual lines. 📋 Each line can then be easily copied with a single click, either marking it as done or removing it from the list.",
    faqs: [
      {
        question: "What's the difference between 'Mark as copied' and 'Remove when copied'? 🤔",
        answer: "'Mark as copied' will strike through the line after you copy it, which is useful for tracking progress. 'Remove when copied' will completely remove the line from the list once copied."
      },
      {
        question: "Can I edit or delete a line after converting? ✍️",
        answer: "Yes! Hover over any line to reveal icons that allow you to edit the text or delete the line entirely."
      },
      {
        question: "How do I use the 'Upload from File' feature? 📁",
        answer: "Click the 'Upload from File' button and select a .txt file from your computer. The content of the file will be loaded into the input area, ready to be converted."
      }
    ]
  },
  'copyable-paragraphs': {
    description: "This tool is designed for paragraphs. 📋 Add up to 10 paragraphs manually or upload multiple .txt files. Each entry or file will be treated as a distinct paragraph, which can then be easily copied with a single click.",
    faqs: [
        {
            question: "How do I add paragraphs manually? 🤔",
            answer: "You can add up to 10 individual paragraphs by clicking the 'Add Paragraph' button. Each text area is a separate paragraph."
        },
        {
            question: "How does uploading files work? 📁",
            answer: "You can select multiple .txt files at once. The entire content of each file will be treated as a single, separate paragraph, preserving all its original formatting, including line breaks."
        },
        {
            question: "Can I edit a paragraph after it has been created? ✍️",
            answer: "Yes! Once you've converted your inputs, you can hover over any paragraph in the output list to reveal icons that allow you to edit the text or delete it entirely."
        },
        {
            question: "What's the best use case for this tool? 💡",
            answer: "It's perfect for when you're working with longer-form content like articles, emails, or reports and need to grab specific paragraphs quickly without losing their formatting."
        }
    ]
  },
  'find-replace': {
    description: "This powerful tool helps you perform bulk find-and-replace operations. 🔍 You can paste your text, add one or more rules for finding and replacing text, and apply them all at once. The tool also supports undoing your last replacement and moving the output back to the input for further changes.",
    faqs: [
      {
        question: "Can I use multiple find and replace rules at the same time? ✨",
        answer: "Yes! Click the 'Add More' button to add up to 10 find/replace pairs. The 'Replace All' button will apply all of them sequentially to your input text."
      },
      {
        question: "What does the 'Undo' button do? ⏪",
        answer: "The 'Undo' button reverts the output text to the state it was in before you last clicked 'Replace All'. You can only undo one step."
      },
      {
        question: "Why is the 'Replace All' button disabled? 🚫",
        answer: "The button is disabled if there's no text in the input box, or if none of a 'Find' fields in your rules have any text in them."
      }
    ]
  },
  'data-extractor': {
    description: "The Email Extractor is designed to quickly scan large amounts of text or files to find all email addresses, count their occurrences, and list the unique ones. 📧 It supports pasting text directly or uploading .txt, .csv, .xls, and .xlsx files.",
    faqs: [
      {
        question: "How does the tool handle duplicate emails? 🔍",
        answer: "The tool automatically groups all identical emails (case-insensitive) and shows you a count of how many times each unique email appeared in your input text. This helps you see which emails are most frequent."
      },
      {
        question: "What file types are supported for upload? 📄",
        answer: "You can upload plain text (.txt), comma-separated values (.csv), and Excel files (.xls, .xlsx)."
      },
      {
        question: "Is there a limit to how many files I can upload at once? 🧮",
        answer: "No, there is no limit! You can upload as many supported files as you need, and the tool will process them all."
      },
      {
        question: "Does it find emails inside Excel files? 🕵️",
        answer: "Yes. The tool now intelligently looks for columns with headers like 'Email' or 'E-mail' and prioritizes them. If it doesn't find any specific email columns, it will scan all text in the file to ensure nothing is missed."
      }
    ]
  },
  'phone-extractor': {
    description: "A precision tool to extract phone numbers from text or files. 📞 It's specifically optimized to find phone numbers from columns with a 'Phone' header in Excel files.",
    faqs: [
      {
        question: "How does this tool work with Excel files? 📊",
        answer: "It is highly precise. The tool exclusively scans for columns with a header containing the word 'Phone' (case-insensitive). It then extracts all valid phone numbers from that column, ignoring empty cells. Other columns are ignored."
      },
      {
        question: "What about other file types or pasted text? 📋",
        answer: "For plain text (.txt), CSV files, or text pasted directly, the tool uses a robust pattern-matching algorithm (regular expression) to find a wide variety of phone number formats from anywhere in the text."
      },
      {
        question: "What formats of phone numbers can it detect? 🔢",
        answer: "It's designed to recognize many common formats, including those with parentheses, hyphens, spaces, and country codes (e.g., (123) 456-7890, 123-456-7890, +1 123 456 7890)."
      },
      {
        question: "How is the output presented? 📝",
        answer: "Just like the Email Extractor, you get two clean lists: one showing every unique phone number and how many times it appeared, and another box with just the unique numbers, ready to be copied or downloaded."
      }
    ]
  },
  'query-generator': {
    description: "Instantly generate a list of search queries for a specific service across all states, counties, or provinces of a selected country. 🗺️ Perfect for market research or lead generation campaigns.",
    faqs: [
      {
        question: "How does it know all the locations? 🤔",
        answer: "For most countries, the tool uses a pre-compiled list of major administrative areas. For the USA, Canada, and Australia it downloads a comprehensive list of thousands of cities on-demand to provide extensive coverage without slowing down the app's initial load time."
      },
      {
        question: "Can I add more countries or more specific locations? ✍️",
        answer: "Currently, the tool supports the UK, USA, Canada, and Australia with their primary regions. Future updates may include more countries or more detailed city-level data."
      },
      {
        question: "What's the best way to use the generated list? 📋",
        answer: "You can copy the entire list with a single click and paste it into a search engine, a spreadsheet for tracking, or any other tool you use for research."
      }
    ]
  },
  'time-interval-generator': {
      description: "Create a list of time entries based on a starting time, a fixed interval, and the number of entries you need. ⏰ Ideal for creating schedules, timetables, or event timelines.",
      faqs: [
          {
              question: "How do I set the start time? 🤔",
              answer: "Simply use the time picker to select your desired start hour and minute. You can also type it in directly in a 24-hour format."
          },
          {
              question: "What format is the interval in? ⏱️",
              answer: "The interval is in minutes. For example, to generate a list with a 1.5-hour gap, you would enter '90' in the interval field."
          },
          {
              question: "Is there a limit to how many entries I can generate? 📈",
              answer: "For display in the browser, the limit is 2500 entries. However, if you enter a larger number, a special dialog will appear allowing you to download a file with as many entries as you need!"
          }
      ]
  },
    'line-repeater': {
        description: "Quickly generate a large number of repeated lines from a single piece of text. 🔁 Perfect for creating test data, bulk lists, or any scenario where you need to duplicate a line many times.",
        faqs: [
            {
                question: "Is there a limit to how many lines I can generate? 🤔",
                answer: "For display in the browser, the tool is limited to 2500 lines. But if you need more, just enter a larger number! A special option will appear to let you download a file with as many lines as you want."
            },
            {
                question: "What can I use this for? 💡",
                answer: "It's great for creating sample data for software testing, populating spreadsheets with placeholder text, or any task where you need to multiply a single entry into a large list."
            },
            {
                question: "Can I repeat more than one line of text at a time? ✍️",
                answer: "This tool is designed to repeat a single line of text. If you need to repeat multiple lines, you can generate them one at a time and combine the output."
            }
        ]
    },
    'campaign-builder': {
      description: "A powerful tool to assemble campaign data. 📧 Combine a list of emails with rotating subjects and paragraphs, paired with auto-generated time slots. The output provides separate copyable fields for easy use in your email client.",
      faqs: [
          {
              question: "How many emails can I use? 🤔",
              answer: "You can provide any number of emails. If you provide more than 100, a confirmation dialog will appear, and only the first 100 will be used for generation. Subjects, paragraphs, and times will be automatically matched to the number of emails you use."
          },
          {
              question: "How do the subjects and paragraphs work? 📋",
              answer: "You can add up to 10 different subjects and 10 different paragraphs. The tool will cycle through them to create a varied campaign. For example, if you have 2 subjects, it will assign them as A, B, A, B, etc."
          },
          {
              question: "Why must the number of subjects and paragraphs be equal? ⚖️",
              answer: "This is to ensure a predictable and balanced rotation. The first subject will always be paired with the first paragraph, the second with the second, and so on. This gives you precise control over your campaign message variations."
          },
          {
            question: "How is the final output formatted? 📝",
            answer: "The output is a list of numbered rows. Each row contains four separate, individually copyable fields: Email, Subject, Paragraph, and Time. This makes it incredibly easy to copy and paste each part directly into your email client."
          }
      ]
    },
    'list-sorter': {
        description: "An essential utility for organizing text lists. Paste your list and instantly sort it alphabetically, numerically, reverse the order, or shuffle it randomly.",
        faqs: [
            {
                question: "How does numerical sorting work? 🤔",
                answer: "Numerical sorting is designed for lines that start with numbers (e.g., '1. Apple', '10. Orange'). It correctly sorts them based on the number's value, not just the first digit, so '2' comes before '10'."
            },
            {
                question: "What does 'Shuffle' do? 🎲",
                answer: "The shuffle button randomly reorders all the lines in your list. It's perfect for creating random assignments, contest drawings, or just mixing things up."
            },
            {
                question: "Can I sort mixed lists of text and numbers? 🔠",
                answer: "Yes. The standard A-Z sort will handle all lines. For the best results with numerical sorting, ensure your lines begin with a number."
            }
        ]
    },
    'case-converter': {
        description: "A simple yet powerful tool for changing text capitalization. Paste any text and convert it to UPPERCASE, lowercase, Title Case, or Sentence case with a single click.",
        faqs: [
            {
                question: "What is 'Title Case'? 🤔",
                answer: "'Title Case' Capitalizes The First Letter Of Every Word. It's commonly used for headlines and titles."
            },
            {
                question: "What is 'Sentence case'? ✍️",
                answer: "'Sentence case' capitalizes only the first letter of the first word in each sentence. It's the standard for most writing."
            },
            {
                question: "Does this affect the original text? 🛡️",
                answer: "No. Your original text in the input box is never changed. The converted text appears in a separate output box, ready to be copied."
            }
        ]
    },
    'counter': {
        description: "Get detailed statistics on your text in real-time. This tool counts characters (with and without spaces), words, sentences, and paragraphs as you type or paste text.",
        faqs: [
            {
                question: "How are sentences counted? 🤔",
                answer: "Sentences are typically counted by looking for punctuation marks like periods (.), question marks (?), and exclamation points (!)."
            },
            {
                question: "Is there a limit to the amount of text I can analyze? 📈",
                answer: "No, there's no practical limit. The tool is designed to handle very large blocks of text efficiently right in your browser."
            },
            {
                question: "Are the counts updated automatically? ⚡",
                answer: "Yes! The statistics update instantly as you modify the text in the input area, giving you immediate feedback."
            }
        ]
    },
    'list-comparison': {
        description: "Compare two lists to find what's unique and what they share. This tool is perfect for reconciling data, checking for changes, or merging lists.",
        faqs: [
            {
                question: "How do I use this tool? 🤔",
                answer: "Paste your first list into 'List A' and your second list into 'List B'. The tool will automatically show you which items are unique to each list and which items appear in both."
            },
            {
                question: "Is the comparison case-sensitive? ✍️",
                answer: "By default, the comparison is case-insensitive (so 'Apple' and 'apple' are treated as the same). There's usually an option to make the comparison case-sensitive if you need it."
            },
            {
                question: "What can I do with the results? 📋",
                answer: "Each of the resulting lists (Unique to A, Unique to B, and In Both) can be copied to your clipboard with a single click."
            }
        ]
    },
    'duplicate-remover': {
        description: "Quickly clean up any list by removing all duplicate lines. This tool leaves you with a clean list of only the unique entries.",
        faqs: [
            {
                question: "How are duplicates identified? 🤔",
                answer: "A line is considered a duplicate if it exactly matches another line in the list. By default, this is case-insensitive ('Apple' and 'apple' are duplicates)."
            },
            {
                question: "Can I make the check case-sensitive? ✍️",
                answer: "Yes, there's a checkbox option to make the comparison case-sensitive. If you check it, 'Apple' and 'apple' will be treated as two different, unique lines."
            },
            {
                question: "Will the original order be preserved? ➡️",
                answer: "Yes. The tool keeps the first occurrence of each unique line and preserves its original position in the list."
            }
        ]
    }
};

const ToolHelp = ({ tool, toolName }: { tool: ActiveTool; toolName: string }) => {
  if (!tool) return null;
  const content = toolHelpContent[tool as keyof typeof toolHelpContent];
  if (!content) return null;

  return (
    <div className="mt-8 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
        <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">💡 How to Use the {toolName}</h3>
        <p className="text-sm text-muted-foreground mb-6">{content.description}</p>
        
        <Separator className="my-6" />

        <h3 className="text-2xl font-semibold leading-none tracking-tight mb-4">🤔 Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="w-full">
          {content.faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
    </div>
  );
};


const AppHeader = () => (
  <div className="flex items-center justify-center gap-2 sm:gap-4 mt-16 mb-10 md:my-16 text-center">
    <Layers className="text-primary h-12 w-12 sm:h-16 sm:w-16" />
    <h1 className="text-5xl sm:text-6xl md:text-7xl font-headline tracking-wider bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-animated-gradient">
      Niazi Tools
    </h1>
  </div>
);

const ToolCard = ({
  icon,
  title,
  description,
  onClick,
  isNew = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  isNew?: boolean;
}) => (
  <Card
    onClick={onClick}
    className="group relative cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-primary/20 hover:shadow-lg dark:bg-card/80"
  >
    {isNew && (
      <Badge className="absolute top-4 right-4">New</Badge>
    )}
    <CardHeader className="flex-row items-center gap-4 space-y-0">
      <div className="rounded-lg bg-primary/10 p-3 border border-primary/20 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const ThemeToggle = ({ theme, setTheme }: { theme: string; setTheme: (theme: string) => void }) => {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  return (
    <Button
      onClick={() => setTheme(nextTheme)}
      className="shadow-md transition-all font-semibold bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 hover:shadow-lg hover:shadow-primary/20"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
      <span>{nextTheme.charAt(0).toUpperCase() + nextTheme.slice(1)}</span>
    </Button>
  );
};

export default function Home() {
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [copyAction, setCopyAction] = useState<CopyAction>("mark");
  const [hasConverted, setHasConverted] = useState(false);
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [showNicknameDialog, setShowNicknameDialog] = useState(false);
  const [nicknameInput, setNicknameInput] = useState("");
  const [theme, setTheme] = useState("dark");
  const [showScroll, setShowScroll] = useState(false);
  const copyableFileInputRef = useRef<HTMLInputElement>(null);
  const findReplaceFileInputRef = useRef<HTMLInputElement>(null);
  const extractorFileInputRef = useRef<HTMLInputElement>(null);
  const phoneExtractorFileInputRef = useRef<HTMLInputElement>(null);
  const campaignBuilderEmailsRef = useRef<HTMLInputElement>(null);
  const campaignBuilderSubjectsRef = useRef<HTMLInputElement>(null);
  const campaignBuilderParagraphsRef = useRef<HTMLInputElement>(null);
  const paragraphFileInputRef = useRef<HTMLInputElement>(null);

  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
  const { toast } = useToast();

  // State for Copyable Paragraphs tool
  const [paragraphItems, setParagraphItems] = useState<LineItem[]>([]);
  const [copyableParagraphs, setCopyableParagraphs] = useState<DynamicPair[]>([{ id: Date.now(), value: '' }]);
  const [paragraphCopyAction, setParagraphCopyAction] = useState<CopyAction>("mark");
  const [paragraphHasConverted, setParagraphHasConverted] = useState(false);

  // State for Find & Replace tool
  const [findReplaceInput, setFindReplaceInput] = useState("");
  const [findReplaceOutput, setFindReplaceOutput] = useState("");
  const [replacementsCount, setReplacementsCount] = useState<number | null>(null);
  const [findReplacePairs, setFindReplacePairs] = useState<FindReplacePair[]>([{ id: Date.now(), find: '', replace: '' }]);
  const [outputHistory, setOutputHistory] = useState<string[]>([]);

  // State for Email Extractor tool
  const [extractorInput, setExtractorInput] = useState("");
  const [extractedData, setExtractedData] = useState<ExtractedDataItem[] | null>(null);

  // State for Phone Extractor tool
  const [phoneExtractorInput, setPhoneExtractorInput] = useState("");
  const [extractedPhones, setExtractedPhones] = useState<ExtractedPhoneItem[] | null>(null);

  // State for Query Generator tool
  const [queryService, setQueryService] = useState("");
  const [queryCountry, setQueryCountry] = useState("");
  const [queryOutput, setQueryOutput] = useState("");
  const [isQueryGenerating, setIsQueryGenerating] = useState(false);

  // State for Time Interval Generator tool
  const [startTime, setStartTime] = useState("09:00");
  const [timeInterval, setTimeInterval] = useState(30);
  const [timeCount, setTimeCount] = useState(10);
  const [timeOutput, setTimeOutput] = useState("");

  // State for Line Repeater tool
  const [lineRepeaterInput, setLineRepeaterInput] = useState("");
  const [lineRepeaterCount, setLineRepeaterCount] = useState(10);
  const [lineRepeaterOutput, setLineRepeaterOutput] = useState("");

  // State for Campaign Builder tool
  const [campaignEmails, setCampaignEmails] = useState("");
  const [campaignSubjects, setCampaignSubjects] = useState<DynamicPair[]>([{ id: Date.now(), value: '' }]);
  const [campaignParagraphs, setCampaignParagraphs] = useState<DynamicPair[]>([{ id: Date.now(), value: '' }]);
  const [campaignOutput, setCampaignOutput] = useState<CampaignLineItem[]>([]);
  const [campaignHasGenerated, setCampaignHasGenerated] = useState(false);
  const [campaignCopyAction, setCampaignCopyAction] = useState<CampaignCopyAction>("mark");
  const [campaignStartTime, setCampaignStartTime] = useState("09:00");
  const [campaignTimeInterval, setCampaignTimeInterval] = useState(5);
  const [editingCampaignItemId, setEditingCampaignItemId] = useState<string | null>(null);
  const [editingCampaignItemData, setEditingCampaignItemData] = useState<Partial<CampaignLineItem>>({});


  // State for Download Dialog
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [downloadInfo, setDownloadInfo] = useState<{ text: string; filename: string } | null>(null);
  const [newFilename, setNewFilename] = useState("");
  
  // State for Large Generation Dialog
  const [showLargeGenerationDialog, setShowLargeGenerationDialog] = useState(false);
  const [largeGenerationInfo, setLargeGenerationInfo] = useState<{ onConfirm: () => void } | null>(null);
  
  // State for Email Limit Dialog
  const [showEmailLimitDialog, setShowEmailLimitDialog] = useState(false);
  const [emailLimitInfo, setEmailLimitInfo] = useState<{ count: number, onConfirm: () => void } | null>(null);

  // --- NEW TOOLS STATE ---
  // List Sorter
  const [listSorterInput, setListSorterInput] = useState('');
  const [listSorterOutput, setListSorterOutput] = useState('');

  // Case Converter
  const [caseConverterInput, setCaseConverterInput] = useState('');
  const [caseConverterOutput, setCaseConverterOutput] = useState('');

  // Counter
  const [counterInput, setCounterInput] = useState('');
  const [counts, setCounts] = useState({ words: 0, chars: 0, charsNoSpaces: 0, sentences: 0, paragraphs: 0 });

  // List Comparison
  const [listA, setListA] = useState('');
  const [listB, setListB] = useState('');
  const [comparisonResult, setComparisonResult] = useState<{ uniqueA: string[], uniqueB: string[], inBoth: string[] } | null>(null);
  const [isCaseSensitiveComparison, setIsCaseSensitiveComparison] = useState(false);

  // Duplicate Remover
  const [duplicateRemoverInput, setDuplicateRemoverInput] = useState('');
  const [duplicateRemoverOutput, setDuplicateRemoverOutput] = useState('');
  const [isCaseSensitiveRemover, setIsCaseSensitiveRemover] = useState(false);
  const [duplicatesRemovedCount, setDuplicatesRemovedCount] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lines: "",
    },
  });
  
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
    }
  };

  const scrollTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('niazi-tools-theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (theme === 'light') {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
    }
    localStorage.setItem('niazi-tools-theme', theme);
  }, [theme]);

  useEffect(() => {
    const storedNickname = localStorage.getItem("niazi-tools-nickname");
    if (storedNickname) {
      setNickname(storedNickname);
    } else {
      setShowNicknameDialog(true);
    }

    try {
      const storedLines = localStorage.getItem("niazi-tools-lines");
      if (storedLines) {
        const parsedLines = JSON.parse(storedLines);
        if (Array.isArray(parsedLines) && parsedLines.length > 0) {
          setLineItems(parsedLines);
          setHasConverted(true);
          setActiveTool("copyable"); 
          form.setValue("lines", parsedLines.map((l: LineItem) => l.text).join("\n"));
        }
      }
    } catch (error) {
      console.error("Failed to parse stored lines:", error);
      localStorage.removeItem("niazi-tools-lines");
    }
  }, [form]);


  useEffect(() => {
    localStorage.setItem("niazi-tools-lines", JSON.stringify(lineItems));
  }, [lineItems]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const linesArray = values.lines
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line, index) => ({ id: `${Date.now()}-${index}`, text: line, copied: false }));
    setLineItems(linesArray);
    setHasConverted(true);
  }

  function onParagraphSubmit() {
    const paragraphsArray = copyableParagraphs
      .map(p => p.value.trim())
      .filter(p => p)
      .map((p, index) => ({ id: `${Date.now()}-${index}`, text: p, copied: false }));

    if (paragraphsArray.length === 0) {
        toast({
            title: "No Paragraphs Provided",
            description: "Please add at least one paragraph manually or via file upload.",
            variant: "destructive",
        });
        return;
    }

    setParagraphItems(paragraphsArray);
    setParagraphHasConverted(true);
  }

  const handleLineCopied = (itemId: string) => {
    if (copyAction === "mark") {
      setLineItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, copied: true } : item
        )
      );
    } else {
      setLineItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    }
  };
  
  const handleUpdateLine = (id: string, newText: string) => {
    setLineItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: newText, copied: false } : item
      )
    );
  };
  
  const handleDeleteLine = (id: string) => {
    setLineItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };


  const handleClearAll = () => {
    setLineItems([]);
    form.reset();
    setHasConverted(false);
    localStorage.removeItem("niazi-tools-lines");
  };

  const handleParagraphCopied = (itemId: string) => {
    if (paragraphCopyAction === "mark") {
      setParagraphItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, copied: true } : item
        )
      );
    } else {
      setParagraphItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    }
  };
  
  const handleUpdateParagraph = (id: string, newText: string) => {
    setParagraphItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: newText, copied: false } : item
      )
    );
  };
  
  const handleDeleteParagraph = (id: string) => {
    setParagraphItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleClearAllParagraphs = () => {
    setParagraphItems([]);
    setCopyableParagraphs([{ id: Date.now(), value: "" }]);
    setParagraphHasConverted(false);
  };

  const handleParagraphFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileReadPromises = Array.from(files).map(file => {
        return new Promise<string>((resolve, reject) => {
            if (file.type === 'text/plain') {
                const reader = new FileReader();
                reader.onload = e => resolve(e.target?.result as string);
                reader.onerror = e => reject(e);
                reader.readAsText(file);
            } else {
                resolve('');
            }
        });
    });

    Promise.all(fileReadPromises)
        .then(contents => {
            const validContents = contents.filter(Boolean);
            if (validContents.length === 0) return;

            const newPairs = validContents.map(content => ({
                id: Date.now() + Math.random(),
                value: content
            }));
            
            setCopyableParagraphs(prev => {
              const existingNonEmpty = prev.filter(p => p.value.trim());
              const combined = [...existingNonEmpty, ...newPairs];
              return combined.length > 0 ? combined : [{ id: Date.now(), value: "" }];
            });

            toast({
                title: "Files Uploaded",
                description: `${validContents.length} file(s) have been successfully loaded as paragraphs.`,
            });
        })
        .catch(error => {
            toast({
                title: "Error Reading Files",
                description: "There was an issue processing one or more of your files.",
                variant: "destructive",
            });
        })
        .finally(() => {
            if (event.target) {
                event.target.value = "";
            }
        });
  };

  const handleBackToHome = () => {
    setActiveTool(null);
  };
  
  const handleSaveNickname = () => {
    if (nicknameInput.trim()) {
      const newNickname = nicknameInput.trim();
      localStorage.setItem("niazi-tools-nickname", newNickname);
      setNickname(newNickname);
      setShowNicknameDialog(false);
    }
  };

  const handleCopyableFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        form.setValue("lines", text);
      };
      reader.readAsText(file);
    }
    event.target.value = "";
  };
  
  // --- Find & Replace Tool Functions ---

  const handlePaste = async (setter: (text: string) => void) => {
    try {
      const text = await navigator.clipboard.readText();
      setter(text);
      if (text) {
        toast({
          title: "Pasted from Clipboard",
          description: "Text has been successfully pasted into the input field.",
        });
      }
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
      toast({
        title: "Error",
        description: "Could not paste from clipboard. Your browser may not support this feature or has denied permission.",
        variant: "destructive",
      });
    }
  };

  const handleFindReplaceFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setFindReplaceInput(text);
      };
      reader.readAsText(file);
    }
    event.target.value = "";
  };
  
  const handleAddPair = () => {
    if (findReplacePairs.length < 10) {
      setFindReplacePairs([...findReplacePairs, { id: Date.now(), find: "", replace: "" }]);
    }
  };

  const handleRemovePair = (id: number) => {
    setFindReplacePairs(findReplacePairs.filter((p) => p.id !== id));
  };

  const handlePairChange = (id: number, field: "find" | "replace", value: string) => {
    setFindReplacePairs(findReplacePairs.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    setFindReplaceOutput("");
    setReplacementsCount(null);
  };
  
  const handleBulkReplace = () => {
    if (!findReplaceInput) return;
  
    setOutputHistory((prev) => [...prev, findReplaceOutput]);
  
    let currentText = findReplaceInput;
    let totalReplacements = 0;
  
    findReplacePairs.forEach((pair) => {
      if (pair.find.trim()) {
        try {
          const regex = new RegExp(
            pair.find.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
            "g"
          );
          const matchCount = (currentText.match(regex) || []).length;
          currentText = currentText.replace(regex, pair.replace);
          totalReplacements += matchCount;
        } catch (e) {
          console.error("Invalid regex in find/replace", e);
          toast({
            title: "Invalid Find Pattern",
            description:
              "One of your 'find' patterns is an invalid regular expression.",
            variant: "destructive",
          });
        }
      }
    });
  
    setFindReplaceOutput(currentText);
    setReplacementsCount(totalReplacements);
    if (totalReplacements > 0) {
      toast({
          title: "Replacement Complete",
          description: `${totalReplacements} replacement(s) were made.`,
      });
    }
  };


  const handleCopyOutput = async (text: string) => {
    if (!text) return;
    try {
        await navigator.clipboard.writeText(text);
        toast({
            title: "Copied to Clipboard",
            description: "The output text has been copied.",
        });
    } catch (err) {
        console.error("Failed to copy text: ", err);
        toast({
            title: "Error",
            description: "Failed to copy to clipboard.",
            variant: "destructive",
        });
    }
  };
  
  const promptDownload = (text: string, defaultFilename: string) => {
    if (!text) return;
    setDownloadInfo({ text, filename: defaultFilename });
    setNewFilename(defaultFilename);
    setShowDownloadDialog(true);
  };
  
  const executeDownload = () => {
    if (!downloadInfo || !newFilename.trim()) return;

    const { text } = downloadInfo;
    const finalFilename = newFilename.trim().endsWith('.txt') ? newFilename.trim() : `${newFilename.trim()}.txt`;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = finalFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setShowDownloadDialog(false);
    setDownloadInfo(null);
    toast({
        title: "Download Successfully",
        description: `Your file "${finalFilename}" has been saved.`,
    });
  };


  const handleClearFindReplace = () => {
    setFindReplaceInput("");
    setFindReplaceOutput("");
    setFindReplacePairs([{ id: Date.now(), find: "", replace: "" }]);
    setReplacementsCount(null);
    setOutputHistory([]);
  };

  const handleUndo = () => {
    if (outputHistory.length > 0) {
      const previousOutput = outputHistory[outputHistory.length - 1];
      setOutputHistory(outputHistory.slice(0, -1));
      setFindReplaceOutput(previousOutput);
      setReplacementsCount(null);
    }
  };
  
  const handleMoveOutputToInput = (targetSetter: (text: string) => void, textToMove: string, clearAfter = true) => {
    if (!textToMove) {
      toast({
        title: "Output is Empty",
        description: "There is nothing to move to the input field.",
        variant: "destructive"
      });
      return;
    };
    targetSetter(textToMove);
  
    if (clearAfter) {
      if (targetSetter === setFindReplaceInput) {
        setFindReplaceOutput("");
        setReplacementsCount(null);
        setOutputHistory([]);
      } else if (targetSetter === setLineRepeaterInput) {
        setLineRepeaterOutput("");
      } else if (targetSetter === setQueryService) {
        setQueryOutput("");
      } else if (targetSetter === setExtractorInput) {
        setExtractorInput("");
        setExtractedData(null);
      }
    }
  
    toast({
      title: "Moved to Input",
      description: "The output has been moved to the input area for further processing."
    });
  };
  

  // --- Email Extractor Tool Functions ---

    const extractorOutput = useMemo(() => {
        if (!extractedData) return '';
        return extractedData.map(item => item.email).join('\n');
    }, [extractedData]);

    const uniqueEmailCount = extractedData?.length ?? null;
    const totalEmailCount = useMemo(() => {
        if (!extractedData) return null;
        return extractedData.reduce((sum, item) => sum + item.count, 0);
    }, [extractedData]);

  const handleExtractorFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const filePromises = Array.from(files).map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        const fileType = file.name.split('.').pop()?.toLowerCase();

        reader.onload = (e) => {
          try {
            const result = e.target?.result;
            if (fileType === 'txt' || fileType === 'csv') {
              resolve(result as string);
            } else if (fileType === 'xlsx' || fileType === 'xls') {
              const workbook = XLSX.read(result, { type: 'array' });
              let excelText = '';
              
              workbook.SheetNames.forEach(sheetName => {
                const worksheet = workbook.Sheets[sheetName];
                const json_data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false });
                
                if (json_data.length === 0) return;

                const headers = json_data[0].map(h => (typeof h === 'string' ? h.toLowerCase() : ''));
                const emailColumnIndexes: number[] = [];
                
                headers.forEach((header: any, index: number) => {
                  if (typeof header === 'string' && /\be-?mail\b/i.test(header)) {
                    emailColumnIndexes.push(index);
                  }
                });

                if (emailColumnIndexes.length > 0) {
                  const emailData = json_data
                    .slice(1)
                    .map(row => emailColumnIndexes.map(index => row[index] || '').join(' '))
                    .join('\n');
                  excelText += emailData + '\n';
                } else {
                  const fullSheetText = XLSX.utils.sheet_to_csv(worksheet, { header: 1 });
                  excelText += fullSheetText + '\n';
                }
              });
              resolve(excelText);
            } else {
              resolve(''); 
            }
          } catch (error) {
            console.error(`Error processing file ${file.name}:`, error);
            reject(new Error(`Failed to process ${file.name}`));
          }
        };

        reader.onerror = (error) => {
            console.error(`Error reading file ${file.name}:`, error);
            reject(new Error(`Failed to read ${file.name}`));
        };

        if (fileType === 'txt' || fileType === 'csv') {
          reader.readAsText(file);
        } else if (fileType === 'xlsx' || fileType === 'xls') {
          reader.readAsArrayBuffer(file);
        } else {
           console.warn(`Unsupported file type skipped: ${file.name}`);
           resolve('');
        }
      });
    });

    Promise.all(filePromises)
      .then(contents => {
        const supportedFileCount = contents.filter(c => c.trim()).length;
        const totalFileCount = files.length;
        const unsupportedCount = totalFileCount - supportedFileCount;

        const newContent = contents.join('\n');
        setExtractorInput(prevInput => prevInput ? `${prevInput}\n${newContent}` : newContent);
        
        if (unsupportedCount > 0) {
          toast({
            title: "Files Processed with Warnings",
            description: `${supportedFileCount} of ${totalFileCount} files loaded. ${unsupportedCount} unsupported files were ignored.`,
            variant: "destructive"
          });
        } else if (supportedFileCount > 0) {
          toast({
            title: "Files Uploaded",
            description: `${supportedFileCount} file(s) have been successfully loaded.`,
          });
        }
      })
      .catch(error => {
        console.error("Error processing files:", error);
        toast({
          title: "File Processing Error",
          description: "An error occurred while processing one or more files.",
          variant: "destructive",
        });
      })
      .finally(() => {
        if (event.target) {
          event.target.value = "";
        }
      });
  };
  
  const handleExtractData = () => {
    if (!extractorInput) return;

    const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
    const allEmails = extractorInput.match(emailRegex) || [];

    if (allEmails.length === 0) {
        setExtractedData([]);
        toast({
            title: "No Emails Found",
            description: "Could not find any email addresses in the provided text.",
            variant: "destructive"
        });
        return;
    }

    const emailCountsMap: { [email: string]: number } = {};

    allEmails.forEach(email => {
        const lowerCaseEmail = email.toLowerCase();
        emailCountsMap[lowerCaseEmail] = (emailCountsMap[lowerCaseEmail] || 0) + 1;
    });

    const sortedData = Object.entries(emailCountsMap)
        .map(([email, count]) => ({ email, count }))
        .sort((a, b) => a.email.localeCompare(b.email));

    setExtractedData(sortedData);
    toast({
        title: "Extraction Complete",
        description: `Found ${sortedData.length} unique email(s).`,
    });
  };
  
  const handleClearExtractor = () => {
    setExtractorInput("");
    setExtractedData(null);
  };
  
  // --- Phone Extractor Tool Functions ---
  const phoneExtractorOutput = useMemo(() => {
    if (!extractedPhones) return '';
    return extractedPhones.map(item => item.phone).join('\n');
  }, [extractedPhones]);

  const uniquePhoneCount = extractedPhones?.length ?? null;
  const totalPhoneCount = useMemo(() => {
      if (!extractedPhones) return null;
      return extractedPhones.reduce((sum, item) => sum + item.count, 0);
  }, [extractedPhones]);

  const handlePhoneExtractorFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const filePromises = Array.from(files).map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        const fileType = file.name.split('.').pop()?.toLowerCase();

        reader.onload = (e) => {
          try {
            const result = e.target?.result;
            if (fileType === 'txt' || fileType === 'csv') {
              resolve(result as string);
            } else if (fileType === 'xlsx' || fileType === 'xls') {
              const workbook = XLSX.read(result, { type: 'array' });
              let excelText = '';
              
              workbook.SheetNames.forEach(sheetName => {
                const worksheet = workbook.Sheets[sheetName];
                const json_data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false });
                
                if (json_data.length === 0) return;

                const headers = json_data[0].map(h => (typeof h === 'string' ? h.toLowerCase() : ''));
                const phoneColumnIndexes: number[] = [];
                
                headers.forEach((header, index) => {
                    if (typeof header === 'string' && header.includes('phone')) {
                        phoneColumnIndexes.push(index);
                    }
                });

                if (phoneColumnIndexes.length > 0) {
                    const phoneData = json_data
                        .slice(1)
                        .map(row => phoneColumnIndexes.map(index => row[index] || '').join(' '))
                        .join('\n');
                    excelText += phoneData + '\n';
                } else {
                    toast({
                        title: "No 'Phone' Column Found",
                        description: `In file '${file.name}', no column header containing 'phone' was found. To extract from this file, please paste its content manually.`,
                        variant: "destructive",
                        duration: 8000
                    });
                }
              });
              resolve(excelText);
            } else {
              resolve(''); 
            }
          } catch (error) {
            console.error(`Error processing file ${file.name}:`, error);
            reject(new Error(`Failed to process ${file.name}`));
          }
        };

        reader.onerror = (error) => {
            console.error(`Error reading file ${file.name}:`, error);
            reject(new Error(`Failed to read ${file.name}`));
        };

        if (fileType === 'txt' || fileType === 'csv') {
          reader.readAsText(file);
        } else if (fileType === 'xlsx' || fileType === 'xls') {
          reader.readAsArrayBuffer(file);
        } else {
           console.warn(`Unsupported file type skipped: ${file.name}`);
           resolve('');
        }
      });
    });

    Promise.all(filePromises)
      .then(contents => {
        const newContent = contents.filter(Boolean).join('\n');
        if (newContent) {
          setPhoneExtractorInput(prevInput => prevInput ? `${prevInput}\n${newContent}` : newContent);
          toast({
            title: "Files Processed",
            description: `Content from supported files and columns has been loaded.`,
          });
        }
      })
      .catch(error => {
        console.error("Error processing files:", error);
        toast({
          title: "File Processing Error",
          description: "An error occurred while processing one or more files.",
          variant: "destructive",
        });
      })
      .finally(() => {
        if (event.target) {
          event.target.value = "";
        }
      });
  };

  const handleExtractPhones = () => {
    if (!phoneExtractorInput) return;

    const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const allPhones = phoneExtractorInput.match(phoneRegex) || [];

    if (allPhones.length === 0) {
        setExtractedPhones([]);
        toast({
            title: "No Phone Numbers Found",
            description: "Could not find any phone numbers in the provided text.",
            variant: "destructive"
        });
        return;
    }

    const phoneCountsMap: { [phone: string]: number } = {};

    allPhones.forEach(phone => {
        const cleanedPhone = phone.replace(/[^\d+]/g, '');
        phoneCountsMap[cleanedPhone] = (phoneCountsMap[cleanedPhone] || 0) + 1;
    });

    const sortedData = Object.entries(phoneCountsMap)
        .map(([phone, count]) => ({ phone, count }))
        .sort((a, b) => a.phone.localeCompare(b.phone));

    setExtractedPhones(sortedData);
    toast({
        title: "Extraction Complete",
        description: `Found ${sortedData.length} unique phone number(s).`,
    });
  };

  const handleClearPhoneExtractor = () => {
    setPhoneExtractorInput("");
    setExtractedPhones(null);
  };
  
  // --- Query Generator Tool Functions ---
  const handleGenerateQueries = async () => {
    if (!queryService.trim() || !queryCountry) {
        toast({
            title: "Missing Information",
            description: "Please enter a service name and select a country.",
            variant: "destructive",
        });
        return;
    }

    setIsQueryGenerating(true);
    setQueryOutput("");

    let locations: string[] = [];
    let countryName = '';
    let fetchUrl = '';

    switch (queryCountry) {
        case "uk":
            locations = ukLocations;
            countryName = 'UK';
            break;
        case "usa":
            fetchUrl = "https://gist.githubusercontent.com/muhammad-arsalan-niazi/c0d488a59241df57e48cfd01af218f75/raw/8fa40eafd560dcb518298b4a935c191284f58737/usa-cities.txt";
            countryName = 'USA';
            break;
        case "canada":
            fetchUrl = "https://gist.githubusercontent.com/muhammad-arsalan-niazi/3c5e16d74cec41768aa369fdc331e251/raw/33604f883f36e22802dfb6f2cd1a90728f6ec50c/canada-cities.txt";
            countryName = 'Canada';
            break;
        case "australia":
            fetchUrl = "https://gist.githubusercontent.com/muhammad-arsalan-niazi/54596d3ae4ff138a010d1a03490efbf4/raw/b0da7afc68ec1359ba6b1a32647c123e61b27299/australia-cities.txt";
            countryName = 'Australia';
            break;
    }

    if (fetchUrl) {
        try {
            const response = await fetch(fetchUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch location list for ${countryName}`);
            }
            const text = await response.text();
            locations = text.split('\n').filter(Boolean);
        } catch (error) {
            console.error("Failed to generate queries:", error);
            toast({
                title: "Error",
                description: `Could not fetch the location list for ${countryName}. Please check your internet connection and try again.`,
                variant: "destructive"
            });
            setIsQueryGenerating(false);
            return;
        }
    }

    if (locations.length > 0) {
        const generatedQueries = locations.map(
            location => `${queryService.trim()} in ${location}`
        ).join('\n');
        
        setQueryOutput(generatedQueries);
        toast({
            title: "Queries Generated",
            description: `Successfully generated ${locations.length} search queries.`,
        });
    }

    setIsQueryGenerating(false);
};

  const handleClearQueryGenerator = () => {
      setQueryService("");
      setQueryCountry("");
      setQueryOutput("");
  };

  const generateTimeList = (count: number, start: string, interval: number) => {
    const [startHour, startMinute] = start.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0, 0);

    const results = [];
    for (let i = 0; i < count; i++) {
        const currentTime = new Date(startDate.getTime() + i * interval * 60000);
        let hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const minutesStr = String(minutes).padStart(2, '0');
        results.push(`${String(hours).padStart(2, '0')}:${minutesStr}${ampm}`);
    }
    return results;
  };


  // --- Time Interval Generator ---
  const handleGenerateTimes = () => {
      if (timeCount > 2500) {
        setLargeGenerationInfo({
          onConfirm: () => {
            const fullList = generateTimeList(timeCount, startTime, timeInterval).join('\n');
            promptDownload(fullList, 'niazi-tools-large-time-list.txt');
            setShowLargeGenerationDialog(false);
          },
        });
        setShowLargeGenerationDialog(true);
        return;
      }

      const results = generateTimeList(timeCount, startTime, timeInterval).join('\n');
      setTimeOutput(results);
      toast({
        title: "Times Generated",
        description: `Successfully generated ${timeCount} time entries.`,
    });
  };

  const handleClearTimeGenerator = () => {
      setTimeOutput('');
      setStartTime("09:00");
      setTimeInterval(30);
      setTimeCount(10);
  };


  const generateRepeatedLineList = (count: number) => {
    return Array(count).fill(lineRepeaterInput.trim()).join('\n');
  };

  // --- Line Repeater Tool ---
  const handleGenerateRepeatedLines = () => {
      if (!lineRepeaterInput.trim()) {
          toast({
              title: "Input Missing",
              description: "Please enter the line you want to repeat.",
              variant: "destructive",
          });
          return;
      }

      if (lineRepeaterCount > 2500) {
        setLargeGenerationInfo({
          onConfirm: () => {
            const fullList = generateRepeatedLineList(lineRepeaterCount);
            promptDownload(fullList, 'niazi-tools-large-repeated-list.txt');
            setShowLargeGenerationDialog(false);
          },
        });
        setShowLargeGenerationDialog(true);
        return;
      }

      const lines = generateRepeatedLineList(lineRepeaterCount);
      setLineRepeaterOutput(lines);
      toast({
        title: "Lines Repeated",
        description: `Successfully generated ${lineRepeaterCount} lines.`,
      });
  };

  const handleClearLineRepeater = () => {
      setLineRepeaterInput("");
      setLineRepeaterOutput("");
      setLineRepeaterCount(10);
  };

  // --- Campaign Builder ---
  const handleAddDynamicPair = (setter: React.Dispatch<React.SetStateAction<DynamicPair[]>>, pairs: DynamicPair[]) => {
    if (pairs.length < 10) {
      setter([...pairs, { id: Date.now(), value: "" }]);
    }
  };

  const handleRemoveDynamicPair = (id: number, setter: React.Dispatch<React.SetStateAction<DynamicPair[]>>) => {
    setter(pairs => pairs.filter((p) => p.id !== id));
  };

  const handleDynamicPairChange = (id: number, value: string, setter: React.Dispatch<React.SetStateAction<DynamicPair[]>>) => {
    setter(pairs => pairs.map((p) => (p.id === id ? { ...p, value } : p)));
  };

  const handleCampaignFileUpload = (event: React.ChangeEvent<HTMLInputElement>, field: 'emails' | 'subjects' | 'paragraphs') => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
  
    if (field === 'emails') {
        const file = files[0];
        if (file.type !== 'text/plain') { event.target.value = ''; return; }
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            if (content) {
                setCampaignEmails(prev => prev ? `${prev}\n${content}` : content);
            }
        };
        reader.readAsText(file);
    } else if (field === 'subjects') {
        const fileReadPromises = Array.from(files).map(file => {
            return new Promise<string>((resolve, reject) => {
                if (file.type === 'text/plain') {
                    const reader = new FileReader();
                    reader.onload = e => resolve(e.target?.result as string);
                    reader.onerror = e => reject(e);
                    reader.readAsText(file);
                } else {
                    resolve('');
                }
            });
        });

        Promise.all(fileReadPromises).then(contents => {
            const validContents = contents.join('\n').split('\n').map(line => line.trim()).filter(Boolean);
            if (validContents.length === 0) return;

            const newPairs = validContents.map(content => ({
                id: Date.now() + Math.random(),
                value: content
            }));
            
            setCampaignSubjects(prev => {
              const existingNonEmpty = prev.filter(p => p.value.trim());
              const combined = [...existingNonEmpty, ...newPairs].slice(0, 10);
              return combined.length > 0 ? combined : [{ id: Date.now(), value: "" }];
            });
        });
    } else if (field === 'paragraphs') {
        const fileReadPromises = Array.from(files).map(file => {
            return new Promise<string>((resolve, reject) => {
                if (file.type === 'text/plain') {
                    const reader = new FileReader();
                    reader.onload = e => resolve(e.target?.result as string);
                    reader.onerror = e => reject(e);
                    reader.readAsText(file);
                } else {
                    resolve('');
                }
            });
        });

        Promise.all(fileReadPromises).then(contents => {
            const validContents = contents.filter(Boolean);
            if (validContents.length === 0) return;

            const newPairs = validContents.map(content => ({
                id: Date.now() + Math.random(),
                value: content
            }));
            
            setCampaignParagraphs(prev => {
              const existingNonEmpty = prev.filter(p => p.value.trim());
              const combined = [...existingNonEmpty, ...newPairs].slice(0, 10);
              return combined.length > 0 ? combined : [{ id: Date.now(), value: "" }];
            });
        });
    }

    event.target.value = '';
  };
  
  const proceedToGenerateCampaign = () => {
    const emails = campaignEmails.split('\n').map(e => e.trim()).filter(Boolean).slice(0, 100);
    const subjects = campaignSubjects.map(s => s.value.trim()).filter(Boolean);
    const paragraphs = campaignParagraphs.map(p => p.value.trim()).filter(Boolean);

    if (emails.length === 0) {
        toast({ title: "Validation Error", description: "Please provide at least one email address.", variant: "destructive" });
        return;
    }
    if (subjects.length === 0) {
        toast({ title: "Validation Error", description: "Please provide at least one subject.", variant: "destructive" });
        return;
    }
    if (paragraphs.length === 0) {
        toast({ title: "Validation Error", description: "Please provide at least one paragraph.", variant: "destructive" });
        return;
    }
    if (subjects.length !== paragraphs.length) {
        toast({ title: "Validation Error", description: "The number of subjects must be equal to the number of paragraphs.", variant: "destructive" });
        return;
    }

    const times = generateTimeList(emails.length, campaignStartTime, campaignTimeInterval);
    const generatedOutput: CampaignLineItem[] = [];

    for (let i = 0; i < emails.length; i++) {
        generatedOutput.push({
            id: `${Date.now()}-${i}`,
            email: emails[i],
            subject: subjects[i % subjects.length],
            paragraph: paragraphs[i % paragraphs.length],
            time: times[i],
            copiedFields: new Set(),
        });
    }
    
    setCampaignOutput(generatedOutput);
    setCampaignHasGenerated(true);
    toast({
        title: "Campaign Generated",
        description: `Successfully generated ${generatedOutput.length} campaign lines.`,
    });
  }

  const handleGenerateCampaign = () => {
    const emailList = campaignEmails.split('\n').map(e => e.trim()).filter(Boolean);
    if (emailList.length > 100) {
      setEmailLimitInfo({
        count: emailList.length,
        onConfirm: () => {
          setShowEmailLimitDialog(false);
          proceedToGenerateCampaign();
        }
      });
      setShowEmailLimitDialog(true);
    } else {
      proceedToGenerateCampaign();
    }
  };
  
  const handleClearCampaignBuilder = () => {
    setCampaignEmails("");
    setCampaignSubjects([{ id: Date.now(), value: "" }]);
    setCampaignParagraphs([{ id: Date.now(), value: "" }]);
    setCampaignOutput([]);
    setCampaignHasGenerated(false);
    setCampaignStartTime("09:00");
    setCampaignTimeInterval(5);
  };
  
  const handleCampaignFieldCopied = (id: string, field: keyof Omit<CampaignLineItem, 'id' | 'copiedFields'>) => {
    if (campaignCopyAction === 'mark') {
        setCampaignOutput(prev => prev.map(item => {
            if (item.id === id) {
                const newCopiedFields = new Set(item.copiedFields);
                newCopiedFields.add(field);
                return { ...item, copiedFields: newCopiedFields };
            }
            return item;
        }));
        return;
    }

    if (campaignCopyAction === 'remove_field') {
        setCampaignOutput(prev => {
            const nextState = prev.map(item => {
                if (item.id === id) {
                    const newItem = { ...item, [field]: null };
                    
                    const remainingFields = (Object.keys(newItem) as Array<keyof CampaignLineItem>)
                        .filter(key => key !== 'id' && key !== 'copiedFields' && newItem[key] !== null);
                    
                    if (remainingFields.length === 0) {
                        return null; 
                    }
                    return newItem;
                }
                return item;
            }).filter(Boolean) as CampaignLineItem[];

            return nextState;
        });
    }
};


  const handleStartEditCampaignItem = (item: CampaignLineItem) => {
    setEditingCampaignItemId(item.id);
    setEditingCampaignItemData({
      email: item.email || '',
      subject: item.subject || '',
      paragraph: item.paragraph || '',
      time: item.time || '',
    });
  };
  
  const handleSaveCampaignItemEdit = (id: string) => {
    setCampaignOutput(prev => prev.map(item =>
        item.id === id ? { ...item, ...editingCampaignItemData, copiedFields: new Set() } as CampaignLineItem : item
    ));
    setEditingCampaignItemId(null);
  };
  
  const handleCancelCampaignItemEdit = () => {
    setEditingCampaignItemId(null);
  };

  const clearActiveTool = () => {
    switch(activeTool) {
      case 'copyable': handleClearAll(); break;
      case 'copyable-paragraphs': handleClearAllParagraphs(); break;
      case 'find-replace': handleClearFindReplace(); break;
      case 'data-extractor': handleClearExtractor(); break;
      case 'phone-extractor': handleClearPhoneExtractor(); break;
      case 'query-generator': handleClearQueryGenerator(); break;
      case 'time-interval-generator': handleClearTimeGenerator(); break;
      case 'line-repeater': handleClearLineRepeater(); break;
      case 'campaign-builder': handleClearCampaignBuilder(); break;
      case 'list-sorter': setListSorterInput(''); setListSorterOutput(''); break;
      case 'case-converter': setCaseConverterInput(''); setCaseConverterOutput(''); break;
      case 'counter': setCounterInput(''); handleCounterUpdate(''); break;
      case 'list-comparison': setListA(''); setListB(''); setComparisonResult(null); break;
      case 'duplicate-remover': setDuplicateRemoverInput(''); setDuplicateRemoverOutput(''); setDuplicatesRemovedCount(null); break;
    }
  }

  // --- NEW TOOLS LOGIC ---

  // List Sorter
  const handleSortList = (sortType: 'az' | 'za' | 'num' | 'rev' | 'shuf') => {
    const lines = listSorterInput.split('\n').filter(l => l.trim() !== '');
    let sortedLines = [...lines];

    switch (sortType) {
        case 'az':
            sortedLines.sort((a, b) => a.localeCompare(b));
            break;
        case 'za':
            sortedLines.sort((a, b) => b.localeCompare(a));
            break;
        case 'num':
            sortedLines.sort((a, b) => {
                const numA = parseFloat(a);
                const numB = parseFloat(b);
                if (!isNaN(numA) && !isNaN(numB)) {
                    return numA - numB;
                }
                return a.localeCompare(b);
            });
            break;
        case 'rev':
            sortedLines.reverse();
            break;
        case 'shuf':
            for (let i = sortedLines.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [sortedLines[i], sortedLines[j]] = [sortedLines[j], sortedLines[i]];
            }
            break;
    }
    setListSorterOutput(sortedLines.join('\n'));
    toast({ title: "List Updated", description: "The list has been successfully sorted/shuffled." });
  };
  
  // Case Converter
  const handleConvertCase = (caseType: 'upper' | 'lower' | 'title' | 'sentence') => {
    let text = caseConverterInput;
    switch (caseType) {
        case 'upper':
            text = text.toUpperCase();
            break;
        case 'lower':
            text = text.toLowerCase();
            break;
        case 'title':
            text = text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
            break;
        case 'sentence':
            text = text.toLowerCase().replace(/(^\w{1}|\.\s*\w{1})/g, char => char.toUpperCase());
            break;
    }
    setCaseConverterOutput(text);
  };
  
  // Character & Word Counter
  const handleCounterUpdate = (text: string) => {
    setCounterInput(text);
    const words = text.match(/\b\w+\b/g) || [];
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [];
    const paragraphs = text.split(/\n+/).filter(p => p.trim() !== '');

    setCounts({
        words: words.length,
        chars,
        charsNoSpaces,
        sentences: sentences.length,
        paragraphs: paragraphs.length,
    });
  };
  
  // List Comparison
  const handleCompareLists = () => {
    const listALines = listA.split('\n').map(l => l.trim()).filter(Boolean);
    const listBLines = listB.split('\n').map(l => l.trim()).filter(Boolean);

    const setA = new Set(isCaseSensitiveComparison ? listALines : listALines.map(l => l.toLowerCase()));
    const setB = new Set(isCaseSensitiveComparison ? listBLines : listBLines.map(l => l.toLowerCase()));
    
    const uniqueA = listALines.filter(item => !setB.has(isCaseSensitiveComparison ? item : item.toLowerCase()));
    const uniqueB = listBLines.filter(item => !setA.has(isCaseSensitiveComparison ? item : item.toLowerCase()));
    const inBoth = listALines.filter(item => setB.has(isCaseSensitiveComparison ? item : item.toLowerCase()));

    setComparisonResult({ uniqueA, uniqueB, inBoth });
    toast({ title: "Comparison Complete", description: "The lists have been successfully compared." });
  };

  // Duplicate Remover
  const handleRemoveDuplicates = () => {
      const lines = duplicateRemoverInput.split('\n');
      const seen = new Set();
      const uniqueLines: string[] = [];
      
      lines.forEach(line => {
          const key = isCaseSensitiveRemover ? line.trim() : line.trim().toLowerCase();
          if (key && !seen.has(key)) {
              seen.add(key);
              uniqueLines.push(line);
          } else if (!key && !seen.has('')) { // Handle empty lines once
              seen.add('');
              uniqueLines.push(line);
          }
      });
      
      const removedCount = lines.length - uniqueLines.length;
      setDuplicatesRemovedCount(removedCount);
      setDuplicateRemoverOutput(uniqueLines.join('\n'));
      toast({ title: "Duplicates Removed", description: `${removedCount} duplicate line(s) were removed.` });
  };


  const renderToolContent = () => {
    if (activeTool === "copyable") {
      return (
        <div className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="lines"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Your Text</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your lines here...
Each line will be converted.
Like this one."
                        className="min-h-[150px] resize-y"
                        {...field}
                        disabled={hasConverted}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Settings className="h-4 w-4" />
                  <Label>Copy Action</Label>
                </div>
                <RadioGroup
                  value={copyAction}
                  onValueChange={(value: CopyAction) => setCopyAction(value)}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-8"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mark" id="r1" />
                    <Label htmlFor="r1" className="cursor-pointer">
                      Mark as copied
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="remove" id="r2" />
                    <Label htmlFor="r2" className="cursor-pointer">
                      Remove when copied
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {!hasConverted ? (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button type="button" variant="outline" className="w-full" onClick={() => handlePaste((text) => form.setValue("lines", text))}>
                      <ClipboardPaste className="mr-2 h-4 w-4" />
                      Paste from Clipboard
                    </Button>
                    <div className="w-full">
                      <Button type="button" variant="outline" className="w-full" onClick={() => copyableFileInputRef.current?.click()}>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload from File
                      </Button>
                      <input
                        type="file"
                        ref={copyableFileInputRef}
                        className="hidden"
                        accept=".txt"
                        onChange={handleCopyableFileUpload}
                      />
                      <p className="mt-1 text-center text-xs text-destructive">Only .txt files are supported.</p>
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Convert to Copyable Lines
                  </Button>
                </div>
              ) : null}
            </form>
          </Form>
          {hasConverted && renderLineItems()}
        </div>
      );
    }
    if (activeTool === "copyable-paragraphs") {
      return (
        <div className="space-y-6">
            {!paragraphHasConverted ? (
              <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Paragraphs</CardTitle>
                        <CardDescription>Add up to 10 paragraphs manually. Each one will be a separate copyable item.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="max-h-[400px] w-full space-y-3 overflow-y-auto pr-2">
                            {copyableParagraphs.map((pair, index) => (
                                <div key={pair.id} className="flex items-start gap-2">
                                    <Textarea
                                        id={`paragraph-${pair.id}`}
                                        placeholder={`Paragraph ${index + 1}`}
                                        value={pair.value}
                                        onChange={(e) => handleDynamicPairChange(pair.id, e.target.value, setCopyableParagraphs)}
                                        className="min-h-[80px]"
                                    />
                                    {copyableParagraphs.length > 1 && (
                                        <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" onClick={() => handleRemoveDynamicPair(pair.id, setCopyableParagraphs)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                        {copyableParagraphs.length < 10 && (
                            <Button variant="outline" className="w-full" onClick={() => handleAddDynamicPair(setCopyableParagraphs, copyableParagraphs)}>
                                <PlusCircle className="mr-2 h-4 w-4"/> Add Paragraph
                            </Button>
                        )}
                        <Separator />
                        <div className="w-full">
                            <Button type="button" variant="outline" className="w-full" onClick={() => paragraphFileInputRef.current?.click()}>
                                <Upload className="mr-2 h-4 w-4" /> Upload From Files
                            </Button>
                            <input type="file" ref={paragraphFileInputRef} className="hidden" accept=".txt" onChange={handleParagraphFileUpload} multiple />
                            <p className="mt-1 text-center text-xs text-destructive">Only .txt files are supported. Each file is treated as one paragraph.</p>
                        </div>
                    </CardContent>
                </Card>

                <Button onClick={onParagraphSubmit} size="lg">
                    <Pilcrow className="mr-2 h-5 w-5" />
                    Convert to Copyable Paragraphs
                </Button>
              </div>
            ) : (
                <div className="space-y-6">
                     <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Settings className="h-4 w-4" />
                        <Label>Copy Action</Label>
                        </div>
                        <RadioGroup
                        value={paragraphCopyAction}
                        onValueChange={(value: CopyAction) => setParagraphCopyAction(value)}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-8"
                        >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mark" id="pr1" />
                            <Label htmlFor="pr1" className="cursor-pointer">
                            Mark as copied
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="remove" id="pr2" />
                            <Label htmlFor="pr2" className="cursor-pointer">
                            Remove when copied
                            </Label>
                        </div>
                        </RadioGroup>
                    </div>
                    {renderParagraphItems()}
                </div>
            )}
        </div>
      );
    }
    if (activeTool === "find-replace") {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
            <div className="space-y-3">
              <Label htmlFor="fr-input">Input</Label>
              <Textarea
                id="fr-input"
                placeholder="Paste the text you want to modify here..."
                className="min-h-[300px] resize-y"
                value={findReplaceInput}
                onChange={(e) => {
                  setFindReplaceInput(e.target.value);
                  setFindReplaceOutput("");
                  setReplacementsCount(null);
                }}
              />
              <div className="flex flex-col sm:flex-row gap-2">
                <Button type="button" variant="outline" className="w-full" onClick={() => handlePaste(setFindReplaceInput)}>
                  <ClipboardPaste className="mr-2 h-4 w-4" />
                  Paste
                </Button>
                <div className="w-full">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => findReplaceFileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload File
                  </Button>
                   <input
                    type="file"
                    ref={findReplaceFileInputRef}
                    className="hidden"
                    accept=".txt"
                    onChange={handleFindReplaceFileUpload}
                  />
                  <p className="mt-1 text-center text-xs text-destructive">Only .txt files are supported.</p>
                </div>
              </div>
            </div>

             <div className="flex flex-col items-center justify-start gap-4 self-stretch pt-8">
              <div className="w-full space-y-4 rounded-lg border p-4">
                <div className="max-h-80 w-full space-y-3 overflow-y-auto pr-2">
                  {findReplacePairs.map((pair, index) => (
                    <div key={pair.id} className="flex items-start gap-1.5 rounded-md border bg-muted/50 p-2">
                       <div className="flex-grow space-y-1.5">
                         <Input
                          id={`find-${pair.id}`}
                          placeholder={`Find ${index + 1}`}
                          value={pair.find}
                          onChange={(e) => handlePairChange(pair.id, 'find', e.target.value)}
                         />
                         <Input
                          id={`replace-${pair.id}`}
                          placeholder={`Replace ${index + 1}`}
                          value={pair.replace}
                          onChange={(e) => handlePairChange(pair.id, 'replace', e.target.value)}
                         />
                       </div>
                       {findReplacePairs.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 flex-shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleRemovePair(pair.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                       )}
                    </div>
                  ))}
                </div>

                {findReplacePairs.length < 10 && (
                  <Button variant="outline" className="w-full" onClick={handleAddPair}>
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    Add More
                  </Button>
                )}
                <Separator />
                <Button
                  type="button"
                  className="w-full"
                  onClick={handleBulkReplace}
                  disabled={!findReplaceInput || findReplacePairs.every(p => p.find.trim() === "")}
                >
                  <Replace className="mr-2 h-4 w-4" />
                  Replace All
                </Button>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleMoveOutputToInput(setFindReplaceInput, findReplaceOutput)} aria-label="Move Output to Input">
                 <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
              </Button>
             </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="fr-output">Output</Label>
                {replacementsCount !== null && (
                  <span className="text-sm font-normal text-muted-foreground">
                    ({replacementsCount} replacement{replacementsCount !== 1 ? 's' : ''})
                  </span>
                )}
              </div>
              <Textarea
                id="fr-output"
                readOnly
                className="min-h-[300px] resize-y bg-muted/50"
                value={findReplaceOutput}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleUndo}
                  disabled={outputHistory.length === 0}
                >
                  <Undo className="mr-2 h-4 w-4" />
                  Undo
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleCopyOutput(findReplaceOutput)}
                  disabled={!findReplaceOutput}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <div className="w-full">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => promptDownload(findReplaceOutput, 'niazi-tools-replace-output.txt')}
                    disabled={!findReplaceOutput}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <p className="mt-1 text-center text-xs text-destructive">The output is downloaded as a .txt file.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (activeTool === "data-extractor") {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Input Column */}
                    <div className="space-y-4">
                        <Label htmlFor="extractor-input">Input Data</Label>
                        <Textarea
                            id="extractor-input"
                            placeholder="Paste text here, or upload a file to extract emails from..."
                            className="min-h-[300px] resize-y"
                            value={extractorInput}
                            onChange={(e) => setExtractorInput(e.target.value)}
                        />
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Button type="button" variant="outline" className="w-full" onClick={() => handlePaste(setExtractorInput)}>
                                <ClipboardPaste className="mr-2 h-4 w-4" />
                                Paste
                            </Button>
                             <div className="w-full">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => extractorFileInputRef.current?.click()}
                                >
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload File
                                </Button>
                                <input
                                    type="file"
                                    ref={extractorFileInputRef}
                                    className="hidden"
                                    accept=".txt,.csv,.xlsx,.xls"
                                    onChange={handleExtractorFileUpload}
                                    multiple
                                />
                                <p className="mt-1 text-center text-xs text-destructive">Supports .txt, .csv, .xls, and .xlsx files.</p>
                            </div>
                        </div>
                        
                        <Separator />

                        <Button
                            type="button"
                            className="w-full"
                            onClick={handleExtractData}
                            disabled={!extractorInput}
                        >
                            <Mail className="mr-2 h-4 w-4" />
                            Extract Emails
                        </Button>
                    </div>

                    {/* Output Column */}
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <Label htmlFor="extractor-output">Unique Emails</Label>
                                {uniqueEmailCount !== null && (
                                    <span className="text-sm font-normal text-muted-foreground">
                                        ({uniqueEmailCount} unique)
                                    </span>
                                )}
                            </div>
                            <Textarea
                                id="extractor-output"
                                readOnly
                                className="min-h-[150px] resize-y bg-muted/50"
                                value={extractorOutput}
                                placeholder="Unique emails will appear here..."
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => handleCopyOutput(extractorOutput)}
                                    disabled={!extractorOutput}
                                >
                                    <Copy className="mr-2 h-4 w-4" />
                                    Copy List
                                </Button>
                                <div className="w-full">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => promptDownload(extractorOutput, 'niazi-tools-unique-emails.txt')}
                                        disabled={!extractorOutput}
                                    >
                                        <Download className="mr-2 h-4 w-4" />
                                        Download List
                                    </Button>
                                    <p className="mt-1 text-center text-xs text-destructive">The output is downloaded as a .txt file.</p>
                                </div>
                            </div>
                        </div>

                        {extractedData && extractedData.length > 0 && (
                            <div>
                                <Separator className="my-4" />
                                <div className="flex justify-between items-center mb-2">
                                    <Label>Email Counts</Label>
                                    {totalEmailCount !== null && (
                                        <span className="text-sm font-normal text-muted-foreground">
                                            ({totalEmailCount} total)
                                        </span>
                                    )}
                                </div>
                                <ScrollArea className="h-[150px] w-full rounded-md border p-3 bg-muted/50">
                                    <div className="space-y-2">
                                        {extractedData.map(({ email, count }) => (
                                            <div key={email} className="flex justify-between items-center text-sm gap-4">
                                                <span className="truncate pr-2">{email}</span>
                                                <Badge variant="secondary" className="flex-shrink-0">{count}</Badge>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>
                        )}
                        {extractedData?.length === 0 && (
                             <div className="text-center text-muted-foreground mt-4 p-8 border rounded-lg bg-muted/50">
                                <p>No email addresses were found in the input text.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
    if (activeTool === "phone-extractor") {
      return (
          <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {/* Input Column */}
                  <div className="space-y-4">
                      <Label htmlFor="phone-extractor-input">Input Data</Label>
                      <Textarea
                          id="phone-extractor-input"
                          placeholder="Paste text here, or upload a file to extract phone numbers from..."
                          className="min-h-[300px] resize-y"
                          value={phoneExtractorInput}
                          onChange={(e) => setPhoneExtractorInput(e.target.value)}
                      />
                      <div className="flex flex-col sm:flex-row gap-2">
                          <Button type="button" variant="outline" className="w-full" onClick={() => handlePaste(setPhoneExtractorInput)}>
                              <ClipboardPaste className="mr-2 h-4 w-4" />
                              Paste
                          </Button>
                           <div className="w-full">
                              <Button
                                  type="button"
                                  variant="outline"
                                  className="w-full"
                                  onClick={() => phoneExtractorFileInputRef.current?.click()}
                              >
                                  <Upload className="mr-2 h-4 w-4" />
                                  Upload File
                              </Button>
                              <input
                                  type="file"
                                  ref={phoneExtractorFileInputRef}
                                  className="hidden"
                                  accept=".txt,.csv,.xlsx,.xls"
                                  onChange={handlePhoneExtractorFileUpload}
                                  multiple
                              />
                              <p className="mt-1 text-center text-xs text-destructive">Supports .txt, .csv, .xls, and .xlsx files.</p>
                          </div>
                      </div>
                      
                      <Separator />

                      <Button
                          type="button"
                          className="w-full"
                          onClick={handleExtractPhones}
                          disabled={!phoneExtractorInput}
                      >
                          <Phone className="mr-2 h-4 w-4" />
                          Extract Phone Numbers
                      </Button>
                  </div>

                  {/* Output Column */}
                  <div className="space-y-4">
                      <div>
                          <div className="flex justify-between items-center mb-2">
                              <Label htmlFor="phone-extractor-output">Unique Phone Numbers</Label>
                              {uniquePhoneCount !== null && (
                                  <span className="text-sm font-normal text-muted-foreground">
                                      ({uniquePhoneCount} unique)
                                  </span>
                              )}
                          </div>
                          <Textarea
                              id="phone-extractor-output"
                              readOnly
                              className="min-h-[150px] resize-y bg-muted/50"
                              value={phoneExtractorOutput}
                              placeholder="Unique phone numbers will appear here..."
                          />
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                              <Button
                                  variant="outline"
                                  className="w-full"
                                  onClick={() => handleCopyOutput(phoneExtractorOutput)}
                                  disabled={!phoneExtractorOutput}
                              >
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy List
                              </Button>
                              <div className="w-full">
                                  <Button
                                      variant="outline"
                                      className="w-full"
                                      onClick={() => promptDownload(phoneExtractorOutput, 'niazi-tools-unique-phones.txt')}
                                      disabled={!phoneExtractorOutput}
                                  >
                                      <Download className="mr-2 h-4 w-4" />
                                      Download List
                                  </Button>
                                  <p className="mt-1 text-center text-xs text-destructive">The output is downloaded as a .txt file.</p>
                              </div>
                          </div>
                      </div>

                      {extractedPhones && extractedPhones.length > 0 && (
                          <div>
                              <Separator className="my-4" />
                              <div className="flex justify-between items-center mb-2">
                                  <Label>Phone Number Counts</Label>
                                  {totalPhoneCount !== null && (
                                      <span className="text-sm font-normal text-muted-foreground">
                                          ({totalPhoneCount} total)
                                      </span>
                                  )}
                              </div>
                              <ScrollArea className="h-[150px] w-full rounded-md border p-3 bg-muted/50">
                                  <div className="space-y-2">
                                      {extractedPhones.map(({ phone, count }) => (
                                          <div key={phone} className="flex justify-between items-center text-sm gap-4">
                                              <span className="truncate pr-2">{phone}</span>
                                              <Badge variant="secondary" className="flex-shrink-0">{count}</Badge>
                                          </div>
                                      ))}
                                  </div>
                              </ScrollArea>
                          </div>
                      )}
                      {extractedPhones?.length === 0 && (
                           <div className="text-center text-muted-foreground mt-4 p-8 border rounded-lg bg-muted/50">
                              <p>No phone numbers were found in the input text.</p>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )
    }
    if (activeTool === "query-generator") {
      return (
          <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {/* Input Column */}
                  <div className="space-y-4">
                      <div className="space-y-2">
                          <Label htmlFor="query-service">Service Name</Label>
                          <Input
                              id="query-service"
                              placeholder="e.g., General Contractor, Plumber..."
                              value={queryService}
                              onChange={(e) => setQueryService(e.target.value)}
                          />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="query-country">Country</Label>
                          <Select value={queryCountry} onValueChange={setQueryCountry}>
                              <SelectTrigger id="query-country">
                                  <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="uk">United Kingdom</SelectItem>
                                  <SelectItem value="usa">United States</SelectItem>
                                  <SelectItem value="canada">Canada</SelectItem>
                                  <SelectItem value="australia">Australia</SelectItem>
                              </SelectContent>
                          </Select>
                           {['usa', 'canada', 'australia'].includes(queryCountry) && (
                                <p className="text-xs text-muted-foreground mt-1">
                                    Note: Generating queries for {queryCountry.toUpperCase()} may take a few moments as it fetches a large city list.
                                </p>
                            )}
                      </div>
                      <Button
                          type="button"
                          className="w-full"
                          onClick={handleGenerateQueries}
                          disabled={!queryService.trim() || !queryCountry || isQueryGenerating}
                      >
                          {isQueryGenerating ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                              <FileSearch className="mr-2 h-4 w-4" />
                          )}
                          {isQueryGenerating ? 'Generating...' : 'Generate Queries'}
                      </Button>
                  </div>

                  {/* Output Column */}
                  <div className="space-y-4">
                      <div className="space-y-2">
                          <Label htmlFor="query-output">Generated Queries</Label>
                          <Textarea
                              id="query-output"
                              readOnly
                              className="min-h-[200px] resize-y bg-muted/50"
                              value={queryOutput}
                              placeholder="Generated queries will appear here..."
                          />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => handleCopyOutput(queryOutput)}
                              disabled={!queryOutput}
                          >
                              <Copy className="mr-2 h-4 w-4" />
                              Copy List
                          </Button>
                          <div className="w-full">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => promptDownload(queryOutput, 'niazi-tools-queries.txt')}
                                disabled={!queryOutput}
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Download List
                            </Button>
                            <p className="mt-1 text-center text-xs text-destructive">The output is downloaded as a .txt file.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )
  }
  if (activeTool === "time-interval-generator") {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Input Column */}
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="start-time">Start Time</Label>
                            <Input
                                id="start-time"
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="interval">Interval (mins)</Label>
                            <Input
                                id="interval"
                                type="number"
                                value={timeInterval}
                                onChange={(e) => setTimeInterval(Math.max(1, parseInt(e.target.value) || 1))}
                                min="1"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="count">Count</Label>
                            <Input
                                id="count"
                                type="number"
                                value={timeCount}
                                onChange={(e) => setTimeCount(Math.max(1, parseInt(e.target.value) || 1))}
                                min="1"
                            />
                        </div>
                    </div>
                    <Button
                        type="button"
                        className="w-full"
                        onClick={handleGenerateTimes}
                        disabled={!startTime}
                    >
                        <Clock className="mr-2 h-4 w-4" />
                        Generate Times
                    </Button>
                </div>

                {/* Output Column */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="time-output">Generated Times</Label>
                        <Textarea
                            id="time-output"
                            readOnly
                            className="min-h-[200px] resize-y bg-muted/50"
                            value={timeOutput}
                            placeholder="Generated time list will appear here..."
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handleCopyOutput(timeOutput)}
                            disabled={!timeOutput}
                        >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy List
                        </Button>
                        <div className="w-full">
                          <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => promptDownload(timeOutput, 'niazi-tools-times.txt')}
                              disabled={!timeOutput}
                          >
                              <Download className="mr-2 h-4 w-4" />
                              Download List
                          </Button>
                           <p className="mt-1 text-center text-xs text-destructive">The output is downloaded as a .txt file.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
  if (activeTool === "line-repeater") {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Input Column */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="repeater-input">Line to Repeat</Label>
                            <Input
                                id="repeater-input"
                                placeholder="Enter the text to repeat..."
                                value={lineRepeaterInput}
                                onChange={(e) => setLineRepeaterInput(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="repeater-count">Number of Times</Label>
                            <Input
                                id="repeater-count"
                                type="number"
                                value={lineRepeaterCount}
                                onChange={(e) => setLineRepeaterCount(Math.max(1, parseInt(e.target.value) || 1))}
                                min="1"
                            />
                        </div>
                        <Button
                            type="button"
                            className="w-full"
                            onClick={handleGenerateRepeatedLines}
                            disabled={!lineRepeaterInput.trim()}
                        >
                            <Repeat className="mr-2 h-4 w-4" />
                            Generate Lines
                        </Button>
                    </div>

                    {/* Output Column */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="repeater-output">Generated Lines</Label>
                            <Textarea
                                id="repeater-output"
                                readOnly
                                className="min-h-[200px] resize-y bg-muted/50"
                                value={lineRepeaterOutput}
                                placeholder="Repeated lines will appear here..."
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => handleCopyOutput(lineRepeaterOutput)}
                                disabled={!lineRepeaterOutput}
                            >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy List
                            </Button>
                            <div className="w-full">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => promptDownload(lineRepeaterOutput, 'niazi-tools-repeated-lines.txt')}
                                    disabled={!lineRepeaterOutput}
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download List
                                </Button>
                                <p className="mt-1 text-center text-xs text-destructive">The output is downloaded as a .txt file.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    if (activeTool === "campaign-builder") {
    return (
        <div className="space-y-8">
            {!campaignHasGenerated ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Column 1: Emails and Subjects */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>1. Emails</CardTitle>
                            <CardDescription>Paste or upload emails. If more than 100 are provided, only the first 100 will be used.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                             <Textarea
                                id="campaign-emails"
                                placeholder="email1@example.com
email2@example.com
..."
                                className="min-h-[150px] resize-y"
                                value={campaignEmails}
                                onChange={(e) => setCampaignEmails(e.target.value)}
                            />
                             <div className="flex flex-col sm:flex-row gap-2">
                                <Button type="button" variant="outline" className="w-full" onClick={() => handlePaste(setCampaignEmails)}>
                                    <ClipboardPaste className="mr-2 h-4 w-4" /> Paste
                                </Button>
                                <div className="w-full">
                                  <Button type="button" variant="outline" className="w-full" onClick={() => campaignBuilderEmailsRef.current?.click()}>
                                      <Upload className="mr-2 h-4 w-4" /> Upload
                                  </Button>
                                  <input type="file" ref={campaignBuilderEmailsRef} className="hidden" accept=".txt" onChange={(e) => handleCampaignFileUpload(e, 'emails')} />
                                  <p className="mt-1 text-center text-xs text-destructive">Only .txt files are supported.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                         <CardHeader>
                            <CardTitle>2. Subjects</CardTitle>
                            <CardDescription>Add up to 10 subject lines to rotate through.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                           <div className="max-h-80 w-full space-y-3 overflow-y-auto pr-2">
                                {campaignSubjects.map((pair, index) => (
                                    <div key={pair.id} className="flex items-center gap-2">
                                        <Input
                                            id={`subject-${pair.id}`}
                                            placeholder={`Subject ${index + 1}`}
                                            value={pair.value}
                                            onChange={(e) => handleDynamicPairChange(pair.id, e.target.value, setCampaignSubjects)}
                                        />
                                        {campaignSubjects.length > 1 && (
                                            <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" onClick={() => handleRemoveDynamicPair(pair.id, setCampaignSubjects)}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {campaignSubjects.length < 10 && (
                                <Button variant="outline" className="w-full" onClick={() => handleAddDynamicPair(setCampaignSubjects, campaignSubjects)}>
                                    <PlusCircle className="mr-2 h-4 w-4"/> Add Subject
                                </Button>
                            )}
                             <div className="w-full">
                                <Button type="button" variant="outline" className="w-full" onClick={() => campaignBuilderSubjectsRef.current?.click()}>
                                  <Upload className="mr-2 h-4 w-4" /> Upload Subjects
                                </Button>
                                <input type="file" ref={campaignBuilderSubjectsRef} className="hidden" accept=".txt" onChange={(e) => handleCampaignFileUpload(e, 'subjects')} multiple/>
                                <p className="mt-1 text-center text-xs text-destructive">Only .txt files are supported. Each line is a subject.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Column 2: Paragraphs and Times */}
                <div className="space-y-6">
                    <Card>
                         <CardHeader>
                            <CardTitle>3. Paragraphs</CardTitle>
                            <CardDescription>Add paragraphs. Must match the number of subjects.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                           <div className="max-h-80 w-full space-y-3 overflow-y-auto pr-2">
                                {campaignParagraphs.map((pair, index) => (
                                    <div key={pair.id} className="flex items-start gap-2">
                                        <Textarea
                                            id={`paragraph-${pair.id}`}
                                            placeholder={`Paragraph ${index + 1}`}
                                            value={pair.value}
                                            onChange={(e) => handleDynamicPairChange(pair.id, e.target.value, setCampaignParagraphs)}
                                            className="min-h-[80px]"
                                        />
                                        {campaignParagraphs.length > 1 && (
                                            <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" onClick={() => handleRemoveDynamicPair(pair.id, setCampaignParagraphs)}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {campaignParagraphs.length < 10 && (
                                <Button variant="outline" className="w-full" onClick={() => handleAddDynamicPair(setCampaignParagraphs, campaignParagraphs)}>
                                    <PlusCircle className="mr-2 h-4 w-4"/> Add Paragraph
                                </Button>
                            )}
                            <div className="w-full">
                                <Button type="button" variant="outline" className="w-full" onClick={() => campaignBuilderParagraphsRef.current?.click()}>
                                  <Upload className="mr-2 h-4 w-4" /> Upload Paragraphs
                                </Button>
                                <input type="file" ref={campaignBuilderParagraphsRef} className="hidden" accept=".txt" onChange={(e) => handleCampaignFileUpload(e, 'paragraphs')} multiple/>
                                <p className="mt-1 text-center text-xs text-destructive">Only .txt files are supported. Each file is one paragraph.</p>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>4. Times</CardTitle>
                            <CardDescription>Set the start time and interval for automatic time generation.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               <div className="space-y-2">
                                    <Label htmlFor="campaign-start-time">Start Time</Label>
                                    <Input
                                        id="campaign-start-time"
                                        type="time"
                                        value={campaignStartTime}
                                        onChange={(e) => setCampaignStartTime(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="campaign-interval">Interval (mins)</Label>
                                    <Input
                                        id="campaign-interval"
                                        type="number"
                                        value={campaignTimeInterval}
                                        onChange={(e) => setCampaignTimeInterval(Math.max(1, parseInt(e.target.value) || 1))}
                                        min="1"
                                    />
                                </div>
                            </div>
                             <p className="text-sm text-muted-foreground text-center">Times will be auto-generated based on the number of emails you provide.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
            ) : null}

            {campaignHasGenerated ? (
                 <>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Settings className="h-4 w-4" />
                            <Label>Copy Action</Label>
                        </div>
                        <RadioGroup value={campaignCopyAction} onValueChange={(v: CampaignCopyAction) => setCampaignCopyAction(v)} className="flex gap-4 sm:gap-8 flex-wrap">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="mark" id="cbr1" />
                                <Label htmlFor="cbr1" className="cursor-pointer">Mark field as copied</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="remove_field" id="cbr3" />
                                <Label htmlFor="cbr3" className="cursor-pointer">Remove field on copy</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {renderCampaignOutput()}
                </>
            ) : null }

            <div className="mt-8 flex flex-col gap-4">
              {!campaignHasGenerated ? (
                <Button onClick={handleGenerateCampaign} size="lg">
                    <MailPlus className="mr-2 h-5 w-5" />
                    Generate Campaign List
                </Button>
              ) : null}
            </div>
        </div>
    )
}
if (activeTool === 'list-sorter') {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
                <Label htmlFor="list-sorter-input">Input List</Label>
                <Textarea
                    id="list-sorter-input"
                    placeholder="Paste your list here...
Each line will be treated as an item."
                    className="min-h-[300px] resize-y"
                    value={listSorterInput}
                    onChange={(e) => setListSorterInput(e.target.value)}
                />
                <Button type="button" variant="outline" className="w-full" onClick={() => handlePaste(setListSorterInput)}>
                    <ClipboardPaste className="mr-2 h-4 w-4" /> Paste
                </Button>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <Button onClick={() => handleSortList('az')}>Sort A-Z</Button>
                    <Button onClick={() => handleSortList('za')}>Sort Z-A</Button>
                    <Button onClick={() => handleSortList('num')}>Sort Numeric</Button>
                    <Button onClick={() => handleSortList('rev')}>Reverse</Button>
                    <Button onClick={() => handleSortList('shuf')}>Shuffle</Button>
                </div>
            </div>
            <div className="space-y-4">
                <Label htmlFor="list-sorter-output">Output</Label>
                <Textarea
                    id="list-sorter-output"
                    readOnly
                    className="min-h-[300px] resize-y bg-muted/50"
                    value={listSorterOutput}
                    placeholder="Sorted list will appear here..."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button variant="outline" className="w-full" onClick={() => handleCopyOutput(listSorterOutput)} disabled={!listSorterOutput}>
                        <Copy className="mr-2 h-4 w-4" /> Copy
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => promptDownload(listSorterOutput, 'niazi-tools-sorted-list.txt')} disabled={!listSorterOutput}>
                        <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                </div>
            </div>
        </div>
    );
}

if (activeTool === 'case-converter') {
    return (
        <div className="space-y-6">
            <Textarea
                placeholder="Paste your text here to convert its case..."
                className="min-h-[250px] resize-y"
                value={caseConverterInput}
                onChange={(e) => {
                    setCaseConverterInput(e.target.value);
                    setCaseConverterOutput('');
                }}
            />
            <div className="flex flex-col sm:flex-row gap-2">
                <Button type="button" variant="outline" className="w-full" onClick={() => handlePaste(setCaseConverterInput)}>
                    <ClipboardPaste className="mr-2 h-4 w-4" /> Paste
                </Button>
                 <Button type="button" variant="outline" className="w-full" onClick={() => handleMoveOutputToInput(setCaseConverterInput, caseConverterOutput)}>
                    <ArrowRightLeft className="mr-2 h-4 w-4" /> Move Output to Input
                </Button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                <Button onClick={() => handleConvertCase('upper')}>UPPERCASE</Button>
                <Button onClick={() => handleConvertCase('lower')}>lowercase</Button>
                <Button onClick={() => handleConvertCase('title')}>Title Case</Button>
                <Button onClick={() => handleConvertCase('sentence')}>Sentence case</Button>
            </div>
            <Separator />
            <div className="space-y-2">
                 <Label htmlFor="case-converter-output">Output</Label>
                 <Textarea
                    id="case-converter-output"
                    readOnly
                    className="min-h-[250px] resize-y bg-muted/50"
                    value={caseConverterOutput}
                    placeholder="Converted text will appear here..."
                />
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Button variant="outline" className="w-full" onClick={() => handleCopyOutput(caseConverterOutput)} disabled={!caseConverterOutput}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
                <Button variant="outline" className="w-full" onClick={() => promptDownload(caseConverterOutput, 'niazi-tools-case-converted.txt')} disabled={!caseConverterOutput}>
                    <Download className="mr-2 h-4 w-4" /> Download
                </Button>
            </div>
        </div>
    );
}

if (activeTool === 'counter') {
    return (
        <div className="space-y-6">
            <Textarea
                placeholder="Paste or type your text here to get statistics..."
                className="min-h-[300px] resize-y"
                value={counterInput}
                onChange={(e) => handleCounterUpdate(e.target.value)}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
                <Card>
                    <CardHeader><CardTitle>{counts.words}</CardTitle></CardHeader>
                    <CardContent><CardDescription>Words</CardDescription></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>{counts.chars}</CardTitle></CardHeader>
                    <CardContent><CardDescription>Characters</CardDescription></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>{counts.charsNoSpaces}</CardTitle></CardHeader>
                    <CardContent><CardDescription>No Spaces</CardDescription></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>{counts.sentences}</CardTitle></CardHeader>
                    <CardContent><CardDescription>Sentences</CardDescription></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>{counts.paragraphs}</CardTitle></CardHeader>
                    <CardContent><CardDescription>Paragraphs</CardDescription></CardContent>
                </Card>
            </div>
        </div>
    );
}

if (activeTool === 'list-comparison') {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-2">
                    <Label htmlFor="list-a">List A</Label>
                    <Textarea id="list-a" value={listA} onChange={(e) => setListA(e.target.value)} className="min-h-[250px]" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="list-b">List B</Label>
                    <Textarea id="list-b" value={listB} onChange={(e) => setListB(e.target.value)} className="min-h-[250px]" />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Button className="w-full sm:w-auto" onClick={handleCompareLists} disabled={!listA || !listB}>
                    Compare Lists
                </Button>
                 <div className="flex items-center space-x-2">
                    <input type="checkbox" id="case-sensitive-compare" checked={isCaseSensitiveComparison} onChange={(e) => setIsCaseSensitiveComparison(e.target.checked)} className="h-4 w-4" />
                    <Label htmlFor="case-sensitive-compare">Case-sensitive</Label>
                </div>
            </div>
            {comparisonResult && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label>Unique to List A ({comparisonResult.uniqueA.length})</Label>
                        <Textarea readOnly value={comparisonResult.uniqueA.join('\n')} className="min-h-[200px] bg-muted/50" />
                        <Button variant="outline" className="w-full" onClick={() => handleCopyOutput(comparisonResult.uniqueA.join('\n'))}>Copy</Button>
                    </div>
                    <div className="space-y-2">
                        <Label>In Both Lists ({comparisonResult.inBoth.length})</Label>
                        <Textarea readOnly value={comparisonResult.inBoth.join('\n')} className="min-h-[200px] bg-muted/50" />
                        <Button variant="outline" className="w-full" onClick={() => handleCopyOutput(comparisonResult.inBoth.join('\n'))}>Copy</Button>
                    </div>
                    <div className="space-y-2">
                        <Label>Unique to List B ({comparisonResult.uniqueB.length})</Label>
                        <Textarea readOnly value={comparisonResult.uniqueB.join('\n')} className="min-h-[200px] bg-muted/50" />
                        <Button variant="outline" className="w-full" onClick={() => handleCopyOutput(comparisonResult.uniqueB.join('\n'))}>Copy</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

if (activeTool === 'duplicate-remover') {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
                <Label htmlFor="duplicate-input">Input List</Label>
                <Textarea
                    id="duplicate-input"
                    placeholder="Paste your list here to remove duplicates..."
                    className="min-h-[300px] resize-y"
                    value={duplicateRemoverInput}
                    onChange={(e) => setDuplicateRemoverInput(e.target.value)}
                />
                 <div className="flex items-center space-x-2">
                    <input type="checkbox" id="case-sensitive-remover" checked={isCaseSensitiveRemover} onChange={(e) => setIsCaseSensitiveRemover(e.target.checked)} className="h-4 w-4" />
                    <Label htmlFor="case-sensitive-remover">Case-sensitive</Label>
                </div>
                <Button className="w-full" onClick={handleRemoveDuplicates} disabled={!duplicateRemoverInput}>
                    Remove Duplicates
                </Button>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label htmlFor="duplicate-output">Unique List</Label>
                    {duplicatesRemovedCount !== null && (
                        <span className="text-sm text-muted-foreground">{duplicatesRemovedCount} removed</span>
                    )}
                </div>
                <Textarea
                    id="duplicate-output"
                    readOnly
                    className="min-h-[300px] resize-y bg-muted/50"
                    value={duplicateRemoverOutput}
                    placeholder="Unique list will appear here..."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button variant="outline" className="w-full" onClick={() => handleCopyOutput(duplicateRemoverOutput)} disabled={!duplicateRemoverOutput}>
                        <Copy className="mr-2 h-4 w-4" /> Copy
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => promptDownload(duplicateRemoverOutput, 'niazi-tools-unique-list.txt')} disabled={!duplicateRemoverOutput}>
                        <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                </div>
            </div>
        </div>
    );
}

    return null;
  };

  const renderLineItems = () => (
    <div className="mt-8">
      <Separator className="my-6" />
      {lineItems.length > 0 ? (
        <>
          <h3 className="text-lg font-semibold text-center mb-4 text-foreground/80">
            Your Lines ({lineItems.length})
          </h3>
          <div className="space-y-3">
            {lineItems.map((item) => (
              <CopyableLine
                key={item.id}
                id={item.id}
                text={item.text}
                isCopied={item.copied}
                onCopy={() => handleLineCopied(item.id)}
                onUpdate={handleUpdateLine}
                onDelete={handleDeleteLine}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-muted-foreground py-8">
          <p>All items have been copied/removed.</p>
          <p className="text-sm">You can start over with a new list.</p>
        </div>
      )}
    </div>
  );

  const renderParagraphItems = () => (
    <div className="mt-8">
      <Separator className="my-6" />
      {paragraphItems.length > 0 ? (
        <>
          <h3 className="text-lg font-semibold text-center mb-4 text-foreground/80">
            Your Paragraphs ({paragraphItems.length})
          </h3>
          <div className="space-y-4">
            {paragraphItems.map((item) => (
              <CopyableParagraph
                key={item.id}
                id={item.id}
                text={item.text}
                isCopied={item.copied}
                onCopy={() => handleParagraphCopied(item.id)}
                onUpdate={handleUpdateParagraph}
                onDelete={handleDeleteParagraph}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-muted-foreground py-8">
          <p>All items have been copied/removed.</p>
          <p className="text-sm">You can start over with a new list.</p>
        </div>
      )}
    </div>
  );
  
  const CopyableField = ({ text, onCopy, isCopied = false }: { text: string; onCopy: () => void; isCopied?: boolean; }) => {
  
    const handleCopy = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (campaignCopyAction === 'mark' && isCopied) return;

        try {
            await navigator.clipboard.writeText(text);
            onCopy();
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };
  
    return (
        <div
            onClick={handleCopy}
            className={cn(
                "relative group flex items-center p-2 rounded-md border transition-all cursor-pointer bg-card hover:bg-accent/50",
                isCopied && "bg-primary/10 opacity-70 cursor-not-allowed"
            )}
        >
            <p className={cn(
                "flex-grow pr-8 text-sm truncate text-card-foreground",
                isCopied && "line-through"
            )}>
                {text}
            </p>
            <div className="absolute right-2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                {isCopied ? (
                    <Check className="h-4 w-4 text-primary" />
                ) : (
                    <Copy className="h-4 w-4 text-muted-foreground" />
                )}
            </div>
             {isCopied && !text.includes('group-hover') && <Check className="absolute right-2 h-4 w-4 text-primary" />}
        </div>
    );
  };
  
  const renderCampaignOutput = () => (
    <div className="mt-8">
        <Separator className="my-6" />
        {campaignOutput.length > 0 ? (
            <>
                <h3 className="text-lg font-semibold text-center mb-4 text-foreground/80">
                    Your Campaign Lines ({campaignOutput.length})
                </h3>
                <div className="space-y-4">
                    {campaignOutput.map((item, index) => (
                      editingCampaignItemId === item.id ? (
                        // EDITING STATE
                        <div key={item.id} className="p-4 border rounded-lg bg-accent/20 space-y-3">
                           <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold">{index + 1}</Badge>
                              <Input
                                value={editingCampaignItemData.email || ''}
                                onChange={(e) => setEditingCampaignItemData(d => ({ ...d, email: e.target.value }))}
                                className="font-semibold text-lg"
                              />
                           </div>
                           <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground pl-1">Subject</Label>
                            <Input value={editingCampaignItemData.subject || ''} onChange={(e) => setEditingCampaignItemData(d => ({...d, subject: e.target.value}))} />
                            <Label className="text-xs text-muted-foreground pl-1">Paragraph</Label>
                            <Textarea value={editingCampaignItemData.paragraph || ''} onChange={(e) => setEditingCampaignItemData(d => ({...d, paragraph: e.target.value}))} className="min-h-[100px]" />
                            <Label className="text-xs text-muted-foreground pl-1">Time</Label>
                            <Input value={editingCampaignItemData.time || ''} onChange={(e) => setEditingCampaignItemData(d => ({...d, time: e.target.value}))} />
                           </div>
                           <div className="flex justify-end gap-2">
                              <Button variant="ghost" onClick={handleCancelCampaignItemEdit}><X className="mr-2 h-4 w-4"/>Cancel</Button>
                              <Button onClick={() => handleSaveCampaignItemEdit(item.id)}><Save className="mr-2 h-4 w-4"/>Save</Button>
                           </div>
                        </div>
                      ) : (
                        // DISPLAY STATE
                        <div key={item.id} className="p-4 border rounded-lg bg-card/50 space-y-3 relative group">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                  <Badge variant="secondary" className="w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold">{index + 1}</Badge>
                                  {item.email && <p className="font-semibold text-lg truncate">{item.email}</p>}
                              </div>
                              <Button size="icon" variant="ghost" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleStartEditCampaignItem(item)}>
                                <Pencil className="h-4 w-4"/>
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-y-3 overflow-x-auto">
                              {item.email !== null && (
                                <div className="space-y-2 min-w-[250px]">
                                  <Label className="text-xs text-muted-foreground pl-1">Email</Label>
                                  <CopyableField
                                    text={item.email}
                                    onCopy={() => handleCampaignFieldCopied(item.id, 'email')}
                                    isCopied={item.copiedFields.has('email')}
                                  />
                                </div>
                              )}
                              {item.subject !== null && (
                                <div className="space-y-2 min-w-[250px]">
                                  <Label className="text-xs text-muted-foreground pl-1">Subject</Label>
                                  <CopyableField
                                    text={item.subject}
                                    onCopy={() => handleCampaignFieldCopied(item.id, 'subject')}
                                    isCopied={item.copiedFields.has('subject')}
                                  />
                                </div>
                              )}
                              {item.paragraph !== null && (
                                <div className="space-y-2 min-w-[250px]">
                                    <Label className="text-xs text-muted-foreground pl-1">Paragraph</Label>
                                    <div onClick={async (e) => {
                                          e.stopPropagation();
                                          if (campaignCopyAction === 'mark' && item.copiedFields.has('paragraph')) return;
                                          try {
                                              await navigator.clipboard.writeText(item.paragraph || '');
                                              handleCampaignFieldCopied(item.id, 'paragraph');
                                          } catch (err) {
                                              console.error("Failed to copy: ", err);
                                          }
                                        }}
                                        className={cn(
                                          "relative group/p flex items-start p-3 rounded-md border transition-all cursor-pointer bg-card hover:bg-accent/50",
                                          item.copiedFields.has('paragraph') && "bg-primary/10 opacity-70 cursor-not-allowed"
                                        )}
                                      >
                                        <p className={cn("flex-grow pr-8 text-sm whitespace-pre-wrap text-card-foreground", item.copiedFields.has('paragraph') && "line-through")}>
                                            {item.paragraph}
                                        </p>
                                        <div className="absolute top-2 right-2 flex items-center opacity-0 group-hover/p:opacity-100 transition-opacity">
                                            {item.copiedFields.has('paragraph') ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
                                        </div>
                                        {item.copiedFields.has('paragraph') && <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />}
                                    </div>
                                </div>
                              )}
                              {item.time !== null && (
                                <div className="space-y-2 min-w-[250px]">
                                  <Label className="text-xs text-muted-foreground pl-1">Time</Label>
                                  <CopyableField
                                    text={item.time}
                                    onCopy={() => handleCampaignFieldCopied(item.id, 'time')}
                                    isCopied={item.copiedFields.has('time')}
                                  />
                                </div>
                              )}
                            </div>
                        </div>
                      )
                    ))}
                </div>
            </>
        ) : (
            <div className="text-center text-muted-foreground py-8">
                <p>All items have been copied/removed.</p>
                <p className="text-sm">You can start over to generate a new list.</p>
            </div>
        )}
    </div>
  );
  

  const getToolTitle = () => {
    if (activeTool === "copyable") return "Copyable Lines";
    if (activeTool === "copyable-paragraphs") return "Copyable Paragraphs";
    if (activeTool === "find-replace") return "Find & Replace";
    if (activeTool === "data-extractor") return "Email Extractor";
    if (activeTool === "phone-extractor") return "Phone Number Extractor";
    if (activeTool === "query-generator") return "Query Generator";
    if (activeTool === "time-interval-generator") return "Time Interval Generator";
    if (activeTool === "line-repeater") return "Line Repeater";
    if (activeTool === "campaign-builder") return "Email Campaign Builder";
    if (activeTool === "list-sorter") return "List Sorter & Randomizer";
    if (activeTool === "case-converter") return "Case Converter";
    if (activeTool === "counter") return "Character & Word Counter";
    if (activeTool === "list-comparison") return "List Comparison Tool";
    if (activeTool === "duplicate-remover") return "Duplicate Line Remover";
    return "";
  };

  const getToolDescription = () => {
    if (activeTool === "copyable") return "Paste your text to convert it into individual lines, perfect for easy copying.";
    if (activeTool === "copyable-paragraphs") return "Add or upload distinct blocks of text to create a list of copyable paragraphs.";
    if (activeTool === "find-replace") return "Perform powerful find and replace operations on your text with multiple rules at once.";
    if (activeTool === "data-extractor") return "Quickly extract all unique email addresses from large blocks of text or uploaded files.";
    if (activeTool === "phone-extractor") return "Extract phone numbers from text and Excel files with high precision.";
    if (activeTool === "query-generator") return "Generate location-based search queries for marketing and research.";
    if (activeTool === "time-interval-generator") return "Quickly generate a list of time entries for schedules, logs, or planning.";
    if (activeTool === "line-repeater") return "Repeat a single line of text multiple times to generate a large list.";
    if (activeTool === "campaign-builder") return "Assemble structured data for email campaigns from multiple dynamic inputs.";
    if (activeTool === "list-sorter") return "Sort, reverse, or shuffle your lists alphabetically or numerically.";
    if (activeTool === "case-converter") return "Quickly convert text between different capitalization formats.";
    if (activeTool === "counter") return "Get real-time counts of words, characters, sentences, and paragraphs.";
    if (activeTool === "list-comparison") return "Compare two lists to find unique items and common entries.";
    if (activeTool === "duplicate-remover") return "Clean up your lists by removing all duplicate lines.";
    return "";
  };

  return (
      <main className="relative flex flex-col items-center justify-start p-4 sm:p-6 md:p-8">
        <header className="absolute top-6 left-6 right-6 z-50 flex justify-between items-center">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <div className="flex items-center gap-3">
              <a href="https://github.com/muhammad-arsalan-niazi" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                <Button size="icon" className="rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:shadow-lg hover:shadow-primary/20">
                  <Github className="text-white dark:text-black" />
                </Button>
              </a>
              <a href="https://www.facebook.com/MuhammadArsalanNiazi.Official/" target="_blank" rel="noopener noreferrer" aria-label="Facebook Profile">
                <Button size="icon" className="rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:shadow-lg hover:shadow-primary/20">
                  <Facebook className="text-white dark:text-black" />
                </Button>
              </a>
               <a href="https://www.linkedin.com/in/muhammad-arsalan-niazi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                 <Button size="icon" className="rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:shadow-lg hover:shadow-primary/20">
                  <Linkedin className="text-white dark:text-black" />
                </Button>
              </a>
            </div>
        </header>

        <AlertDialog open={showNicknameDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Welcome to Niazi Tools!</AlertDialogTitle>
              <AlertDialogDescription>
                What should we call you? Your data will be stored locally in this app.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex items-center space-x-2 pt-2">
              <Input
                id="nickname"
                placeholder="Enter your nickname"
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveNickname();
                }}
              />
            </div>
            <AlertDialogFooter>
              <Button onClick={handleSaveNickname} disabled={!nicknameInput.trim()}>Save</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Your Privacy is Our Priority</AlertDialogTitle>
              <AlertDialogDescription>
                Niazi Tools is designed to be fully offline. All your data is stored locally in this app and is never collected or sent to any server. Your privacy is guaranteed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Got it!</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <AlertDialog open={showEmailLimitDialog} onOpenChange={setShowEmailLimitDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Email Limit Exceeded</AlertDialogTitle>
              <AlertDialogDescription>
                You provided {emailLimitInfo?.count} emails. This tool will use the first 100 entries to generate the campaign. Do you want to continue?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setEmailLimitInfo(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={emailLimitInfo?.onConfirm}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Download File</AlertDialogTitle>
              <AlertDialogDescription>
                Enter a new filename for your download. It will be saved as a .txt file.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="pt-2">
              <Label htmlFor="filename" className="sr-only">Filename</Label>
              <Input
                  id="filename"
                  value={newFilename}
                  onChange={(e) => setNewFilename(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") executeDownload();
                  }}
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={executeDownload} disabled={!newFilename.trim()}>
                Download
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={showLargeGenerationDialog} onOpenChange={setShowLargeGenerationDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>🚀 Whoa, That's a Big Request!</AlertDialogTitle>
              <AlertDialogDescription>
                You're generating a very large list! To keep your browser running fast and smooth, we'll create this file and download it for you directly instead of displaying it on the page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setLargeGenerationInfo(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={largeGenerationInfo?.onConfirm}>
                Download Now
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>


        <div className={`w-full ${activeTool ? 'max-w-6xl' : 'max-w-4xl'} transition-all duration-500`}>
          <AppHeader />

          {activeTool === null ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {nickname ? (
                    <>
                      Welcome back,{' '}
                      <span className="font-semibold text-cyan-400">
                        {nickname}!
                      </span>
                    </>
                  ) : (
                    <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-animated-gradient">
                      Welcome!
                    </span>
                  )}
                </h2>
                <p className="text-muted-foreground">
                  Select a tool below to get started.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in-50 zoom-in-95 duration-500">
                <ToolCard
                  icon={<Copy className="h-8 w-8 text-primary" />}
                  title="Copyable Lines"
                  description="Convert text into individual, easy-to-copy lines."
                  onClick={() => setActiveTool("copyable")}
                />
                <ToolCard
                  icon={<Pilcrow className="h-8 w-8 text-primary" />}
                  title="Copyable Paragraphs"
                  description="Add or upload distinct blocks of text to create a list of copyable paragraphs."
                  onClick={() => setActiveTool("copyable-paragraphs")}
                />
                <ToolCard
                  icon={<Replace className="h-8 w-8 text-primary" />}
                  title="Find & Replace"
                  description="A powerful tool to find and replace text in bulk."
                  onClick={() => setActiveTool("find-replace")}
                />
                 <ToolCard
                  icon={<Mail className="h-8 w-8 text-primary" />}
                  title="Email Extractor"
                  description="Extract all email addresses from text or files."
                  onClick={() => setActiveTool("data-extractor")}
                />
                 <ToolCard
                  icon={<Phone className="h-8 w-8 text-primary" />}
                  title="Phone Number Extractor"
                  description="Extract phone numbers from text and Excel files."
                  onClick={() => setActiveTool("phone-extractor")}
                  isNew
                />
                <ToolCard
                  icon={<MapPin className="h-8 w-8 text-primary" />}
                  title="Query Generator"
                  description="Generate location-based search queries."
                  onClick={() => setActiveTool("query-generator")}
                />
                <ToolCard
                  icon={<Clock className="h-8 w-8 text-primary" />}
                  title="Time Interval Generator"
                  description="Generate a list of times for schedules or logs."
                  onClick={() => setActiveTool("time-interval-generator")}
                  isNew
                />
                <ToolCard
                  icon={<Repeat className="h-8 w-8 text-primary" />}
                  title="Line Repeater"
                  description="Repeat a single line of text multiple times."
                  onClick={() => setActiveTool("line-repeater")}
                  isNew
                />
                <ToolCard
                  icon={<MailPlus className="h-8 w-8 text-primary" />}
                  title="Email Campaign Builder"
                  description="Assemble campaign data from multiple inputs."
                  onClick={() => setActiveTool("campaign-builder")}
                  isNew
                />
                 <ToolCard
                  icon={<ListOrdered className="h-8 w-8 text-primary" />}
                  title="List Sorter & Randomizer"
                  description="Sort, reverse, or shuffle lists of text instantly."
                  onClick={() => setActiveTool("list-sorter")}
                  isNew
                />
                <ToolCard
                  icon={<CaseSensitive className="h-8 w-8 text-primary" />}
                  title="Case Converter"
                  description="Change text to UPPERCASE, lowercase, and more."
                  onClick={() => setActiveTool("case-converter")}
                  isNew
                />
                 <ToolCard
                  icon={<Calculator className="h-8 w-8 text-primary" />}
                  title="Character & Word Counter"
                  description="Get real-time counts for text statistics."
                  onClick={() => setActiveTool("counter")}
                  isNew
                />
                 <ToolCard
                  icon={<Diff className="h-8 w-8 text-primary" />}
                  title="List Comparison"
                  description="Find differences and similarities between two lists."
                  onClick={() => setActiveTool("list-comparison")}
                  isNew
                />
                <ToolCard
                  icon={<Eraser className="h-8 w-8 text-primary" />}
                  title="Duplicate Line Remover"
                  description="Clean up lists by removing duplicate entries."
                  onClick={() => setActiveTool("duplicate-remover")}
                  isNew
                />
              </div>

              <Separator className="my-12" />

              <div className="space-y-8">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-center text-3xl text-cyan-400">About Us</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <Layers size={32} className="text-primary" />
                        <h2 className="text-4xl font-headline tracking-wider bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-animated-gradient">
                          Niazi Tools
                        </h2>
                    </div>
                    <p className="text-muted-foreground">
                      Niazi Tools is your all-in-one suite of free, offline-first utilities designed to make your daily text-processing tasks easier and faster. 🚀 From cleaning up text to extracting data, every tool is built with privacy and efficiency in mind. ✨
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-center text-3xl">Frequently Asked Questions 🤔</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Is Niazi Tools free to use? 🤑</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          Yes, absolutely! All tools are completely free to use with no hidden charges or advertisements.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Is my data safe and private? 🛡️</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          Yes. Your privacy is our top priority. The app works entirely in your browser and is designed to be fully offline. Your data is processed and stored only on your local device and is never sent to any server.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4">
                        <AccordionTrigger>How do I switch between dark and light mode? 🎨</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          You can toggle the theme using the Sun/Moon button located at the top-left corner of the screen. Your preference is automatically saved in your browser for your next visit.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-5">
                        <AccordionTrigger>How can I suggest a new tool or feature? 💡</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          We'd love to hear your ideas! You can reach out to the creator, Muhammad Arsalan Niazi, through the social media links in the header and footer of the page.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="w-full animate-in fade-in-50 duration-500">
              <div className="mb-6 flex justify-between items-center">
                <Button
                  className="bg-gray-900 text-white dark:bg-gray-600 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20 transition-all"
                  onClick={handleBackToHome}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Home
                </Button>
                <Button
                  variant="destructive"
                  onClick={clearActiveTool}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Start Over
                </Button>
              </div>
              <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold tracking-tight text-cyan-400">{getToolTitle()}</h2>
                  <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">{getToolDescription()}</p>
              </div>
              <Card className="w-full shadow-lg">
                <CardContent className="pt-6">{renderToolContent()}</CardContent>
              </Card>
              <ToolHelp tool={activeTool} toolName={getToolTitle()} />
            </div>
          )}
        </div>
        <div className="fixed bottom-6 right-6 z-50 transition-opacity duration-300">
           {showScroll && (
                <Button size="icon" onClick={scrollTop} className="rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90">
                    <ArrowUp />
                </Button>
            )}
        </div>
        <div className="fixed bottom-6 left-6 z-50">
            <Button 
                size="icon" 
                onClick={() => setShowPrivacyDialog(true)}
                className="rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                <ShieldCheck />
            </Button>
        </div>
      </main>
  );
}
