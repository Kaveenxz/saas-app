// components/features.tsx
"use client";

import { Code, Moon, Sparkles, Ruler, Layout, Type } from "lucide-react";

const features = [
  {
    icon: <Sparkles size={18} />,
    title: "Ship in hours, not weeks",
    description: "Everything is pre-built and production ready. Clone, customize, deploy. No boilerplate wrestling required.",
    wide: true,
    codeExample: true,
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

export function Features() {
  return (
    <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="section-label">Features</div>
      <h2 className="section-title">Everything you need<br />to ship fast</h2>
      <p className="section-sub mb-14">Pre-built components, clean TypeScript, and a design system that adapts to your brand in minutes.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Wide Feature Card */}
        <div className="md:col-span-2 glass rounded-2xl p-6 border border-border hover:border-border-bright transition-all">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="w-9 h-9 rounded-xl glass border border-border flex items-center justify-center mb-5">
                <Sparkles size={18} />
              </div>
              <h3 className="text-base font-medium mb-2">Ship in hours, not weeks</h3>
              <p className="text-sm text-text-dim leading-relaxed">Everything is pre-built and production ready. Clone, customize, deploy. No boilerplate wrestling required.</p>
              <a href="#" className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted mt-4 hover:text-text-dim transition">
                Learn more →
              </a>
            </div>
            <div className="glass rounded-xl border border-border p-3 font-mono text-[11px]">
              <div className="flex gap-2"><span className="text-text-muted">1</span><span className="text-purple-400">import</span> <span className="text-blue-400">{`{ Hero }`}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'@/components'</span></div>
              <div className="flex gap-2"><span className="text-text-muted">2</span></div>
              <div className="flex gap-2"><span className="text-text-muted">3</span><span className="text-purple-400">export default function</span> <span className="text-amber-400">Page</span>() {'{'}</div>
              <div className="flex gap-2"><span className="text-text-muted">4</span><span className="pl-4"><span className="text-purple-400">return</span> &lt;<span className="text-blue-400">Hero</span></span></div>
              <div className="flex gap-2"><span className="text-text-muted">5</span><span className="pl-8"><span className="text-green-400">title</span>=<span className="text-amber-400">"Your product"</span></span></div>
              <div className="flex gap-2"><span className="text-text-muted">6</span><span className="pl-8"><span className="text-green-400">tagline</span>=<span className="text-amber-400">"Does amazing things"</span></span></div>
              <div className="flex gap-2"><span className="text-text-muted">7</span><span className="pl-8"></span></div>
              <div className="flex gap-2"><span className="text-text-muted">8</span>{'}'}</div>
            </div>
          </div>
        </div>

        {/* Feature: Dark Mode Demo */}
        <div className="glass rounded-2xl p-6 border border-border hover:border-border-bright transition-all">
          <div className="w-9 h-9 rounded-xl glass border border-border flex items-center justify-center mb-5">
            <Moon size={18} />
          </div>
          <h3 className="text-base font-medium mb-2">Dark & light mode</h3>
          <p className="text-sm text-text-dim leading-relaxed mb-4">Perfectly crafted for both themes. Toggle between them instantly.</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-text-dim border border-border rounded-lg px-3 py-2">
              Dark mode
              <div className="w-7 h-4 rounded-full bg-border-bright relative">
                <div className="w-3 h-3 rounded-full bg-background absolute top-0.5 left-0.5" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-text-dim border border-border rounded-lg px-3 py-2">
              Animations
              <div className="w-7 h-4 rounded-full bg-border-bright relative">
                <div className="w-3 h-3 rounded-full bg-background absolute top-0.5 left-0.5" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-text-dim/50 border border-border rounded-lg px-3 py-2">
              Reduced motion
              <div className="w-7 h-4 rounded-full bg-border relative">
                <div className="w-3 h-3 rounded-full bg-background absolute top-0.5 left-0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature: Glassmorphism Metrics */}
        <div className="glass rounded-2xl p-6 border border-border hover:border-border-bright transition-all">
          <div className="w-9 h-9 rounded-xl glass border border-border flex items-center justify-center mb-5">
            <Sparkles size={18} />
          </div>
          <h3 className="text-base font-medium mb-2">Glassmorphism UI</h3>
          <p className="text-sm text-text-dim leading-relaxed mb-4">Modern frosted glass cards with layered depth and smooth animations.</p>
          <div className="space-y-2">
            {[
              { label: "Blur", value: 72, unit: "24px" },
              { label: "Opacity", value: 20, unit: "3%" },
              { label: "Border", value: 30, unit: "6%" },
            ].map((metric) => (
              <div key={metric.label} className="flex items-center gap-2 text-xs">
                <span className="text-text-muted w-12">{metric.label}</span>
                <div className="flex-1 h-1 rounded-full bg-border overflow-hidden">
                  <div className="h-full rounded-full bg-text-dim" style={{ width: `${metric.value}%` }} />
                </div>
                <span className="text-text-muted w-8 text-right">{metric.unit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional feature cards */}
        {features.slice(3).map((feature, idx) => (
          <div key={idx} className="glass rounded-2xl p-6 border border-border hover:border-border-bright transition-all">
            <div className="w-9 h-9 rounded-xl glass border border-border flex items-center justify-center mb-5">
              {feature.icon}
            </div>
            <h3 className="text-base font-medium mb-2">{feature.title}</h3>
            <p className="text-sm text-text-dim leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}