// components/testimonials.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "This template saved me at least 3 days of work. The glassmorphism design is absolutely stunning.",
    name: "Alex Chen",
    role: "Indie hacker",
    initials: "AC",
    rating: 5,
  },
  {
    quote: "I've bought a lot of templates. This is the cleanest codebase I've seen. Worth every penny.",
    name: "Sarah M.",
    role: "Frontend developer",
    initials: "SM",
    rating: 5,
  },
  {
    quote: "My client was blown away. Launched their SaaS landing in 4 hours using this template.",
    name: "James K.",
    role: "Freelance developer",
    initials: "JK",
    rating: 5,
  },
  {
    quote: "Dark mode looks incredible. The animations are smooth and the code is easy to customize.",
    name: "Priya R.",
    role: "Product designer",
    initials: "PR",
    rating: 5,
  },
  {
    quote: "Finally a template that actually looks premium. Not the usual Bootstrap garbage.",
    name: "Tom W.",
    role: "Startup founder",
    initials: "TW",
    rating: 5,
  },
  {
    quote: "The TypeScript types are clean, components are well structured. This is senior-level code.",
    name: "David L.",
    role: "Senior developer",
    initials: "DL",
    rating: 5,
  },
];

// Variants for staggered card entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 px-6 max-w-6xl mx-auto relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none" />

      <div className="section-label">Testimonials</div>
      <h2 className="section-title">Loved by developers</h2>

      {/* Masonry grid with staggered animations */}
      <motion.div
        className="columns-1 md:columns-2 lg:columns-3 gap-5 mt-12 space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {testimonials.map((t, idx) => {
          const isHovered = hoveredIndex === idx;
          return (
            <motion.div
              key={idx}
              variants={cardVariants}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="glass rounded-2xl p-5 break-inside-avoid border border-border group relative cursor-pointer transition-all duration-300"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Quotation icon – animated */}
              <motion.div
                className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity"
                animate={isHovered ? { rotate: [0, 5, -5, 0], scale: 1.1 } : {}}
                transition={{ duration: 0.4 }}
              >
                <Quote size={24} className="text-foreground" />
              </motion.div>

              {/* Stars with animated fill on hover */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.4 + idx * 0.02 + i * 0.05, type: "spring", stiffness: 300 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <span
                      className={`text-xs transition-all duration-200 ${
                        i < t.rating
                          ? isHovered
                            ? "text-foreground drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]"
                            : "text-foreground"
                          : "text-text-muted/30"
                      }`}
                    >
                      ★
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Quote text with animated underline and slight shift on hover */}
              <motion.p
                className="text-sm text-text-dim leading-relaxed mb-5 relative"
                animate={isHovered ? { x: 2 } : { x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative z-10">“{t.quote}”</span>
                <motion.span
                  className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-foreground/50 to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: isHovered ? "100%" : 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.p>

              {/* Author section with avatar animation */}
              <div className="flex items-center gap-3 border-t border-border/40 pt-4">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="w-9 h-9 rounded-full glass border border-border-bright flex items-center justify-center font-mono text-[11px] font-medium text-foreground">
                    {t.initials}
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-full border border-foreground/20"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={isHovered ? { scale: 1.3, opacity: 0.6 } : { scale: 1, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <div>
                  <div className="text-xs font-medium tracking-tight">{t.name}</div>
                  <div className="text-[10px] font-mono text-text-muted">{t.role}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Decorative floating quote marks at the bottom (animated on scroll) */}
      <motion.div
        className="relative mt-20 text-center pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 0.15, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="text-8xl font-serif absolute left-1/2 -translate-x-1/2 -top-8">“</div>
      </motion.div>
    </section>
  );
}