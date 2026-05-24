// components/hero.tsx
"use client";

import { FloatingCard } from "./floating-card";
import { MockBrowser } from "./mock-browser";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center pt-32 pb-16 overflow-hidden px-4">
      {/* Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${
            typeof window !== "undefined" && document.documentElement.classList.contains("dark")
              ? "rgba(255,255,255,0.12)"
              : "rgba(0,0,0,0.08)"
          } 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
        }}
      />

      {/* Orbs */}
      <div className="hero-orb-1 absolute w-[600px] h-[300px] rounded-full bg-foreground/5 blur-[90px] top-[-80px] left-1/2 -translate-x-1/2 animate-float-orb pointer-events-none" />
      <div className="hero-orb-2 absolute w-[300px] h-[300px] rounded-full bg-foreground/5 blur-[90px] bottom-20 right-[5%] animate-float-card animation-delay-2000 pointer-events-none" />
      <div className="hero-orb-3 absolute w-[200px] h-[200px] rounded-full bg-foreground/5 blur-[90px] bottom-24 left-[5%] animate-float-card animation-delay-5000 pointer-events-none" />

      {/* Floating Cards */}
      <FloatingCard className="top-[28%] left-[4%] animate-float-card">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] font-mono text-text-muted">↑</span>
          <span className="font-mono text-base font-medium text-foreground">127%</span>
        </div>
        <div className="text-[11px] font-mono text-text-muted">faster deploys</div>
        <div className="flex items-end gap-[2px] mt-2 h-5">
          {[6, 8, 5, 11, 9, 14, 12, 18].map((h, i) => (
            <span key={i} className="w-[3px] bg-text-muted/50 rounded-full" style={{ height: `${h * 0.7}px` }} />
          ))}
        </div>
      </FloatingCard>

      <FloatingCard className="top-[22%] right-[4%] animate-float-card animation-delay-1000">
        <div className="text-[10px] font-mono text-text-muted mb-1.5">✓ 2,400 teams</div>
        <div className="flex -space-x-1">
          {["AK", "SL", "MR", "+"].map((initial, i) => (
            <div key={i} className="w-5 h-5 rounded-full border-2 border-background bg-border-bright flex items-center justify-center text-[9px] font-mono text-text-muted">
              {initial}
            </div>
          ))}
        </div>
      </FloatingCard>

      <FloatingCard className="bottom-[28%] right-[6%] animate-float-card animation-delay-3000">
        <div className="text-[10px] font-mono text-text-muted mb-2">Uptime</div>
        <div className="flex items-end gap-1 h-7">
          {[60, 80, 70, 100, 90].map((h, i) => (
            <div key={i} className="w-[5px] bg-text-muted rounded-t-sm" style={{ height: `${h * 0.28}px`, opacity: i === 3 ? 1 : 0.5 }} />
          ))}
        </div>
        <div className="font-mono text-sm font-medium mt-1">99.99%</div>
      </FloatingCard>

      {/* Content */}
      <div className="relative z-10 max-w-3xl w-full">
        <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 mb-8 animate-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
          <span className="font-mono text-[11px] tracking-wide text-text-dim">Announcing v2.0 — Read the changelog →</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-tighter leading-[1.05] mb-6 animate-fade-up animation-delay-100">
          Your product does<br />
          <em className="italic opacity-60">something amazing</em>
        </h1>

        <p className="text-base sm:text-lg text-text-dim max-w-md mx-auto leading-relaxed mb-10 animate-fade-up animation-delay-200">
          The subtitle that explains what your product does in one or two sentences. Make it clear, not clever.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-5 animate-fade-up animation-delay-300">
          <button className="px-6 py-3 bg-foreground text-background rounded-xl font-medium text-sm hover:opacity-90 transition">
            Get started for free →
          </button>
          <button className="px-6 py-3 glass border border-border rounded-xl text-sm text-text-dim hover:text-foreground transition">
            View demo
          </button>
        </div>

        <p className="font-mono text-[11px] text-text-muted tracking-wide animate-fade-up animation-delay-400">
          No credit card required · Free plan available · Cancel anytime
        </p>
      </div>

      {/* Mock Browser */}
      <div className="relative z-10 w-full max-w-4xl mt-16 animate-fade-up animation-delay-500">
        <MockBrowser />
      </div>
    </section>
  );
}