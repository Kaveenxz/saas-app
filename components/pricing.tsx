// components/pricing.tsx
"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const plans = {
  monthly: {
    starter: 0,
    pro: 29,
    team: 79,
  },
  annual: {
    starter: 0,
    pro: 19,
    team: 59,
  },
};

const features = {
  starter: ["1 project", "All sections included", "Dark + light mode", "Community support", "Lifetime updates"],
  pro: ["Unlimited projects", "Commercial license", "Priority support", "All future templates", "Figma source files", "Remove attribution"],
  team: ["Everything in Pro", "Up to 10 members", "White-label license", "Custom onboarding", "Slack support", "Invoice billing"],
};

export function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const getPrice = (plan: keyof typeof plans.monthly) => plans[billing][plan];

  return (
    <section id="pricing" className="py-24 px-6 max-w-6xl mx-auto text-center">
      <div className="section-label justify-center">Pricing</div>
      <h2 className="section-title">Simple, honest pricing</h2>
      <p className="section-sub mx-auto mb-8">One-time purchase, lifetime updates. No subscriptions, no per-seat nonsense.</p>

      <div className="inline-flex glass rounded-xl p-1 mb-12">
        <button
          onClick={() => setBilling("monthly")}
          className={`px-5 py-1.5 rounded-lg font-mono text-xs transition-all ${
            billing === "monthly" ? "bg-foreground text-background" : "text-text-dim"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBilling("annual")}
          className={`px-5 py-1.5 rounded-lg font-mono text-xs transition-all ${
            billing === "annual" ? "bg-foreground text-background" : "text-text-dim"
          }`}
        >
          Annual <span className="text-[10px] ml-1 px-1.5 py-0.5 rounded-full border border-border text-text-muted">Save 20%</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Starter */}
        <div className="glass rounded-2xl p-6 text-left border border-border">
          <div className="font-mono text-[11px] tracking-wider text-text-muted mb-4">STARTER</div>
          <div className="font-serif text-5xl font-normal tracking-tighter">
            <sup className="text-xl align-top">$</sup>{getPrice("starter")}
          </div>
          <div className="font-mono text-xs text-text-muted mt-1">per month</div>
          <p className="text-sm text-text-dim my-4">Perfect for side projects and personal use.</p>
          <div className="h-px bg-border my-4" />
          <ul className="space-y-2 mb-6">
            {features.starter.map((feat, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-text-dim">
                <Check size={12} className="text-text-dim" /> {feat}
              </li>
            ))}
          </ul>
          <button className="w-full py-2.5 rounded-xl glass border border-border text-text-dim hover:text-foreground transition text-sm">
            Get started free
          </button>
        </div>

        {/* Pro */}
        <div className="glass-bright rounded-2xl p-6 text-left border border-border-bright relative transform md:scale-105 shadow-lg">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-mono tracking-wide px-3 py-1 rounded-full whitespace-nowrap">
            Most popular
          </div>
          <div className="font-mono text-[11px] tracking-wider text-text-muted mb-4 mt-1">PRO</div>
          <div className="font-serif text-5xl font-normal tracking-tighter">
            <sup className="text-xl align-top">$</sup>{getPrice("pro")}
          </div>
          <div className="font-mono text-xs text-text-muted mt-1">per month</div>
          <p className="text-sm text-text-dim my-4">For developers who ship client projects.</p>
          <div className="h-px bg-border my-4" />
          <ul className="space-y-2 mb-6">
            {features.pro.map((feat, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-text-dim">
                <Check size={12} className="text-text-dim" /> {feat}
              </li>
            ))}
          </ul>
          <button className="w-full py-2.5 rounded-xl bg-foreground text-background hover:opacity-90 transition text-sm font-medium">
            Get Pro →
          </button>
        </div>

        {/* Team */}
        <div className="glass rounded-2xl p-6 text-left border border-border">
          <div className="font-mono text-[11px] tracking-wider text-text-muted mb-4">TEAM</div>
          <div className="font-serif text-5xl font-normal tracking-tighter">
            <sup className="text-xl align-top">$</sup>{getPrice("team")}
          </div>
          <div className="font-mono text-xs text-text-muted mt-1">per month</div>
          <p className="text-sm text-text-dim my-4">For agencies building for multiple clients.</p>
          <div className="h-px bg-border my-4" />
          <ul className="space-y-2 mb-6">
            {features.team.map((feat, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-text-dim">
                <Check size={12} className="text-text-dim" /> {feat}
              </li>
            ))}
          </ul>
          <button className="w-full py-2.5 rounded-xl glass border border-border text-text-dim hover:text-foreground transition text-sm">
            Contact us
          </button>
        </div>
      </div>
    </section>
  );
}