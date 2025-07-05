
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
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cleanupLines, CleanupLinesInput } from "@/ai/flows/cleanupLinesFlow";
import { extractData, ExtractDataInput } from "@/ai/flows/extractDataFlow";


const formSchema = z.object({
  lines: z.string().min(1, "Please enter at least one line."),
});

type LineItem = {
  id: string;
  text: string;
  copied: boolean;
};

type FindReplacePair = {
  id: number;
  find: string;
  replace: string;
}

type CopyAction = "mark" | "remove";
type ActiveTool = "copyable" | "find-replace" | "data-extractor" | null;

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
        answer: "The button is disabled if there's no text in the input box, or if none of the 'Find' fields in your rules have any text in them."
      }
    ]
  },
  'data-extractor': {
    description: "The Email Extractor is designed to quickly scan large amounts of text or multiple files to find and list all unique email addresses. 📧 It supports pasting text directly or uploading .txt, .csv, .xls, and .xlsx files.",
    faqs: [
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
        answer: "Yes. The tool reads text from all sheets within your uploaded Excel workbook to ensure no emails are missed."
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
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) => (
  <Card
    onClick={onClick}
    className="group cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-primary/20 hover:shadow-lg dark:bg-card/80"
  >
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
  const copyableFileInputRef = useRef<HTMLInputElement>(null);
  const findReplaceFileInputRef = useRef<HTMLInputElement>(null);
  const extractorFileInputRef = useRef<HTMLInputElement>(null);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
  const { toast } = useToast();

  // State for Find & Replace tool
  const [findReplaceInput, setFindReplaceInput] = useState("");
  const [findReplaceOutput, setFindReplaceOutput] = useState("");
  const [replacementsCount, setReplacementsCount] = useState<number | null>(null);
  const [findReplacePairs, setFindReplacePairs] = useState<FindReplacePair[]>([{ id: Date.now(), find: '', replace: '' }]);
  const [outputHistory, setOutputHistory] = useState<string[]>([]);

  // State for Email Extractor tool
  const [extractorInput, setExtractorInput] = useState("");
  const [extractorOutput, setExtractorOutput] = useState("");
  const [extractionCount, setExtractionCount] = useState<number | null>(null);

  // State for Download Dialog
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [downloadInfo, setDownloadInfo] = useState<{ text: string; filename: string } | null>(null);
  const [newFilename, setNewFilename] = useState("");


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lines: "",
    },
  });
  
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
          title: "Success 🎉",
          description: "Pasted from clipboard.",
        });
      } else {
        toast({
          title: "Clipboard Empty",
          description: "There was no text on your clipboard to paste.",
          variant: "destructive",
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
  };


  const handleCopyOutput = async (text: string) => {
    if (!text) return;
    try {
        await navigator.clipboard.writeText(text);
        toast({ title: "Success 🎉", description: "Output copied to clipboard." });
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
    
    toast({
      title: "Success 🎉",
      description: `Output downloaded as ${finalFilename}.`,
    });

    setShowDownloadDialog(false);
    setDownloadInfo(null);
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
  
  const handleMoveOutputToInput = () => {
    if (!findReplaceOutput) {
      toast({
        title: "Output is Empty",
        description: "There is nothing to move to the input field.",
        variant: "destructive"
      });
      return;
    };
    setFindReplaceInput(findReplaceOutput);
    setFindReplaceOutput("");
    setReplacementsCount(null);
    setOutputHistory([]);
    toast({
      title: "Moved to Input ✅",
      description: "The output has been moved to the input field for further editing.",
    });
  };

  // --- Email Extractor Tool Functions ---

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
              let fullText = '';
              workbook.SheetNames.forEach(sheetName => {
                const worksheet = workbook.Sheets[sheetName];
                const text = XLSX.utils.sheet_to_csv(worksheet, { header: 1 });
                fullText += text + '\n';
              });
              resolve(fullText);
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
        
        toast({
          title: "Files Processed ✅",
          description: `${supportedFileCount} of ${totalFileCount} files loaded. ${unsupportedCount > 0 ? `${unsupportedCount} unsupported files were ignored.` : ''}`,
        });
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

    setExtractorOutput("");
    setExtractionCount(null);

    // Simple email regex
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const matches = extractorInput.match(emailRegex);

    const uniqueEmails = matches ? [...new Set(matches)] : [];
    
    const formattedOutput = uniqueEmails.join('\n');
    
    setExtractorOutput(formattedOutput);
    setExtractionCount(uniqueEmails.length);
    
    if (uniqueEmails.length === 0) {
      toast({
        title: "No Emails Found",
        description: "Could not find any email addresses in the provided text.",
      });
    }
  };
  
  const handleClearExtractor = () => {
    setExtractorInput("");
    setExtractorOutput("");
    setExtractionCount(null);
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
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleClearAll}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Start Over
                </Button>
              )}
            </form>
          </Form>
          {hasConverted && renderLineItems()}
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
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => findReplaceFileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload File
                </Button>
              </div>
              <input
                type="file"
                ref={findReplaceFileInputRef}
                className="hidden"
                accept=".txt"
                onChange={handleFindReplaceFileUpload}
              />
              <p className="mt-1 text-center text-xs text-destructive">Only .txt files are supported.</p>
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
              <Button variant="ghost" size="icon" onClick={handleMoveOutputToInput} aria-label="Move Output to Input">
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
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => promptDownload(findReplaceOutput, 'niazi-tools-replace-output.txt')}
                  disabled={!findReplaceOutput}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
              <p className="mt-1 text-center text-xs text-destructive">The output is downloaded as a .txt file.</p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleClearFindReplace}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Start Over
          </Button>
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
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => extractorFileInputRef.current?.click()}
                            >
                                <Upload className="mr-2 h-4 w-4" />
                                Upload File
                            </Button>
                        </div>
                        <input
                            type="file"
                            ref={extractorFileInputRef}
                            className="hidden"
                            accept=".txt,.csv,.xlsx,.xls"
                            onChange={handleExtractorFileUpload}
                            multiple
                        />
                        <p className="mt-1 text-center text-xs text-destructive">Supports .txt, .csv, .xls, and .xlsx files.</p>
                        
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
                        <div className="flex justify-between items-center">
                            <Label htmlFor="extractor-output">Extracted Emails</Label>
                            {extractionCount !== null && (
                                <span className="text-sm font-normal text-muted-foreground">
                                    ({extractionCount} email{extractionCount !== 1 ? 's' : ''} found)
                                </span>
                            )}
                        </div>
                        <Textarea
                            id="extractor-output"
                            readOnly
                            className="min-h-[300px] resize-y bg-muted/50"
                            value={extractorOutput}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                           <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => handleCopyOutput(extractorOutput)}
                                disabled={!extractorOutput}
                            >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy Output
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => promptDownload(extractorOutput, 'niazi-tools-extracted-data.txt')}
                                disabled={!extractorOutput}
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Download .txt
                            </Button>
                        </div>
                    </div>
                </div>
                 <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleClearExtractor}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Start Over
                  </Button>
            </div>
        )
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

  const getToolTitle = () => {
    if (activeTool === "copyable") return "Copyable Lines";
    if (activeTool === "find-replace") return "Find & Replace";
    if (activeTool === "data-extractor") return "Email Extractor";
    return "";
  };

  const getToolDescription = () => {
    if (activeTool === "copyable") return "Paste your text to convert it into individual lines, perfect for easy copying.";
    if (activeTool === "find-replace") return "Perform powerful find and replace operations on your text with multiple rules at once.";
    if (activeTool === "data-extractor") return "Quickly extract all unique email addresses from large blocks of text or uploaded files.";
    return "";
  };

  return (
      <main className="relative flex flex-col items-center justify-start p-4 sm:p-6 md:p-8">
        <header className="absolute top-6 left-6 right-6 z-50 flex justify-between items-center">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:inline">Follow on</span>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in-50 zoom-in-95 duration-500">
                <ToolCard
                  icon={<Copy className="h-8 w-8 text-primary" />}
                  title="Copyable Lines"
                  description="Convert text into individual, easy-to-copy lines."
                  onClick={() => setActiveTool("copyable")}
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
              <Button
                className="mb-6 bg-gray-900 text-white dark:bg-gray-600 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20 transition-all"
                onClick={handleBackToHome}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Home
              </Button>
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
