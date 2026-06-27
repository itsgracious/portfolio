"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Download, ArrowRight, Code2, GitFork, GitCommit } from "lucide-react";
import Image from "next/image";
import Magnetic from "./Magnetic";

// Local Counter component for page load count-up
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
    <span className="font-syne font-bold text-lg sm:text-xl text-dolphin tracking-tight leading-none">
      {count}
      {suffix}
    </span>
  );
}

// Reusable custom SVG icons for brand badges (exact logos)
const TechIcons = {
  python: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.02 1.83c1.07 0 1.94.87 1.94 1.94s-.87 1.94-1.94 1.94-1.94-.87-1.94-1.94.87-1.94 1.94-1.94zM10.22 17h-2.1v-6.3h2.1V17zm.92-7.46c-.52 0-.94-.42-.94-.94s.42-.94.94-.94.94.42.94.94-.42.94-.94.94zm4.86 7.46h-2.1V11.2c0-1.25-.83-1.63-1.42-1.63-.77 0-1.46.59-1.46 1.76V17H8.92V9.7h2.1v.96c.4-.64 1.15-1.16 2.27-1.16 1.63 0 2.71 1.07 2.71 2.9v4.6h.02z" fill="#3776AB" />
      <path d="M12.16 14.5c.34-.14.73-.22 1.14-.22 1.48 0 2.7 1.22 2.7 2.7v2.7h-2.7v-2.7c0-.5-.4-.9-.9-.9s-.9.4-.9.9v2.7h-2.7V17c0-1.48 1.22-2.7 2.7-2.7.27 0 .53.04.76.12z" fill="#FFE873" />
    </svg>
  ),
  flutter: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.16 14.5c.34-.14.73-.22 1.14-.22 1.48 0 2.7 1.22 2.7 2.7v2.7h-2.7v-2.7c0-.5-.4-.9-.9-.9s-.9.4-.9.9v2.7h-2.7V17c0-1.48 1.22-2.7 2.7-2.7.27 0 .53.04.76.12z" fill="#02569B" stroke="#02569B" />
      <path d="M22 6.5L14 14.5L10 10.5L18 2.5H22Z" fill="#0175C2" />
      <path d="M14 14.5L22 22.5H18L10 14.5L14 10.5Z" fill="#13B9FD" />
    </svg>
  ),
  tensorflow: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.25L3.75 7.02v9.54L12 21.33l8.25-4.77V7.02L12 2.25zm-.75 16.48v-6.73H7.5v-1.5h3.75V5.25h1.5v5.25h3.75v1.5h-3.75v6.73h-1.5z" fill="#FF6F00" />
    </svg>
  ),
  opencv: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="7" r="4" stroke="#FF2C2C" />
      <circle cx="7" cy="15" r="4" stroke="#00E600" />
      <circle cx="17" cy="15" r="4" stroke="#0000FF" />
    </svg>
  ),
  yolov8: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 0 18" strokeDasharray="3 3" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  ),
  react: (
    <svg className="w-4 h-4 animate-[spin_10s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="#00d8ff" strokeWidth="2">
      <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(150 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="#00d8ff" />
    </svg>
  ),
  firebase: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.89 15.55L7.96 2.34a.43.43 0 0 1 .82 0l1.7 5.5z" fill="#FFA000" />
      <path d="M12.1 7.84l-1.62-3.15a.43.43 0 0 0-.76 0L3.89 15.55l8.21-7.71z" fill="#F57C00" />
      <path d="M20.11 15.55l-4-8-4 8 4 4.5z" fill="#FFCA28" />
    </svg>
  )
};

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Badge layout coordinates surrounding the portrait (mockup-matched)
  const badges = [
    { name: "TensorFlow", icon: TechIcons.tensorflow, top: "62%", left: "15%", delay: 0 },
    { name: "OpenCV", icon: TechIcons.opencv, top: "39%", left: "5%", delay: 0.4 },
    { name: "Flutter", icon: TechIcons.flutter, top: "7%", left: "1%", delay: 0.8 },
    { name: "Python", icon: TechIcons.python, top: "12%", right: "8%", delay: 0.2 },
    { name: "YOLOv8", icon: TechIcons.yolov8, top: "35%", right: "5%", delay: 0.6 },
    { name: "React", icon: TechIcons.react, top: "60%", right: "8%", delay: 1.0 },
    { name: "Firebase", icon: TechIcons.firebase, top: "72%", right: "32%", delay: 0.5 }
  ];

  const badgeMotion = (idx: number) => ({
    animate: {
      y: [0, -10 - (idx % 3) * 3, 0],
      x: [0, idx % 2 === 0 ? 5 : -5, 0],
      opacity: [1, 0.93, 1]
    },
    transition: {
      duration: 4 + idx * 0.35 + (idx % 3) * 0.15,
      repeat: Infinity,
      repeatType: "mirror",
      ease: [0.22, 1, 0.36, 1],
      delay: badges[idx].delay
    }
  });

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between p-6 md:p-12 overflow-hidden bg-linen select-none pt-24 tech-grid"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Lavender glow behind portrait (Right) */}
        <div className="absolute -right-10 top-1/4 w-[45vw] h-[45vw] bg-amethyst-light rounded-full blur-[140px] opacity-90" />
        
        {/* Soft cream/lavender glow behind headings (Left) */}
        <div className="absolute left-1/12 top-1/3 w-[35vw] h-[35vw] bg-amethyst/10 rounded-full blur-[130px] opacity-40" />

        {/* Orbit curves behind portrait */}
        <div className="absolute right-1/8 top-1/4 w-[380px] h-[380px] border border-amethyst/10 rounded-full flex items-center justify-center animate-[spin_100s_linear_infinite]">
          <div className="absolute top-0 w-1.5 h-1.5 bg-amethyst/30 rounded-full" />
        </div>
        <div className="absolute right-[calc(1/8+40px)] top-[calc(1/4+40px)] w-[300px] h-[300px] border border-dashed border-amethyst/15 rounded-full" />

        {/* Floating crosses and geometric shapes */}
        <div className="absolute left-1/4 top-1/5 text-dolphin/10 text-xl font-light font-sans">+</div>
        <div className="absolute left-1/3 bottom-1/4 text-dolphin/10 text-xl font-light font-sans">+</div>
        <div className="absolute right-1/3 top-1/3 text-dolphin/15 text-sm font-light font-sans">•</div>
        <div className="absolute left-1/12 bottom-1/5 w-2 h-2 rounded-full border border-amethyst/20" />
      </div>

      {/* Top Navbar Space Filler */}
      <div className="w-full flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-amethyst rounded-full" />
          <span className="text-[9px] uppercase tracking-[0.25em] text-dolphin/50 font-bold font-syne">
            AI Engineer & Full Stack Developer
          </span>
        </div>
        <span className="text-[9px] uppercase tracking-[0.25em] text-dolphin/50 font-bold font-syne">
          Kochi, Kerala, India
        </span>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 flex flex-col justify-center flex-grow max-w-6xl mx-auto w-full py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, description, stats, buttons */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-6 md:gap-8 justify-center">
            
            {/* Availability Pill */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-amethyst/30 bg-amethyst-light w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-amethyst animate-pulse" />
              <span className="text-[9px] font-bold text-dolphin uppercase tracking-wider">
                Available for Internship
              </span>
            </div>

            {/* Main Header with lavender underline */}
            <div className="flex flex-col gap-1">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-dolphin font-syne leading-[1.03]">
                I build <br />
                <span className="text-amethyst font-normal italic font-syne pr-2">intelligent</span> <br />
                <div className="relative inline-block">
                  AI systems
                  {/* Handwritten lavender underline brush stroke */}
                  <svg className="absolute -bottom-2.5 left-0 w-full h-3.5 text-amethyst/65" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M1 5 Q 50 9, 99 4.5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
              </h1>
            </div>

            {/* Description Text */}
            <p className="text-sm sm:text-base text-dolphin/70 leading-relaxed font-light max-w-lg mt-2">
              From intelligent AI systems to polished Flutter applications, I build software that solves real-world problems.
            </p>

            {/* Neumorphic Stats Dashboard Row */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-lg my-2">
              {/* Stat 1 */}
              <div className="neumorphism-glass p-3.5 rounded-2xl flex items-center gap-3.5">
                <div className="p-2 bg-amethyst-light text-amethyst rounded-xl h-fit">
                  <Code2 className="w-4 h-4 stroke-[2.5px]" />
                </div>
                <div className="flex flex-col">
                  <HeroCounter value={12} suffix="+" />
                  <span className="text-[8px] uppercase tracking-wider text-dolphin/50 font-bold leading-none mt-1">
                    Projects<br />Completed
                  </span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="neumorphism-glass p-3.5 rounded-2xl flex items-center gap-3.5">
                <div className="p-2 bg-amethyst-light text-amethyst rounded-xl h-fit">
                  <GitFork className="w-4 h-4 stroke-[2.5px]" />
                </div>
                <div className="flex flex-col">
                  <HeroCounter value={20} suffix="+" />
                  <span className="text-[8px] uppercase tracking-wider text-dolphin/50 font-bold leading-none mt-1">
                    GitHub<br />Repos
                  </span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="neumorphism-glass p-3.5 rounded-2xl flex items-center gap-3.5">
                <div className="p-2 bg-amethyst-light text-amethyst rounded-xl h-fit">
                  <GitCommit className="w-4 h-4 stroke-[2.5px]" />
                </div>
                <div className="flex flex-col">
                  <HeroCounter value={300} suffix="+" />
                  <span className="text-[8px] uppercase tracking-wider text-dolphin/50 font-bold leading-none mt-1">
                    Commits<br />This Year
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs and buttons */}
            <div className="flex flex-wrap gap-4 items-center mt-2">
              <Magnetic>
                <button
                  onClick={() => handleScrollTo("projects")}
                  data-cursor="GO"
                  className="px-6 py-3.5 bg-amethyst text-linen rounded-full font-bold text-[10px] uppercase tracking-wider shadow-lg hover:shadow-amethyst/30 hover:-translate-y-0.5 transition-all cursor-none flex items-center gap-2"
                >
                  See my work
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />
                </button>
              </Magnetic>

              <Magnetic>
                <button
                  onClick={() => handleScrollTo("contact")}
                  data-cursor="TALK"
                  className="px-6 py-3.5 border border-dolphin/20 text-dolphin hover:bg-dolphin hover:text-linen rounded-full font-bold text-[10px] uppercase tracking-wider hover:-translate-y-0.5 transition-all cursor-none"
                >
                  Get in touch
                </button>
              </Magnetic>

              <Magnetic>
                <a
                  href="/resume.pdf"
                  download
                  className="px-2 py-3 text-dolphin/70 hover:text-dolphin rounded-full font-bold text-[10px] uppercase tracking-wider transition-colors cursor-none flex items-center gap-1.5 border-b border-dashed border-dolphin/20 hover:border-dolphin"
                >
                  <Download className="w-3.5 h-3.5 stroke-[2.5px]" />
                  Download Resume
                </a>
              </Magnetic>
            </div>

          </div>

          {/* Right Column: Blended Portrait and Floating Badges */}
          <div className="col-span-1 lg:col-span-5 flex justify-center lg:justify-end items-end relative self-end pt-12 pb-0 lg:-mb-12">
            
            {/* Floating circular glow behind the portrait */}
            <div className="absolute w-[360px] h-[360px] bg-amethyst/20 rounded-full blur-[70px] pointer-events-none z-0" />

            {/* Portrait Container - Integrated/Borderless */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[420px] lg:max-w-[480px] aspect-[540/715] z-10 flex items-end justify-center lg:justify-end cursor-none"
              data-cursor="GLOW"
            >
              {/* Anime portrait image, unoptimized, fills bounds */}
              <div className="relative w-full h-full overflow-visible">
                <Image
                  src="/profile_anime_transparent.png"
                  alt="Gracious Joseph Ben - Semi-realistic anime portrait"
                  fill
                  unoptimized
                  className="object-contain object-bottom select-none"
                  priority
                />
              </div>
            </motion.div>

            {/* Floating glassmorphic technology badges */}
            {badges.map((badge, idx) => {
              const motionProps = badgeMotion(idx);
              return (
                <motion.div
                  key={idx}
                  style={{
                    position: "absolute",
                    top: badge.top,
                    left: badge.left,
                    right: badge.right,
                    zIndex: 20,
                  }}
                  animate={motionProps.animate}
                  transition={motionProps.transition}
                  className="badge-glass px-4 py-2 rounded-2xl flex items-center gap-2.5 text-[10px] font-bold text-dolphin hover:border-amethyst/50 transition-colors pointer-events-auto"
                >
                  {badge.icon}
                  <span>{badge.name}</span>
                </motion.div>
              );
            })}

          </div>

        </div>
      </div>

      {/* Bottom helper arrow */}
      <div className="w-full flex flex-col items-center justify-center z-10 pt-4 gap-1.5">
        <span className="text-[8px] uppercase tracking-[0.3em] text-dolphin/30 font-bold">
          Scroll Down
        </span>
        <div className="w-px h-8 bg-dolphin/15 animate-[pulse_2s_infinite]" />
      </div>
    </section>
  );
}
