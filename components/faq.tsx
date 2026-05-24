// components/faq.tsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What do I get with the template?",
    answer: "You get the full Next.js 14 source code with TypeScript, all components, dark/light mode, Tailwind animations, and a detailed README to get started in minutes.",
  },
  {
    question: "Can I use this for client projects?",
    answer: "Yes — the Pro license allows unlimited commercial use. You can build and sell as many client projects as you want.",
  },
  {
    question: "Do I need to know Next.js to use this?",
    answer: "Basic React knowledge is enough. The components are simple to understand and the README walks you through every customization.",
  },
  {
    question: "Will I get future updates?",
    answer: "Yes. All purchases include lifetime updates. When new sections or improvements are added, you get them for free.",
  },
  {
    question: "What if I need help?",
    answer: "Pro customers get priority support via email. All customers can access the community Discord for questions.",
  },
  {
    question: "Is there a refund policy?",
    answer: "Yes — 7-day no-questions-asked refund if the template doesn't work for your use case.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 px-6 max-w-3xl mx-auto relative"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none" />

      <div className="section-label justify-center">FAQ</div>
      <h2 className="section-title text-center">Common questions</h2>

      <div className="mt-12 space-y-4">
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="group"
          >
            <motion.div
              className={`glass rounded-xl border transition-all duration-300 ${
                openIndex === idx
                  ? "border-border-bright bg-white/5 dark:bg-black/20"
                  : "border-border hover:border-border-bright hover:bg-white/5 dark:hover:bg-black/10"
              }`}
              layout
            >
              {/* Question button */}
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer group"
                aria-expanded={openIndex === idx}
              >
                <div className="flex items-center gap-3 flex-1">
                  <HelpCircle
                    size={16}
                    className={`text-text-muted transition-all duration-300 ${
                      openIndex === idx
                        ? "opacity-100 rotate-0"
                        : "opacity-40 group-hover:opacity-70"
                    }`}
                  />
                  <span className="text-sm font-medium tracking-tight text-foreground/90">
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-6 h-6 rounded-full glass border border-border flex items-center justify-center"
                >
                  <ChevronDown size={14} className="text-text-muted" />
                </motion.div>
              </button>

              {/* Answer (animated) */}
              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0">
                      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />
                      <p className="text-xs text-text-dim leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Decorative bottom element */}
      <motion.div
        className="w-32 h-px bg-gradient-to-r from-transparent via-border-bright to-transparent mx-auto mt-16"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </section>
  );
}