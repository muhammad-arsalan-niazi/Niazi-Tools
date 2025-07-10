"use client";

import { useState } from "react";
import { Copy, Check, Pencil, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CopyableParagraphProps {
  id: string;
  text: string;
  isCopied: boolean;
  onCopy: () => void;
  onUpdate: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

export function CopyableParagraph({
  id,
  text,
  isCopied,
  onCopy,
  onUpdate,
  onDelete,
}: CopyableParagraphProps) {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleCopy = async () => {
    // Allow copying anytime except when editing.
    if (isEditing) return;

    try {
      await navigator.clipboard.writeText(text);

      // If it's not already copied, call the parent to update its state.
      if (!isCopied) {
        onCopy();
      }

    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };
  
  const handleSaveEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if(editText.trim()) {
      onUpdate(id, editText);
      setIsEditing(false);
    }
  };
  
  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditText(text);
    setIsEditing(false);
  };
  
  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  }
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  }

  if (isEditing) {
    return (
      <div className="flex flex-col gap-2 p-2 rounded-lg border bg-accent/20 border-accent/50">
        <Textarea
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-grow border-primary ring-offset-0 focus-visible:ring-1 focus-visible:ring-primary min-h-[120px]"
          autoFocus
          onClick={(e) => e.stopPropagation()}
        />
        <div className="flex items-center gap-1 self-end">
          <Button size="icon" variant="ghost" className="h-8 w-8 text-green-500 hover:text-green-500 hover:bg-green-500/10" onClick={handleSaveEdit}>
            <Check className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:text-red-500 hover:bg-red-500/10" onClick={handleCancelEdit}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleCopy}
      className={cn(
        "group relative flex items-start justify-between p-3 rounded-lg border transition-all duration-200 ease-in-out",
        "bg-card hover:bg-accent/10 hover:border-accent/50",
        isCopied
          ? "border-primary bg-primary/10 ring-2 ring-primary/50 ring-offset-2 ring-offset-background opacity-80"
          : "",
        isEditing ? "cursor-default" : "cursor-pointer"
      )}
      role="button"
      tabIndex={0}
      aria-label={`Copy: ${text}`}
      aria-live="polite"
      aria-disabled={isEditing}
    >
      <p
        className={cn(
          "flex-grow pr-12 font-body text-card-foreground whitespace-pre-wrap",
          isCopied && "line-through"
        )}
      >
        {text}
      </p>
      
      <div className="absolute top-2 right-2 flex-shrink-0 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleStartEdit}>
              <Pencil className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); handleCopy(); }}>
              <Copy className="h-4 w-4 text-muted-foreground" />
          </Button>
      </div>

      {isCopied && <Check className="absolute top-3 right-3 h-5 w-5 text-primary group-hover:opacity-0 transition-opacity" />}
    </div>
  );
}

    