"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Magnetic from "./Magnetic";

export default function Footer() {
  const [time, setTime] = useState("");
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(date));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-linen border-t border-dolphin/10 px-6 py-12 md:py-16 select-none overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        
        {/* Left: Copyright */}
        <div className="flex flex-col gap-1 items-center md:items-start text-xs text-dolphin/60">
          <span>
            © {currentYear} Gracious Joseph Ben. All rights reserved.
          </span>
          <span className="font-light text-[10px] text-dolphin/40">
            Handcrafted with Next.js 15, TypeScript, & Tailwind CSS
          </span>
        </div>

        {/* Center: Live Digital Clock (Kochi) */}
        <div className="flex flex-col items-center gap-1.5 bg-dolphin/5 px-6 py-2.5 rounded-2xl border border-dolphin/5">
          <span className="text-[9px] uppercase tracking-widest text-dolphin/40 font-bold">
            Local Time (Kochi, IN)
          </span>
          <span className="font-mono text-sm font-semibold text-dolphin tabular-nums">
            {time || "12:00:00 AM"}
          </span>
        </div>

        {/* Right: Back to top */}
        <Magnetic>
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-2 px-5 py-3 border border-dolphin/10 hover:border-dolphin/30 hover:bg-dolphin/5 rounded-full text-dolphin text-xs font-semibold uppercase tracking-wider transition-colors duration-300 cursor-none"
            data-cursor="TOP"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </Magnetic>

      </div>
    </footer>
  );
}
