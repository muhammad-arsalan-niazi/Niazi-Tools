"use client";

import { useState, useEffect } from "react";

export function Copyright() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="mb-4">
      Copyright © {year ? year : new Date().getFullYear()}{' '}
      <span className="font-headline tracking-wider bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-animated-gradient">
        Niazi Tools
      </span>
      . Made with <span className="text-red-500">❤️</span> in Pakistan by{' '}
      <a
        href="https://github.com/muhammad-arsalan-niazi"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary hover:underline underline-offset-4"
      >
        Muhammad Arsalan Niazi
      </a>
      .
    </div>
  );
}

    