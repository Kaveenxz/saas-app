"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { GitBranch, Palette, Rocket, Check, Copy, ChevronRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Clone the repo",
    description: "One command. Next.js, TypeScript, Tailwind, all configured and ready.",
    icon: <GitBranch size={16} />,
    command: "npx create-prism-app my-project",
    extraDetail: "cd my-project && npm install && npm run dev",
  },
  {
    number: "02",
    title: "Customize content",
    description: "Swap the copy, colors, and components. Each section is modular.",
    icon: <Palette size={16} />,
    extraDetail: "Edit data files, tweak Tailwind config, replace logos",
  },
  {
    number: "03",
    title: "Deploy to Vercel",
    description: "Push to GitHub, connect to Vercel, done. Live in minutes.",
    icon: <Rocket size={16} />,
    extraDetail: "git push origin main → vercel --prod → your site is live",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineDraw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Mouse following glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 30 });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);

    
  };


  return (
    <section id="how" ref={sectionRef} className="py-24 px-6 max-w-5xl mx-auto text-center relative overflow-hidden">
      <div className="section-label justify-center">How it works</div>
      <h2 className="section-title">Three steps to launch</h2>

      <div className="flex flex-col md:flex-row items-start justify-center gap-6 md:gap-8 mt-16 relative">
        {/* Connecting line with flowing dots */}
        <svg className="absolute top-10 left-0 w-full h-[2px] hidden md:block pointer-events-none" style={{ zIndex: 0 }}>
          <motion.line
            x1="12%"
            y1="0"
            x2="88%"
            y2="0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            className="text-border-bright"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
          />
          {/* Flowing dot */}
          <motion.circle
            r="2"
            fill="currentColor"
            className="text-foreground/60"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: isInView ? "100%" : "0%" }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            style={{ offsetPath: "path('M 12% 0 L 88% 0')" }}
          />
        </svg>

        {steps.map((step, idx) => {
          const isHovered = hoveredStep === idx;
          const isExpanded = expandedStep === idx;
          return (
            <motion.div
              key={idx}
              className="flex-1 flex flex-col items-center text-center relative z-10 max-w-[260px] mx-auto cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -10 }}
              onHoverStart={(e) => {
                setHoveredStep(idx);
                // Safety check: ensure currentTarget exists
                const target:any = e.currentTarget;
                if (target) {
                  const rect = target.getBoundingClientRect();
                  mouseX.set(e.clientX - rect.left);
                  mouseY.set(e.clientY - rect.top);
                }
              }}
              onHoverEnd={() => setHoveredStep(null)}
              onClick={() => setExpandedStep(isExpanded ? null : idx)}
            >
              {/* Mouse-following glow */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)",
                    x: springX,
                    y: springY,
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Step circle with morphing number/check */}
              <motion.div
                className="relative w-16 h-16 rounded-full glass border border-border flex items-center justify-center font-mono text-xl font-medium mb-6 z-10 shadow-md transition-all duration-300"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  borderColor: isHovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <AnimatePresence mode="wait">
                  {isHovered ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-text-dim"
                    >
                      <Check size={22} />
                    </motion.div>
                  ) : (
                    <motion.span
                      key="number"
                      initial={{ scale: 1, rotate: 0 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: -180 }}
                      transition={{ duration: 0.2 }}
                    >
                      {step.number}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Pulsing ring on hover */}
                {isHovered && (
                  <motion.span
                    className="absolute inset-0 rounded-full border border-border-bright/40"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Icon that appears below on hover */}
              <motion.div
                className="mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 rounded-full glass border border-border flex items-center justify-center mx-auto text-text-dim">
                  {step.icon}
                </div>
              </motion.div>

              <h3 className="text-base font-medium mb-2 transition-colors duration-200">
                {step.title}
              </h3>
              <p className="text-xs text-text-dim leading-relaxed max-w-[200px]">
                {step.description}
              </p>

              {/* Expandable extra detail with command copy */}
              <motion.div
                className="overflow-hidden w-full mt-3"
                initial={{ height: 0 }}
                animate={{ height: isExpanded ? "auto" : 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <div className="pt-3 text-[10px] font-mono text-text-muted border-t border-border/40 px-2">
                  {step.command && (
                    <div className="flex items-center justify-between gap-2 bg-surface/50 rounded-md p-1.5 mb-2">
                      <code className="text-[10px] truncate">{step.command}</code>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleCopy(step.command); }}
                        className="p-1 hover:bg-border rounded transition"
                      >
                        <Copy size={10} />
                      </button>
                    </div>
                  )}
                  <div className="text-[10px] leading-relaxed">{step.extraDetail}</div>
                  {copySuccess && idx === 0 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[9px] text-green-500"
                    >
                      Copied!
                    </motion.span>
                  )}
                </div>
              </motion.div>

              {/* Expand hint chevron */}
              <motion.div
                className="mt-2 text-text-muted/50"
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight size={12} />
              </motion.div>

              {/* Particle ripples on hover */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-white/20"
                      initial={{ x: "50%", y: "50%", scale: 0 }}
                      animate={{
                        x: ["50%", `${50 + (i % 2 === 0 ? 60 : -60)}%`],
                        y: ["50%", `${50 + (i % 3 === 0 ? 40 : -40)}%`],
                        scale: [0, 1, 0],
                        opacity: [0.6, 0],
                      }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Animated bottom indicator */}
      <motion.div
        className="w-32 h-px bg-gradient-to-r from-transparent via-border-bright to-transparent mx-auto mt-12"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
      />
    </section>
  );
}