// components/footer.tsx
"use client";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-md glass border border-border-bright flex items-center justify-center text-[10px]">✦</div>
              <span className="font-mono text-xs font-medium">Prism</span>
            </div>
            <div className="font-mono text-[11px] text-text-muted">Premium SaaS template.</div>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-wider text-text-muted uppercase mb-3">Product</div>
            <div className="flex flex-col gap-2">
              <a href="#" className="font-mono text-[11px] text-text-muted hover:text-text-dim transition">Features</a>
              <a href="#" className="font-mono text-[11px] text-text-muted hover:text-text-dim transition">Pricing</a>
              <a href="#" className="font-mono text-[11px] text-text-muted hover:text-text-dim transition">Changelog</a>
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-wider text-text-muted uppercase mb-3">Resources</div>
            <div className="flex flex-col gap-2">
              <a href="#" className="font-mono text-[11px] text-text-muted hover:text-text-dim transition">Docs</a>
              <a href="#" className="font-mono text-[11px] text-text-muted hover:text-text-dim transition">GitHub</a>
              <a href="#" className="font-mono text-[11px] text-text-muted hover:text-text-dim transition">Twitter</a>
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-wider text-text-muted uppercase mb-3">Legal</div>
            <div className="flex flex-col gap-2">
              <a href="#" className="font-mono text-[11px] text-text-muted hover:text-text-dim transition">Privacy</a>
              <a href="#" className="font-mono text-[11px] text-text-muted hover:text-text-dim transition">Terms</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-border font-mono text-[10px] text-text-muted gap-3">
          <span>© 2025 Prism. All rights reserved.</span>
          <span>Made with Next.js &amp; Tailwind</span>
        </div>
      </div>
    </footer>
  );
}