// components/footer.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll } from "framer-motion";
import { ArrowUp, Sparkles, Send } from "lucide-react";

// Custom social icons (inline SVGs) – avoids missing icons in lucide-react
const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-10 7L2 7"/>
  </svg>
);

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Changelog", href: "#" },
    { name: "Roadmap", href: "#" },
  ],
  resources: [
    { name: "Docs", href: "#" },
    { name: "GitHub", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "Discord", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "License", href: "#" },
    { name: "Cookies", href: "#" },
  ],
};

const socialLinks = [
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: GithubIcon, href: "#", label: "GitHub" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: MailIcon, href: "#", label: "Email" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 });
  const { scrollY } = useScroll();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setShowBackToTop(latest > 500);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Handle subscription logic here
      console.log("Subscribed:", email);
      setEmail("");
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-border bg-gradient-to-b from-background to-background/80"
    >
      {/* Animated top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-foreground/5 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-foreground/5 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        {/* Main footer grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5"
        >
          {/* Brand column */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl glass border border-border-bright flex items-center justify-center text-sm">
                <Sparkles size={14} className="text-foreground" />
              </div>
              <span className="font-mono text-base font-semibold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Prism
              </span>
            </div>
            <p className="text-sm text-text-dim max-w-sm leading-relaxed mb-6">
              Premium glassmorphism template for modern SaaS products. Ship faster, look better, and impress your users.
            </p>
            {/* Newsletter signup */}
            <form onSubmit={handleSubscribe} className="relative max-w-xs">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2.5 pl-4 pr-10 rounded-xl glass border border-border text-sm text-foreground placeholder:text-text-muted focus:outline-none focus:border-foreground/50 transition-all"
                required
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-foreground/10 transition"
                aria-label="Subscribe"
              >
                <Send size={14} className="text-text-muted hover:text-foreground transition" />
              </button>
            </form>
            <p className="text-[10px] font-mono text-text-muted mt-2">Get updates • No spam</p>
          </motion.div>

          {/* Links columns */}
          <motion.div variants={itemVariants}>
            <h4 className="font-mono text-[11px] font-semibold tracking-wider text-text-muted uppercase mb-4">
              Product
            </h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="relative inline-block text-xs text-text-dim hover:text-foreground transition-colors duration-200 group"
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-foreground/40 transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-mono text-[11px] font-semibold tracking-wider text-text-muted uppercase mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="relative inline-block text-xs text-text-dim hover:text-foreground transition-colors duration-200 group"
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-foreground/40 transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-mono text-[11px] font-semibold tracking-wider text-text-muted uppercase mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="relative inline-block text-xs text-text-dim hover:text-foreground transition-colors duration-200 group"
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-foreground/40 transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 mt-8 border-t border-border/50"
        >
          <div className="flex items-center gap-6">
            <span className="text-[11px] font-mono text-text-muted">
              © {currentYear} Prism. All rights reserved.
            </span>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-1.5 rounded-lg text-text-muted hover:text-foreground transition-all duration-200 hover:bg-foreground/5"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-text-muted/50">
              Built with Next.js & Tailwind
            </span>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-1.5 text-[11px] font-mono text-text-muted hover:text-foreground transition"
            >
              Back to top
              <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Back to top floating button (mobile friendly) */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full glass border border-border-bright shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none"
          aria-label="Back to top"
        >
          <ArrowUp size={18} className="text-foreground" />
        </motion.button>
      )}
    </footer>
  );
}