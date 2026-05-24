// components/how-it-works.tsx
"use client";

const steps = [
  {
    number: "01",
    title: "Clone the repo",
    description: "One command. Next.js, TypeScript, Tailwind, all configured and ready.",
  },
  {
    number: "02",
    title: "Customize content",
    description: "Swap the copy, colors, and components. Each section is modular.",
  },
  {
    number: "03",
    title: "Deploy to Vercel",
    description: "Push to GitHub, connect to Vercel, done. Live in minutes.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 px-6 max-w-4xl mx-auto text-center">
      <div className="section-label justify-center">How it works</div>
      <h2 className="section-title">Three steps to launch</h2>

      <div className="flex flex-col md:flex-row items-start gap-8 mt-14 relative">
        {steps.map((step, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center text-center relative">
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute top-5 left-[calc(50%+28px)] right-0 h-px border-t border-dashed border-border-bright" style={{ width: "calc(100% - 56px)" }} />
            )}
            <div className="w-10 h-10 rounded-full glass border border-border flex items-center justify-center font-mono text-xs font-medium mb-5 relative z-10">
              {step.number}
            </div>
            <h3 className="text-sm font-medium mb-2">{step.title}</h3>
            <p className="text-xs text-text-dim max-w-[200px] leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}