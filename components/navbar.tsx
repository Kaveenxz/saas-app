"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
  { name: "Changelog", href: "#" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Detect active section
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -30% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    const btn = document.getElementById("theme-toggle-btn");
    if (btn) {
      btn.style.transform = "rotate(360deg)";
      setTimeout(() => btn.style.transform = "", 300);
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setMobileMenuOpen(false);
      }
    }
  };

  // Determine navbar background based on scroll and actual theme
  const navbarBg = scrolled
    ? theme === "dark"
      ? "bg-black/80 backdrop-blur-2xl"
      : "bg-white/80 backdrop-blur-2xl"
    : "bg-transparent backdrop-blur-sm";

  const borderClass = scrolled ? "border-b border-white/20 dark:border-white/10" : "";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navbarBg} ${borderClass}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="relative flex items-center gap-2 group cursor-pointer">
            <div className="relative w-8 h-8 rounded-xl glass border border-border-bright flex items-center justify-center text-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Sparkles size={14} className="text-foreground" />
            </div>
            <span className="font-mono text-sm font-medium tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:to-foreground transition-all duration-300">
              Prism
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="relative group py-2 text-sm font-medium transition-colors duration-200"
                >
                  <span className={`relative z-10 ${isActive ? "text-foreground" : "text-text-dim group-hover:text-foreground"} transition-colors duration-200`}>
                    {link.name}
                  </span>
                  <span className={`absolute -bottom-0.5 left-0 h-[2px] bg-gradient-to-r from-foreground/80 to-foreground/20 rounded-full transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                  {isActive && <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-foreground/60 animate-pulse" />}
                </a>
              );
            })}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="theme-toggle-btn"
              onClick={handleThemeToggle}
              className="relative w-9 h-9 rounded-xl glass border border-border flex items-center justify-center text-text-dim hover:text-foreground transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
                key={mounted ? (theme === "dark" ? "dark" : "light") : "placeholder"}
              >
                {mounted ? (
                  theme === "dark" ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-slate-700" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-text-muted/50" />
                )}
              </motion.div>
            </button>
            <button className="relative px-5 py-2 rounded-xl glass border border-border text-text-dim hover:text-foreground transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden group">
              <Link href={"/auth"}><span className="relative z-10 text-sm">Sign in</span></Link>
              <span className="absolute inset-0 bg-gradient-to-r from-foreground/0 via-foreground/5 to-foreground/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
            <button className="relative px-5 py-2 rounded-xl bg-foreground text-background font-medium text-sm overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
              <span className="relative z-10 flex items-center gap-1">
                Get started <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-9 h-9 rounded-xl glass border border-border flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Menu"
          >
            <motion.div animate={{ rotate: mobileMenuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.div>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-40 md:hidden glass border-b border-border/60 backdrop-blur-2xl shadow-xl"
          >
            <div className="flex flex-col p-5 gap-4">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`relative py-3 px-4 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-foreground/10 text-foreground font-medium border-l-2 border-foreground"
                        : "text-text-dim hover:bg-foreground/5 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                    {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-foreground" />}
                  </motion.a>
                );
              })}
              <div className="flex items-center gap-3 pt-4 mt-2 border-t border-border">
                <button
                  onClick={handleThemeToggle}
                  className="w-9 h-9 rounded-xl glass border border-border flex items-center justify-center transition-all hover:scale-105"
                >
                  {mounted ? (theme === "dark" ? <Sun size={14} /> : <Moon size={14} />) : <div className="w-3.5 h-3.5 rounded-full bg-text-muted/50" />}
                </button>
                <button className="flex-1 px-4 py-2 rounded-xl glass border border-border text-text-dim hover:text-foreground transition-all text-sm">
                <Link href={"/auth"}>Sign in</Link>
                </button>
                <button className="flex-1 px-4 py-2 rounded-xl bg-foreground text-background font-medium text-sm transition-all hover:opacity-90">
                  Get started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}