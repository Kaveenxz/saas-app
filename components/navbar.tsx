"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun } from "lucide-react";

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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-border" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg glass border border-border-bright flex items-center justify-center text-sm transition-transform group-hover:scale-105">
            ✦
          </div>
          <span className="font-mono text-sm font-medium tracking-tight">Prism</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-text-dim hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 rounded-lg glass border border-border flex items-center justify-center text-text-dim hover:text-foreground transition-all"
            aria-label="Toggle theme"
          >
            {/* Only render the icon after mounting to avoid hydration mismatch */}
            {mounted ? (
              theme === "dark" ? <Sun size={14} /> : <Moon size={14} />
            ) : (
              <div className="w-3.5 h-3.5 rounded-full bg-text-muted/50" /> // placeholder
            )}
          </button>
          <button className="btn text-sm px-4 py-2 rounded-xl glass border border-border text-text-dim hover:text-foreground transition-all">
            Sign in
          </button>
          <button className="btn-primary text-sm px-5 py-2 rounded-xl bg-foreground text-background hover:opacity-90 transition-all font-medium">
            Get started →
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-9 h-9 rounded-lg glass border border-border flex items-center justify-center"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-border mt-2 py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-text-dim hover:text-foreground transition-colors py-2"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-border">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-lg glass border border-border flex items-center justify-center"
            >
              {mounted ? (
                theme === "dark" ? <Sun size={14} /> : <Moon size={14} />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full bg-text-muted/50" />
              )}
            </button>
            <button className="btn text-sm px-4 py-2 rounded-xl glass border border-border text-text-dim">
              Sign in
            </button>
            <button className="btn-primary text-sm px-5 py-2 rounded-xl bg-foreground text-background font-medium">
              Get started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}