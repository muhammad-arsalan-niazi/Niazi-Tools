"use client";

import { useState } from "react";
import { Copy, Check, Pencil, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CopyableLineProps {
  id: string;
  text: string;
  isCopied: boolean;
  onCopy: () => void;
  onUpdate: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

export function CopyableLine({
  id,
  text,
  isCopied,
  onCopy,
  onUpdate,
  onDelete,
}: CopyableLineProps) {
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
      <div className="flex items-center justify-between p-2 rounded-lg border bg-accent/20 border-accent/50">
        <Input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-grow mr-2 border-primary ring-offset-0 focus-visible:ring-1 focus-visible:ring-primary"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSaveEdit(e as any);
            } else if (e.key === 'Escape') {
              handleCancelEdit(e as any);
            }
          }}
          autoFocus
          onClick={(e) => e.stopPropagation()}
        />
        <div className="flex items-center gap-1">
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
        "group relative flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ease-in-out cursor-pointer",
        "bg-card hover:bg-accent/10 hover:border-accent/50",
        isCopied
          ? "border-primary bg-primary/10 ring-2 ring-primary/50 ring-offset-2 ring-offset-background opacity-80"
          : ""
      )}
      role="button"
      tabIndex={0}
      aria-label={`Copy: ${text}`}
      aria-live="polite"
      aria-disabled={isEditing}
    >
      <span
        className={cn(
          "flex-grow pr-4 truncate font-body text-card-foreground",
          isCopied && "line-through"
        )}
      >
        {text}
      </span>
       <div className="flex-shrink-0 w-auto h-5 flex items-center justify-center gap-2">
        {/* Always visible when copied, but fades out when the group is hovered */}
        {isCopied && <Check className="h-5 w-5 text-primary group-hover:opacity-0 transition-opacity" />}

        {/* Action buttons are positioned absolutely to prevent layout shift and appear on hover */}
        <div className="absolute right-3 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleStartEdit}>
                <Pencil className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 text-muted-foreground" />
            </Button>
            {/* The copy button is now always available on hover */}
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); handleCopy(); }}>
                <Copy className="h-4 w-4 text-muted-foreground" />
            </Button>
        </div>
        {/* Fallback icon for non-copied state to maintain spacing and hover effect. */}
        {!isCopied && <Copy className="h-4 w-4 text-transparent group-hover:opacity-0" />}
      </div>
    </div>
  );
}