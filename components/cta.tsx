// components/cta.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Sparkles, ArrowRight, Eye } from "lucide-react";

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse following glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Ripple effect for buttons
  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = "ripple-effect";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 text-center relative overflow-hidden"
    >
      {/* Background animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-foreground/5 blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-foreground/5 blur-[120px] animate-pulse animation-delay-1000" />
      </div>

      <motion.div
        className="max-w-2xl mx-auto relative"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glass card with animated border */}
        <div className="relative rounded-3xl p-10 md:p-14 border border-border-bright glass overflow-hidden group">
          {/* Mouse-following glow */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)",
                x: springX,
                y: springY,
              }}
            />
          )}

          {/* Animated gradient border (subtle) */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            }}
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "linear",
            }}
          />

          {/* Background floating orbs inside card */}
          <div className="absolute w-72 h-72 rounded-full bg-foreground blur-[100px] opacity-5 -top-32 -left-32 pointer-events-none" />
          <div className="absolute w-72 h-72 rounded-full bg-foreground blur-[100px] opacity-5 -bottom-32 -right-32 pointer-events-none" />

          {/* Animated sparkle icon */}
          <motion.div
            className="inline-flex items-center justify-center w-8 h-8 rounded-full glass border border-border mb-4"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles size={14} className="text-foreground" />
          </motion.div>

          <div className="font-mono text-[11px] tracking-[0.1em] text-text-muted mb-5">
            ✦ START BUILDING TODAY
          </div>

          <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tighter leading-[1.1] mb-4">
            Ship your landing<br />in hours, not weeks
          </h2>

          <p className="text-base text-text-dim mb-8">
            One-time purchase. Lifetime updates. Yours forever.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-6">
            {/* Primary CTA with hover animation */}
            <motion.button
              onClick={createRipple}
              className="relative overflow-hidden px-7 py-3.5 bg-foreground text-background rounded-xl font-medium text-sm group"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-1">
                Get the template
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.button>

            {/* Secondary CTA with hover animation */}
            <motion.button
              onClick={createRipple}
              className="relative overflow-hidden px-6 py-3.5 glass border border-border rounded-xl text-sm text-text-dim hover:text-foreground transition-all duration-300 group"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-1">
                <Eye size={14} />
                View live demo
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-foreground/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.button>
          </div>

          <p className="font-mono text-[11px] text-text-muted tracking-wide">
            One-time purchase · Lifetime updates · No subscriptions
          </p>

          {/* Animated floating dots at bottom of card */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-foreground/30"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </div>

        {/* Subtle bottom decorative line */}
        <motion.div
          className="w-32 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent mx-auto mt-12"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </motion.div>
    </section>
  );
}