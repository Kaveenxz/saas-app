// components/floating-card.tsx
"use client";

import { ReactNode } from "react";

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
}

export function FloatingCard({ children, className = "" }: FloatingCardProps) {
  return (
    <div className={`absolute glass rounded-xl p-3 pointer-events-none hidden lg:block ${className}`}>
      {children}
    </div>
  );
}