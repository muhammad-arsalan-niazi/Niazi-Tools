"use client";

import { useState } from "react";
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
  Wand2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const formSchema = z.object({
  lines: z.string().min(1, "Please enter at least one line."),
});

type LineItem = {
  id: number;
  text: string;
  copied: boolean;
};

type CopyAction = "mark" | "remove";
type ActiveTool = "copyable" | "find-replace" | null;

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
    className="group cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-primary/20 hover:shadow-lg"
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

export default function Home() {
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [copyAction, setCopyAction] = useState<CopyAction>("mark");
  const [hasConverted, setHasConverted] = useState(false);
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lines: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const linesArray = values.lines
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line, index) => ({ id: index, text: line, copied: false }));
    setLineItems(linesArray);
    setHasConverted(true);
  }

  const handleLineCopied = (itemId: number) => {
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

  const handleClearAll = () => {
    setLineItems([]);
    form.reset();
    setHasConverted(false);
    setFindText("");
    setReplaceText("");
  };

  const handleReplaceAll = () => {
    if (!findText) return;
    setLineItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        text: item.text.replaceAll(findText, replaceText),
        copied: false, // Reset copied state on replace
      }))
    );
  };
  
  const handleBackToHome = () => {
    setActiveTool(null);
    // Optionally reset state when going home
    // handleClearAll(); 
  };

  const renderToolContent = () => {
    if (activeTool === "copyable") {
      return (
        <>
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
              <div className="flex flex-col sm:flex-row gap-2">
                {!hasConverted ? (
                  <Button type="submit" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Convert to Copyable Lines
                  </Button>
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
              </div>
            </form>
          </Form>
          {hasConverted && renderLineItems()}
        </>
      );
    }
    if (activeTool === "find-replace") {
      return (
        <>
          <div className="space-y-4 pt-2">
            <Label>Find and Replace across all your converted lines.</Label>
            <p className="text-sm text-muted-foreground">
              Note: This tool operates on the list of lines from the 'Copyable Lines' tool. Please convert some lines there first.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Find text..."
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
              />
              <Input
                placeholder="Replace with..."
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={handleReplaceAll}
              disabled={!findText || lineItems.length === 0}
            >
              <Replace className="mr-2 h-4 w-4" />
              Replace All
            </Button>
          </div>
          {hasConverted && renderLineItems()}
        </>
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
                text={item.text}
                isCopied={item.copied}
                onCopy={() => handleLineCopied(item.id)}
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
    return "";
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-svh p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-3xl">
        {activeTool === null ? (
          <>
            <div className="flex items-center justify-center gap-4 my-12 text-center">
              <Layers size={48} className="text-primary" />
              <h1 className="text-5xl font-headline tracking-wider bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-animated-gradient">
                Niazi Tools
              </h1>
            </div>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Welcome!
              </h2>
              <p className="text-muted-foreground">
                Select a tool below to get started.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in-50 zoom-in-95 duration-500">
              <ToolCard
                icon={<Copy className="h-8 w-8 text-primary" />}
                title="Copyable Lines"
                description="Convert a block of text into individual, easy-to-copy lines."
                onClick={() => setActiveTool("copyable")}
              />
              <ToolCard
                icon={<Replace className="h-8 w-8 text-primary" />}
                title="Find & Replace"
                description="Quickly find and replace text across all of your lines."
                onClick={() => setActiveTool("find-replace")}
              />
            </div>
          </>
        ) : (
          <div className="w-full animate-in fade-in-50 duration-500">
            <Button variant="ghost" className="mb-6" onClick={handleBackToHome}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Card className="w-full shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">{getToolTitle()}</CardTitle>
              </CardHeader>
              <CardContent>{renderToolContent()}</CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}