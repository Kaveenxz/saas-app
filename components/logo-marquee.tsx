// components/logo-marquee.tsx
"use client";

const logos = [
  "Vercel", "Linear", "Notion", "Loom", "Figma", "Stripe", "Supabase", "Railway", "Planetscale"
];

export function LogoMarquee() {
  const doubledLogos = [...logos, ...logos];

  return (
    <div className="border-y border-border py-6 overflow-hidden">
      <div className="text-center mb-4">
        <div className="font-mono text-[11px] tracking-[0.1em] text-text-muted uppercase">Trusted by teams at</div>
      </div>
      <div className="mask-fade-edges overflow-hidden">
        <div className="flex animate-marquee w-max">
          {doubledLogos.map((logo, idx) => (
            <div key={idx} className="flex items-center gap-3 px-8">
              <span className="font-mono text-sm text-text-muted whitespace-nowrap">{logo}</span>
              <span className="text-border-bright">·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}