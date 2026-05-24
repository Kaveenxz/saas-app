// components/testimonials.tsx
"use client";

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

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="section-label">Testimonials</div>
      <h2 className="section-title">Loved by developers</h2>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 mt-12 space-y-4">
        {testimonials.map((t, idx) => (
          <div key={idx} className="glass rounded-xl p-5 break-inside-avoid mb-4 border border-border">
            <div className="flex gap-0.5 mb-3">
              {[...Array(t.rating)].map((_, i) => (
                <span key={i} className="text-xs text-text-muted">★</span>
              ))}
            </div>
            <p className="text-sm text-text-dim italic leading-relaxed mb-4">"{t.quote}"</p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-border-bright flex items-center justify-center font-mono text-[10px] text-text-dim">
                {t.initials}
              </div>
              <div>
                <div className="text-xs font-medium">{t.name}</div>
                <div className="text-[10px] font-mono text-text-muted">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}