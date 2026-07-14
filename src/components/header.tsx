"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { Moon, Sun, Layers, Menu, Home, BookOpen, Mail, FileText, Shield, Github, Facebook, Linkedin, Briefcase } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export function Header() {
  const [theme, setTheme] = useState('dark');
  const pathname = usePathname();

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

  const navLinks = [
    { name: 'Home / Tools', href: '/', icon: Home },
    { name: 'Blog / Guide', href: '/blog', icon: BookOpen },
    { name: 'Our Services', href: '/services', icon: Briefcase },
    { name: 'Contact & About', href: '/contact', icon: Mail },
  ];

  return (
    <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Layers className="text-primary h-6 w-6 sm:h-8 sm:w-8" />
          <h2 className="text-xl sm:text-2xl font-bold font-headline tracking-wider bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-animated-gradient">
            Niazi Tools
          </h2>
        </Link>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-px bg-border mx-2"></div>
          <a href="https://github.com/muhammad-arsalan-niazi" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
            <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-primary hover:bg-primary/10">
              <Github className="h-4 w-4" />
            </Button>
          </a>
          <a href="https://www.linkedin.com/in/muhammad-arsalan-niazi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-primary hover:bg-primary/10">
              <Linkedin className="h-4 w-4" />
            </Button>
          </a>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          
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
              <DropdownMenuContent align="end" className="w-64 mt-2 p-2">
                <DropdownMenuItem asChild className="p-3 mb-1 text-base">
                  <Link href="/" className="flex items-center cursor-pointer w-full"><Home className="mr-3 h-5 w-5" /> Home / Tools</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-3 mb-1 text-base">
                  <Link href="/blog" className="flex items-center cursor-pointer w-full"><BookOpen className="mr-3 h-5 w-5" /> Blog / Guide</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-3 mb-1 text-base">
                  <Link href="/services" className="flex items-center cursor-pointer w-full"><Briefcase className="mr-3 h-5 w-5" /> Our Services</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-3 mb-1 text-base">
                  <Link href="/contact" className="flex items-center cursor-pointer w-full"><Mail className="mr-3 h-5 w-5" /> Contact & About</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-3 mb-1 text-base">
                  <Link href="/privacy-policy" className="flex items-center cursor-pointer w-full"><Shield className="mr-3 h-5 w-5" /> Privacy Policy</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-3 text-base">
                  <Link href="/terms-of-service" className="flex items-center cursor-pointer w-full"><FileText className="mr-3 h-5 w-5" /> Terms of Service</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

      </div>
    </header>
  );
}
