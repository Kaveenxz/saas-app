// components/pricing.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, Sparkles, TrendingUp, Users } from "lucide-react";

const plans = {
  monthly: { starter: 0, pro: 29, team: 79 },
  annual: { starter: 0, pro: 19, team: 59 },
};

const features = {
  starter: ["1 project", "All sections included", "Dark + light mode", "Community support", "Lifetime updates"],
  pro: ["Unlimited projects", "Commercial license", "Priority support", "All future templates", "Figma source files", "Remove attribution"],
  team: ["Everything in Pro", "Up to 10 members", "White-label license", "Custom onboarding", "Slack support", "Invoice billing"],
};

export function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const monthlyBtnRef = useRef<HTMLButtonElement>(null);
  const annualBtnRef = useRef<HTMLButtonElement>(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  const getPrice = (plan: keyof typeof plans.monthly) => plans[billing][plan];

  const handleBillingToggle = (mode: "monthly" | "annual") => {
    setBilling(mode);
  };

  // Update slider position when billing changes or on mount
  useEffect(() => {
    const activeBtn = billing === "monthly" ? monthlyBtnRef.current : annualBtnRef.current;
    if (activeBtn) {
      const parent = activeBtn.parentElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        setSliderStyle({
          left: btnRect.left - parentRect.left,
          width: btnRect.width,
        });
      }
    }
  }, [billing]);

  useEffect(() => {
    const handleResize = () => {
      const activeBtn = billing === "monthly" ? monthlyBtnRef.current : annualBtnRef.current;
      if (activeBtn) {
        const parent = activeBtn.parentElement;
        if (parent) {
          const parentRect = parent.getBoundingClientRect();
          const btnRect = activeBtn.getBoundingClientRect();
          setSliderStyle({
            left: btnRect.left - parentRect.left,
            width: btnRect.width,
          });
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [billing]);

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = "ripple-effect";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-24 px-6 max-w-6xl mx-auto text-center relative"
    >
      <div className="section-label justify-center">Pricing</div>
      <h2 className="section-title">Simple, honest pricing</h2>
      <p className="section-sub mx-auto mb-8">
        One-time purchase, lifetime updates. No subscriptions, no per-seat nonsense.
      </p>

      {/* Animated Toggle */}
      <div className="flex justify-center mb-12">
        <div className="relative inline-flex glass rounded-xl p-1">
          <button
            ref={monthlyBtnRef}
            onClick={() => handleBillingToggle("monthly")}
            className={`relative z-10 px-5 py-1.5 rounded-lg font-mono text-xs transition-colors ${
              billing === "monthly" ? "text-background" : "text-text-dim hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            ref={annualBtnRef}
            onClick={() => handleBillingToggle("annual")}
            className={`relative z-10 px-5 py-1.5 rounded-lg font-mono text-xs transition-colors ${
              billing === "annual" ? "text-background" : "text-text-dim hover:text-foreground"
            }`}
          >
            Annual{" "}
            <span className="text-[10px] ml-1 px-1.5 py-0.5 rounded-full border border-border text-text-muted">
              Save 20%
            </span>
          </button>
          <motion.div
            className="absolute top-1 bottom-1 rounded-lg bg-foreground"
            animate={{
              left: sliderStyle.left,
              width: sliderStyle.width,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        </div>
      </div>

      {/* Pricing Cards Grid - no overflow-hidden on cards to prevent clipping */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Starter Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onMouseEnter={() => setHoveredCard("starter")}
          onMouseLeave={() => setHoveredCard(null)}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          className="glass rounded-2xl p-6 text-left border border-border transition-all duration-300 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
          <div className="font-mono text-[11px] tracking-wider text-text-muted mb-4 flex items-center justify-between">
            STARTER
            <Sparkles size={12} className="text-text-muted" />
          </div>
          <div className="font-serif text-5xl font-normal tracking-tighter flex items-baseline gap-1">
            <sup className="text-xl">$</sup>
            <AnimatePresence mode="wait">
              <motion.span
                key={billing + getPrice("starter")}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {getPrice("starter")}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="font-mono text-xs text-text-muted mt-1">per month</div>
          {billing === "annual" && getPrice("starter") === 0 && (
            <div className="text-[10px] text-green-500/70 mt-1">Free forever</div>
          )}
          <p className="text-sm text-text-dim my-4">Perfect for side projects and personal use.</p>
          <div className="h-px bg-border my-4" />
          <ul className="space-y-2 mb-6">
            {features.starter.map((feat, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-center gap-2 text-xs text-text-dim"
              >
                <motion.div whileHover={{ scale: 1.2 }}>
                  <Check size={12} className="text-text-dim" />
                </motion.div>
                {feat}
              </motion.li>
            ))}
          </ul>
          <button
            onClick={createRipple}
            className="relative overflow-hidden w-full py-2.5 rounded-xl glass border border-border text-text-dim hover:text-foreground transition-all duration-300 text-sm group"
          >
            <span className="relative z-10">Get started free</span>
            <span className="absolute inset-0 bg-gradient-to-r from-foreground/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </motion.div>

        {/* Pro Card (highlighted) - no scale on mobile, badge fully visible */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          onMouseEnter={() => setHoveredCard("pro")}
          onMouseLeave={() => setHoveredCard(null)}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          className="glass-bright rounded-2xl p-6 text-left border border-border-bright relative shadow-xl group md:scale-105 origin-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
          {/* Most popular badge - now fully visible */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-mono tracking-wide px-3 py-1 rounded-full whitespace-nowrap z-30 flex items-center gap-1 shadow-md">
            <TrendingUp size={10} />
            Most popular
          </div>
          {/* Add small top padding to avoid badge overlap */}
          <div className="pt-2">
            <div className="font-mono text-[11px] tracking-wider text-text-muted mb-4 flex items-center justify-between">
              PRO
              <Sparkles size={12} className="text-foreground" />
            </div>
            <div className="font-serif text-5xl font-normal tracking-tighter flex items-baseline gap-1">
              <sup className="text-xl">$</sup>
              <AnimatePresence mode="wait">
                <motion.span
                  key={billing + getPrice("pro")}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {getPrice("pro")}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="font-mono text-xs text-text-muted mt-1">per month</div>
            {billing === "annual" && (
              <div className="text-[10px] text-green-500/70 mt-1">
                Save ${(plans.monthly.pro - plans.annual.pro) * 12} annually
              </div>
            )}
            <p className="text-sm text-text-dim my-4">For developers who ship client projects.</p>
            <div className="h-px bg-border my-4" />
            <ul className="space-y-2 mb-6">
              {features.pro.map((feat, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="flex items-center gap-2 text-xs text-text-dim"
                >
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <Check size={12} className="text-foreground" />
                  </motion.div>
                  {feat}
                </motion.li>
              ))}
            </ul>
            <button
              onClick={createRipple}
              className="relative overflow-hidden w-full py-2.5 rounded-xl bg-foreground text-background hover:opacity-90 transition-all duration-300 text-sm font-medium group"
            >
              <span className="relative z-10 flex items-center justify-center gap-1">
                Get Pro <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </div>
        </motion.div>

        {/* Team Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          onMouseEnter={() => setHoveredCard("team")}
          onMouseLeave={() => setHoveredCard(null)}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          className="glass rounded-2xl p-6 text-left border border-border transition-all duration-300 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
          <div className="font-mono text-[11px] tracking-wider text-text-muted mb-4 flex items-center justify-between">
            TEAM
            <Users size={12} className="text-text-muted" />
          </div>
          <div className="font-serif text-5xl font-normal tracking-tighter flex items-baseline gap-1">
            <sup className="text-xl">$</sup>
            <AnimatePresence mode="wait">
              <motion.span
                key={billing + getPrice("team")}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {getPrice("team")}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="font-mono text-xs text-text-muted mt-1">per month</div>
          {billing === "annual" && (
            <div className="text-[10px] text-green-500/70 mt-1">
              Save ${(plans.monthly.team - plans.annual.team) * 12} annually
            </div>
          )}
          <p className="text-sm text-text-dim my-4">For agencies building for multiple clients.</p>
          <div className="h-px bg-border my-4" />
          <ul className="space-y-2 mb-6">
            {features.team.map((feat, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex items-center gap-2 text-xs text-text-dim"
              >
                <motion.div whileHover={{ scale: 1.2 }}>
                  <Check size={12} className="text-text-dim" />
                </motion.div>
                {feat}
              </motion.li>
            ))}
          </ul>
          <button
            onClick={createRipple}
            className="relative overflow-hidden w-full py-2.5 rounded-xl glass border border-border text-text-dim hover:text-foreground transition-all duration-300 text-sm group"
          >
            <span className="relative z-10">Contact us</span>
            <span className="absolute inset-0 bg-gradient-to-r from-foreground/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}