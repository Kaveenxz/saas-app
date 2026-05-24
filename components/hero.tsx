// components/hero.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FloatingCard } from "./floating-card";
import { MockBrowser } from "./mock-browser";

const rotatingWords = ["amazing", "effortless", "magical", "instant", "seamless"];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.2 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = "ripple-effect";
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center pt-32 pb-16 overflow-hidden px-4"
    >
      {/* Dot grid background */}
      <div className="dot-grid" />

      {/* Subtle floating orbs (original colors) */}
      <motion.div
        className="absolute w-[600px] h-[300px] rounded-full bg-foreground/5 blur-[90px] top-[-80px] left-1/2 -translate-x-1/2 pointer-events-none"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-foreground/5 blur-[90px] bottom-20 right-[5%] pointer-events-none"
        animate={{ y: [0, 25, 0], x: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full bg-foreground/5 blur-[90px] bottom-24 left-[5%] pointer-events-none"
        animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Floating cards with enhanced entrance animation */}
      <FloatingCard className="top-[28%] left-[4%] animate-float-card hover:scale-105 transition-all duration-300">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] font-mono text-text-muted">↑</span>
          <motion.span
            className="font-mono text-base font-medium text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            127%
          </motion.span>
        </div>
        <div className="text-[11px] font-mono text-text-muted">faster deploys</div>
        <div className="flex items-end gap-[2px] mt-2 h-5">
          {[6, 8, 5, 11, 9, 14, 12, 18].map((h, i) => (
            <motion.span
              key={i}
              className="w-[3px] bg-text-muted/50 rounded-full"
              initial={{ height: 0 }}
              animate={isInView ? { height: `${h * 0.7}px` } : {}}
              transition={{ delay: 0.5 + i * 0.03 }}
            />
          ))}
        </div>
      </FloatingCard>

      <FloatingCard className="top-[22%] right-[4%] animate-float-card animation-delay-1000 hover:scale-105 transition-all duration-300">
        <div className="text-[10px] font-mono text-text-muted mb-1.5">✓ 2,400 teams</div>
        <div className="flex -space-x-1">
          {["AK", "SL", "MR", "+"].map((initial, i) => (
            <motion.div
              key={i}
              className="w-5 h-5 rounded-full border-2 border-background bg-border-bright flex items-center justify-center text-[9px] font-mono text-text-muted"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              {initial}
            </motion.div>
          ))}
        </div>
      </FloatingCard>

      <FloatingCard className="bottom-[28%] right-[6%] animate-float-card animation-delay-3000 hover:scale-105 transition-all duration-300">
        <div className="text-[10px] font-mono text-text-muted mb-2">Uptime</div>
        <div className="flex items-end gap-1 h-7">
          {[60, 80, 70, 100, 90].map((h, i) => (
            <motion.div
              key={i}
              className="w-[5px] bg-text-muted rounded-t-sm"
              style={{ height: `${h * 0.28}px`, opacity: i === 3 ? 1 : 0.5 }}
              initial={{ height: 0 }}
              animate={isInView ? { height: `${h * 0.28}px` } : {}}
              transition={{ delay: 0.7 + i * 0.07 }}
            />
          ))}
        </div>
        <div className="font-mono text-sm font-medium mt-1">99.99%</div>
      </FloatingCard>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl w-full">
        {/* Announcement badge */}
        <motion.div
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 cursor-pointer hover:bg-white/10 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400/70 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500/80"></span>
          </span>
          <span className="font-mono text-[11px] tracking-wide text-text-dim">
            Announcing v2.0 — Read the changelog →
          </span>
        </motion.div>

        {/* Headline with rotating word - monochromatic */}
        <motion.h1
          className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-tighter leading-[1.05] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Your product does
          <br />
          <span className="relative inline-block min-w-[200px] text-center">
            <AnimatePresence mode="wait">
              <motion.em
                key={wordIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.5 }}
                className="absolute left-0 right-0 inline-block italic opacity-60"
              >
                {rotatingWords[wordIndex]}
              </motion.em>
            </AnimatePresence>
            <span className="opacity-0 italic">amazing</span>
          </span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-text-dim max-w-md mx-auto leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          The subtitle that explains what your product does in one or two sentences. Make it clear, not clever.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={createRipple}
            className="relative overflow-hidden px-7 py-3.5 bg-foreground text-background rounded-xl font-medium text-sm hover:scale-105 hover:shadow-xl transition-all duration-300 active:scale-95 group"
          >
            <span className="relative z-10 flex items-center gap-1">
              Get started for free
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
          <button
            onClick={createRipple}
            className="relative overflow-hidden px-7 py-3.5 glass border border-border rounded-xl text-sm text-text-dim hover:text-foreground hover:scale-105 hover:border-foreground/30 transition-all duration-300 active:scale-95"
          >
            View demo
          </button>
        </motion.div>

        <motion.p
          className="font-mono text-[11px] text-text-muted tracking-wide"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          No credit card required · Free plan available · Cancel anytime
        </motion.p>
      </div>

      {/* Mock Browser with hover scale */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mt-16"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <MockBrowser />
      </motion.div>
    </section>
  );
}