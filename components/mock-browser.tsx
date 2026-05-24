// components/mock-browser.tsx
"use client";

export function MockBrowser() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border-bright glass">
      {/* Browser Bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-white/5 dark:bg-black/20">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-border" />
          <div className="w-2.5 h-2.5 rounded-full bg-border" />
          <div className="w-2.5 h-2.5 rounded-full bg-border" />
        </div>
        <div className="flex-1 mx-3 bg-surface border border-border rounded-md px-3 py-1 font-mono text-[11px] text-text-muted text-left">
          app.yourproduct.com/dashboard
        </div>
      </div>

      {/* Browser Content */}
      <div className="h-60 bg-surface/30 relative overflow-hidden">
        <div className="p-4 h-full">
          <div className="grid grid-cols-[140px_1fr] gap-3 h-full">
            {/* Sidebar */}
            <div className="glass rounded-lg border border-border p-3">
              {[60, 80, 50, 75].map((width, i) => (
                <div key={i} className="h-2 rounded-full bg-border-bright mb-2" style={{ width: `${width}%` }} />
              ))}
              <div className="h-2 rounded-full bg-border/50 mt-2" style={{ width: "40%" }} />
            </div>

            {/* Main Content */}
            <div className="flex flex-col gap-2">
              <div className="flex-1 glass rounded-lg border border-border p-3 flex items-end gap-1">
                {[40, 65, 50, 80, 60, 90, 70, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-border-bright rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex-1 glass rounded-lg border border-border p-2">
                    <div className="w-1/2 h-2 rounded-full bg-border-bright mb-1.5" />
                    <div className="w-2/3 h-1.5 rounded-full bg-surface" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/5 h-20 bg-foreground blur-[50px] opacity-5 rounded-full pointer-events-none" />
      </div>
    </div>
  );
}