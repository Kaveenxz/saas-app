// components/features.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sparkles, Ruler, Layout, Type } from "lucide-react";

// Two code examples for the typing transition
const codeExample1 = [
  "import { Hero } from '@/components'",
  "",
  "export default function Page() {",
  "  return <Hero",
  '    title="Your product"',
  '    tagline="Does amazing things"',
  "  />",
  "}",
];

const codeExample2 = [
  "import { Hero, Features, Pricing } from '@/components'",
  "",
  "export default function Landing() {",
  "  return (",
  "    <main>",
  "      <Hero variant='centered' />",
  "      <Features columns={3} />",
  "      <Pricing showAnnual={true} />",
  "    </main>",
  "  )",
  "}",
];

const features = [
  {
    icon: <Sparkles size={18} />,
    title: "Ship in hours, not weeks",
    description: "Everything is pre-built and production ready. Clone, customize, deploy. No boilerplate wrestling required.",
    wide: true,
  },
  {
    icon: <Moon size={18} />,
    title: "Dark & light mode",
    description: "Perfectly crafted for both themes. Toggle between them instantly.",
    toggleDemo: true,
  },
  {
    icon: <Sparkles size={18} />,
    title: "Glassmorphism UI",
    description: "Modern frosted glass cards with layered depth and smooth animations.",
    metricsDemo: true,
  },
  {
    icon: <Ruler size={18} />,
    title: "Mobile first",
    description: "Every section is pixel-perfect on mobile, tablet, and desktop.",
  },
  {
    icon: <Layout size={18} />,
    title: "Every section you need",
    description: "Hero, features, pricing, testimonials, FAQ — all included. Just swap the content.",
  },
  {
    icon: <Type size={18} />,
    title: "Clean TypeScript",
    description: "Fully typed components with clear prop interfaces. Customize without guessing.",
  },
];

// Helper to simulate typing effect on a line
const TypewriterLine = ({ text, delay }: { text: string; delay: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [started, text]);

  return <span>{displayText}</span>;
};

export function Features() {
  const [hoveredWide, setHoveredWide] = useState(false);
  const [hoveredDark, setHoveredDark] = useState(false);
  const [hoveredGlass, setHoveredGlass] = useState(false);
  const [hoveredOthers, setHoveredOthers] = useState<{ [key: number]: boolean }>({});
  const [codeLines, setCodeLines] = useState(codeExample1);
  const [typingActive, setTypingActive] = useState(false);

  // When wide card is hovered, start typing transition to example2
  useEffect(() => {
    if (hoveredWide && !typingActive) {
      setTypingActive(true);
      // Switch to example2 after a short delay (to allow exit animation)
      const timer = setTimeout(() => {
        setCodeLines(codeExample2);
        // Reset typing active after a while (so when hover ends, we can go back)
        setTimeout(() => setTypingActive(false), 1000);
      }, 300);
      return () => clearTimeout(timer);
    } else if (!hoveredWide && !typingActive) {
      // When hover ends, revert to example1 after a small delay
      const timer = setTimeout(() => {
        setCodeLines(codeExample1);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [hoveredWide, typingActive]);

  return (
    <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="section-label">Features</div>
      <h2 className="section-title">Everything you need<br />to ship fast</h2>
      <p className="section-sub mb-14">Pre-built components, clean TypeScript, and a design system that adapts to your brand in minutes.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Wide Feature Card with typing code block */}
        <div
          className="md:col-span-2 glass rounded-2xl p-6 border border-border hover:border-border-bright transition-all duration-300"
          onMouseEnter={() => setHoveredWide(true)}
          onMouseLeave={() => setHoveredWide(false)}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <motion.div
                className="w-9 h-9 rounded-xl glass border border-border flex items-center justify-center mb-5"
                animate={hoveredWide ? { rotate: [0, -5, 5, -3, 3, 0], scale: 1.05 } : {}}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Sparkles size={18} />
              </motion.div>
              <h3 className="text-base font-medium mb-2">Ship in hours, not weeks</h3>
              <p className="text-sm text-text-dim leading-relaxed">
                Everything is pre-built and production ready. Clone, customize, deploy. No boilerplate wrestling required.
              </p>
              <a href="#" className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted mt-4 hover:text-text-dim transition">
                Learn more →
              </a>
            </div>

            {/* Code block with typing animation */}
            <div className="glass rounded-xl border border-border p-3 font-mono text-[11px] relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={codeLines === codeExample1 ? "ex1" : "ex2"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {codeLines.map((line, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-text-muted w-6">{idx + 1}</span>
                      <span className="text-text-dim">
                        {hoveredWide && typingActive && codeLines === codeExample2 ? (
                          <TypewriterLine text={line} delay={idx * 60} />
                        ) : (
                          line
                        )}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
              {/* Shimmer on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                initial={{ x: "-100%" }}
                animate={hoveredWide ? { x: "100%" } : { x: "-100%" }}
                transition={{ duration: 0.8, repeat: hoveredWide ? Infinity : 0, repeatDelay: 1.5 }}
              />
            </div>
          </div>
        </div>

        {/* Dark Mode Card with interactive toggle wiggles */}
        <div
          className="glass rounded-2xl p-6 border border-border hover:border-border-bright transition-all duration-300"
          onMouseEnter={() => setHoveredDark(true)}
          onMouseLeave={() => setHoveredDark(false)}
        >
          <motion.div
            className="w-9 h-9 rounded-xl glass border border-border flex items-center justify-center mb-5"
            animate={hoveredDark ? { rotateY: [0, 180, 360], scale: 1.1 } : {}}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <Moon size={18} />
          </motion.div>
          <h3 className="text-base font-medium mb-2">Dark & light mode</h3>
          <p className="text-sm text-text-dim leading-relaxed mb-4">Perfectly crafted for both themes. Toggle between them instantly.</p>
          <div className="space-y-3">
            {["Dark mode", "Animations", "Reduced motion"].map((label, i) => (
              <div
                key={label}
                className="flex items-center justify-between text-xs text-text-dim border border-border rounded-lg px-3 py-2"
              >
                <span className={hoveredDark && i < 2 ? "text-foreground transition-colors duration-200" : ""}>
                  {label}
                </span>
                <motion.div
                  className="w-7 h-4 rounded-full bg-border-bright relative cursor-pointer"
                  animate={
                    hoveredDark && i < 2
                      ? { scale: [1, 1.1, 1], backgroundColor: ["#ccc", "#fff", "#ccc"] }
                      : {}
                  }
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <motion.div
                    className="w-3 h-3 rounded-full bg-background absolute top-0.5 left-0.5"
                    animate={hoveredDark && i < 2 ? { x: [0, 2, 0] } : {}}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Glassmorphism Metrics Card with smooth bar expansion */}
        <div
          className="glass rounded-2xl p-6 border border-border hover:border-border-bright transition-all duration-300"
          onMouseEnter={() => setHoveredGlass(true)}
          onMouseLeave={() => setHoveredGlass(false)}
        >
          <motion.div
            className="w-9 h-9 rounded-xl glass border border-border flex items-center justify-center mb-5"
            animate={hoveredGlass ? { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Sparkles size={18} />
          </motion.div>
          <h3 className="text-base font-medium mb-2">Glassmorphism UI</h3>
          <p className="text-sm text-text-dim leading-relaxed mb-4">Modern frosted glass cards with layered depth and smooth animations.</p>
          <div className="space-y-2">
            {[
              { label: "Blur", baseValue: 72, hoverValue: 88, unit: "24px" },
              { label: "Opacity", baseValue: 20, hoverValue: 32, unit: "3%" },
              { label: "Border", baseValue: 30, hoverValue: 48, unit: "6%" },
            ].map((metric) => (
              <div key={metric.label} className="flex items-center gap-2 text-xs">
                <span className="text-text-muted w-12">{metric.label}</span>
                <div className="flex-1 h-1 rounded-full bg-border overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-text-dim"
                    animate={{ width: `${hoveredGlass ? metric.hoverValue : metric.baseValue}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <motion.span
                  className="text-text-muted w-8 text-right"
                  animate={hoveredGlass ? { scale: 1.08 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {metric.unit}
                </motion.span>
              </div>
            ))}
          </div>
        </div>

        {/* Remaining cards with subtle lifts */}
        {features.slice(3).map((feature, idx) => {
          const isHovered = hoveredOthers[idx] || false;
          return (
            <div
              key={idx}
              className="glass rounded-2xl p-6 border border-border hover:border-border-bright transition-all duration-300"
              onMouseEnter={() => setHoveredOthers((prev) => ({ ...prev, [idx]: true }))}
              onMouseLeave={() => setHoveredOthers((prev) => ({ ...prev, [idx]: false }))}
            >
              <motion.div
                className="w-9 h-9 rounded-xl glass border border-border flex items-center justify-center mb-5"
                animate={isHovered ? { y: [0, -4, 0], scale: 1.08 } : {}}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {feature.icon}
              </motion.div>
              <motion.h3
                className="text-base font-medium mb-2"
                animate={isHovered ? { x: [0, 3, 0] } : {}}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {feature.title}
              </motion.h3>
              <motion.p
                className="text-sm text-text-dim leading-relaxed"
                animate={isHovered ? { y: [0, -2, 0] } : {}}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {feature.description}
              </motion.p>
            </div>
          );
        })}
      </div>
    </section>
  );
}