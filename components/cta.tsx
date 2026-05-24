// components/cta.tsx
"use client";

export function CTA() {
  return (
    <section className="py-20 px-6 text-center relative overflow-hidden">
      <div className="max-w-2xl mx-auto glass rounded-3xl p-10 md:p-14 relative overflow-hidden border border-border-bright">
        <div className="absolute w-96 h-96 rounded-full bg-foreground blur-[120px] opacity-5 -top-32 -left-32 pointer-events-none" />
        <div className="absolute w-96 h-96 rounded-full bg-foreground blur-[120px] opacity-5 -bottom-32 -right-32 pointer-events-none" />

        <div className="font-mono text-[11px] tracking-[0.1em] text-text-muted mb-5">✦ START BUILDING TODAY</div>
        <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tighter leading-[1.1] mb-4">
          Ship your landing<br />in hours, not weeks
        </h2>
        <p className="text-base text-text-dim mb-8">One-time purchase. Lifetime updates. Yours forever.</p>
        <div className="flex flex-wrap gap-3 justify-center mb-5">
          <button className="px-7 py-3.5 bg-foreground text-background rounded-xl font-medium text-sm hover:opacity-90 transition">
            Get the template →
          </button>
          <button className="px-6 py-3.5 glass border border-border rounded-xl text-sm text-text-dim hover:text-foreground transition">
            View live demo
          </button>
        </div>
        <p className="font-mono text-[11px] text-text-muted tracking-wide">One-time purchase · Lifetime updates · No subscriptions</p>
      </div>
    </section>
  );
}