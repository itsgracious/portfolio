"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Mail, Download, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Magnetic from "./Magnetic";

// Local Counter component for page load animation
function HeroCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const totalSteps = 40;
    const stepVal = end / totalSteps;
    const stepTime = duration / totalSteps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(currentStep * stepVal));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-amethyst tracking-tight leading-none">
      {count}
      {suffix}
    </span>
  );
}

export default function Hero() {
  // Parallax physics setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Map mouse positions to parallax offset values
  const bgX = useTransform(springX, (val) => val * 0.012);
  const bgY = useTransform(springY, (val) => val * 0.012);
  const blobX = useTransform(springX, (val) => val * -0.03);
  const blobY = useTransform(springY, (val) => val * -0.03);
  const cardTiltX = useTransform(springY, (val) => val * 0.02);
  const cardTiltY = useTransform(springX, (val) => val * -0.02);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;
    mouseX.set(clientX - width / 2);
    mouseY.set(clientY - height / 2);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col justify-between p-6 md:p-12 overflow-hidden bg-linen select-none pt-24"
    >
      {/* Parallax Floating Ambient Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Dot pattern background */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute inset-0 dot-matrix"
        />

        {/* Soft luxury blurred shape */}
        <motion.div
          style={{ x: blobX, y: blobY }}
          className="absolute top-1/4 left-1/3 w-[40vw] h-[40vw] rounded-full bg-amethyst-light blur-[120px] opacity-70"
        />
      </div>

      {/* Top Header Row */}
      <div className="w-full flex justify-between items-center z-10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-dolphin/40 font-semibold">
          AI Researcher & Software Engineer
        </span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-dolphin/40 font-semibold">
          Kochi, Kerala, India
        </span>
      </div>

      {/* Main Grid Content Layout */}
      <div className="relative z-10 flex flex-col justify-center flex-grow max-w-6xl mx-auto w-full py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* Left Column: Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ rotateX: cardTiltX, rotateY: cardTiltY }}
            className="col-span-1 md:col-span-5 flex justify-center md:justify-start"
          >
            <div
              className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[3/4] rounded-[32px] overflow-hidden bg-amethyst/5 border border-amethyst/10 p-3 shadow-2xl transition-all duration-200 cursor-none"
              data-cursor="TILT"
              style={{
                boxShadow: "0 20px 45px rgba(101, 90, 124, 0.06)",
              }}
            >
              {/* Inner frame */}
              <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-linen border border-dolphin/5">
                <Image
                  src="/profile.jpg"
                  alt="Gracious Joseph Ben"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 340px"
                />
                
                {/* Visual overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-dolphin/30 via-transparent to-transparent opacity-80 pointer-events-none" />
                
                {/* Photo Tag Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                  <span className="text-[9px] font-bold text-linen bg-dolphin/60 backdrop-blur-md px-2.5 py-1 rounded-full uppercase tracking-wider">
                    AI & Mobile Dev
                  </span>
                  <span className="text-[9px] font-bold text-linen bg-dolphin/60 backdrop-blur-md px-2.5 py-1 rounded-full uppercase tracking-wider">
                    v.2026
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="col-span-1 md:col-span-7 flex flex-col gap-6"
          >
            {/* Availability Pill */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-semibold text-emerald-600 uppercase tracking-wider">
                Available for work · India
              </span>
            </div>

            {/* Intro */}
            <span className="text-xs font-semibold text-dolphin/60 tracking-[0.15em] uppercase">
              HI, I'M GRACIOUS –
            </span>

            {/* Main Header */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-dolphin font-syne leading-[1.05]">
              I build <span className="text-amethyst font-normal italic font-syne">intelligent</span> <br /> AI systems
            </h1>

            {/* Subtitle / Description */}
            <p className="text-sm sm:text-base text-dolphin/70 leading-relaxed font-light max-w-xl">
              Python and Flutter on the back and front. I build edge-AI threat classifiers, multi-agent recommendation engines, and privacy-first note cleaners.
            </p>

            {/* Quote Block */}
            <div className="border-l-2 border-amethyst/30 pl-4 py-1.5">
              <p className="font-syne italic text-xs text-dolphin/80 leading-relaxed">
                "Why first. Code second."
              </p>
              <p className="text-[9px] uppercase tracking-[0.15em] text-dolphin/40 font-bold mt-1">
                — FIND THE ROOT, FIX WHAT ACTUALLY MOVES THE BUSINESS
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 items-center mt-2">
              <Magnetic>
                <button
                  onClick={() => handleScrollTo("projects")}
                  data-cursor="GO"
                  className="px-5 py-3 bg-dolphin text-linen rounded-full font-medium text-[10px] uppercase tracking-wider shadow-lg hover:shadow-dolphin/20 transition-all cursor-none"
                >
                  See my work
                </button>
              </Magnetic>

              <Magnetic>
                <button
                  onClick={() => handleScrollTo("contact")}
                  data-cursor="TALK"
                  className="px-5 py-3 border border-dolphin/20 text-dolphin hover:bg-dolphin hover:text-linen rounded-full font-medium text-[10px] uppercase tracking-wider transition-all cursor-none"
                >
                  Get in touch
                </button>
              </Magnetic>

              <Magnetic>
                <a
                  href="/resume.pdf"
                  download
                  className="px-5 py-3 border border-amethyst/20 text-amethyst hover:bg-amethyst hover:text-linen rounded-full font-medium text-[10px] uppercase tracking-wider transition-all cursor-none flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Resume
                </a>
              </Magnetic>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-4 mt-4">
              <span className="text-[9px] font-bold text-dolphin/30 uppercase tracking-widest">
                Find Me
              </span>
              <span className="w-6 h-px bg-dolphin/10" />
              
              <div className="flex items-center gap-2">
                <Magnetic pullFactor={0.2}>
                  <a
                    href="https://github.com/itsgracious"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-dolphin text-linen hover:bg-amethyst transition-colors duration-300 rounded-xl cursor-none flex items-center justify-center"
                    data-cursor="CODE"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                </Magnetic>

                <Magnetic pullFactor={0.2}>
                  <a
                    href="https://linkedin.com/in/gracious-ben"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-dolphin text-linen hover:bg-amethyst transition-colors duration-300 rounded-xl cursor-none flex items-center justify-center"
                    data-cursor="LINK"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </Magnetic>

                <Magnetic pullFactor={0.2}>
                  <a
                    href="mailto:graciousben.dev@gmail.com"
                    className="p-2.5 bg-dolphin text-linen hover:bg-amethyst transition-colors duration-300 rounded-xl cursor-none flex items-center justify-center"
                    data-cursor="MAIL"
                  >
                    <Mail className="w-3.5 h-3.5 stroke-[2.5px]" />
                  </a>
                </Magnetic>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Bottom Stats Row (New 3 stats replacing old 4) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-dolphin/10 pt-8 mt-12 md:mt-16 w-full"
        >
          {/* Stat 1 */}
          <div className="flex flex-col gap-1 p-5 rounded-2xl bg-linen border border-dolphin/5 shadow-sm hover:border-amethyst/20 transition-colors duration-300">
            <HeroCounter value={10} suffix="+" />
            <span className="text-[10px] uppercase tracking-wider text-dolphin/40 font-bold">
              Projects Delivered
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col gap-1 p-5 rounded-2xl bg-linen border border-dolphin/5 shadow-sm hover:border-amethyst/20 transition-colors duration-300">
            <HeroCounter value={20} suffix="+" />
            <span className="text-[10px] uppercase tracking-wider text-dolphin/40 font-bold">
              Technical Skills
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col gap-1 p-5 rounded-2xl bg-linen border border-dolphin/5 shadow-sm hover:border-amethyst/20 transition-colors duration-300">
            <HeroCounter value={25} suffix="+" />
            <span className="text-[10px] uppercase tracking-wider text-dolphin/40 font-bold">
              GitHub Repositories
            </span>
          </div>
        </motion.div>

      </div>

      {/* Bottom helper scroll indicator */}
      <div className="w-full flex justify-center items-center z-10 pt-4">
        <Magnetic>
          <button
            onClick={() => handleScrollTo("about")}
            data-cursor="ABOUT"
            className="p-3 border border-dolphin/10 hover:border-dolphin/30 rounded-full text-dolphin transition-all duration-300 cursor-none"
          >
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </Magnetic>
      </div>
    </section>
  );
}
