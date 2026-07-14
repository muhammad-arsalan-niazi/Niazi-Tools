"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { ArrowLeft, Moon, Sun, Layers, Menu, Home, BookOpen, Mail, FileText, Shield } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  const router = useRouter();
  const [theme, setTheme] = useState('dark');

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

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="w-full mb-8 animate-in fade-in-50 duration-500">
      {/* Top Brand & Actions Bar */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-border/40">
        
        {/* Brand Logo - Now on the left */}
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={() => router.push('/')}
        >
          <Layers className="text-primary h-8 w-8" />
          <h2 className="text-2xl font-headline tracking-wider bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-animated-gradient">
            Niazi Tools
          </h2>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Desktop Nav Links (Optional, kept hidden for simplicity as requested mobile menu) */}
          
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full shadow-md bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-blue-400" />}
          </Button>

          {/* Mobile/Tablet Hamburger Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full shadow-md">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex items-center cursor-pointer w-full"><Home className="mr-2 h-4 w-4" /> Home / Tools</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/blog" className="flex items-center cursor-pointer w-full"><BookOpen className="mr-2 h-4 w-4" /> SEO Blog</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact" className="flex items-center cursor-pointer w-full"><Mail className="mr-2 h-4 w-4" /> Contact & About</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/privacy-policy" className="flex items-center cursor-pointer w-full"><Shield className="mr-2 h-4 w-4" /> Privacy Policy</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/terms-of-service" className="flex items-center cursor-pointer w-full"><FileText className="mr-2 h-4 w-4" /> Terms of Service</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Back Button & Title Area */}
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
