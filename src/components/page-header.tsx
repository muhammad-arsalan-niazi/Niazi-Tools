"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
}

export function PageHeader({ title, description, showBackButton = false }: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="w-full mb-8 animate-in fade-in-50 duration-500">
      {/* Back Button Area */}
      {showBackButton && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <Button
            variant="secondary"
            size="sm"
            className="w-fit bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => router.push('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </div>
      )}
      
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
