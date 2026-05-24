// components/mock-browser.tsx
"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";

export function MockBrowser() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Animated bar heights
  const barHeights = [40, 65, 50, 80, 60, 90, 70, 100];
  const sidebarWidths = [60, 80, 50, 75];

  // Staggered animation for bars
  const barVariants: Variants = {
    hidden: {
      height: 0,
    },
  
    visible: (i: number = 0) => ({
      height: `${barHeights[i]}%`,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: "easeOut" as const,
      },
    }),
  };
  
  const sidebarVariants: Variants = {
    hidden: {
      width: 0,
    },
  
    visible: (i: number = 0) => ({
      width: `${sidebarWidths[i]}%`,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
  };
  
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
  
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
  
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.4,
      },
    }),
  };

  return (
    <motion.div
      ref={ref}
      className="w-full rounded-xl overflow-hidden border border-border-bright glass shadow-lg hover:shadow-xl transition-shadow duration-500"
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
    >
      {/* Browser Bar with blinking cursor */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-white/5 dark:bg-black/20">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-border" />
          <div className="w-2.5 h-2.5 rounded-full bg-border" />
          <div className="w-2.5 h-2.5 rounded-full bg-border" />
        </div>
        <div className="flex-1 mx-3 bg-surface border border-border rounded-md px-3 py-1 font-mono text-[11px] text-text-muted text-left flex items-center gap-1">
          <span>app.yourproduct.com/dashboard</span>
          <motion.span
            className="inline-block w-[1px] h-3 bg-foreground/50"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Browser Content with animated elements */}
      <div className="h-60 bg-surface/30 relative overflow-hidden">
        {/* Animated gradient scanline (subtle) */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/5 to-transparent"
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        <div className="p-4 h-full">
          <div className="grid grid-cols-[140px_1fr] gap-3 h-full">
            {/* Sidebar with loading skeletons that animate in */}
            <div className="glass rounded-lg border border-border p-3">
              {sidebarWidths.map((width, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={sidebarVariants}
                  initial="hidden"
                  animate={controls}
                  className="h-2 rounded-full bg-border-bright mb-2"
                />
              ))}
              <motion.div
                custom={4}
                variants={sidebarVariants}
                initial="hidden"
                animate={controls}
                className="h-2 rounded-full bg-border/50 mt-2"
                style={{ width: "40%" }}
              />
            </div>

            {/* Main Content */}
            <div className="flex flex-col gap-2">
              {/* Chart area with animated bars */}
              <div className="flex-1 glass rounded-lg border border-border p-3 flex items-end gap-1">
                {barHeights.map((_, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={barVariants}
                    initial="hidden"
                    animate={controls}
                    className="flex-1 bg-border-bright rounded-t-sm origin-bottom"
                  />
                ))}
              </div>

              {/* Stats cards with fade-in */}
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate={controls}
                    className="flex-1 glass rounded-lg border border-border p-2"
                  >
                    <div className="w-1/2 h-2 rounded-full bg-border-bright mb-1.5" />
                    <div className="w-2/3 h-1.5 rounded-full bg-surface" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom glow (pulsing) */}
        <motion.div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/5 h-20 bg-foreground blur-[50px] rounded-full pointer-events-none"
          animate={{ opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}