// components/faq.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

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

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 max-w-3xl mx-auto">
      <div className="section-label">FAQ</div>
      <h2 className="section-title">Common questions</h2>

      <div className="mt-12 space-y-2">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className={`rounded-xl border transition-all ${
              openIndex === idx ? "border-border" : "border-transparent"
            }`}
          >
            <button
              onClick={() => toggleFaq(idx)}
              className="w-full flex justify-between items-center p-5 text-left"
            >
              <span className="text-sm font-medium">{faq.question}</span>
              <Plus
                size={16}
                className={`text-text-muted transition-transform ${
                  openIndex === idx ? "rotate-45" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === idx ? "max-h-40 pb-5" : "max-h-0"
              }`}
            >
              <p className="text-xs text-text-dim px-5 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}