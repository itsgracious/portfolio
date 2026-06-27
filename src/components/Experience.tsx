"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin, Rocket, Send, Check, Layers, Clock, User, Code2, Quote } from "lucide-react";
import Image from "next/image";
import Magnetic from "./Magnetic";

// Custom SVG Icons
const MitsLogo = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 select-none shrink-0" fill="none">
    <rect width="100" height="100" rx="20" fill="white" />
    <path d="M25 70V35L50 50L75 35V70" stroke="#007A3E" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M25 30L50 45L75 30" stroke="#007A3E" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    <text x="50" y="90" textAnchor="middle" fill="#007A3E" fontSize="12" fontWeight="bold" fontFamily="sans-serif">MITS</text>
  </svg>
);

const MountainIllustration = () => (
  <svg viewBox="0 0 200 100" className="w-36 h-20 text-amethyst/40 select-none shrink-0" fill="none" stroke="currentColor">
    {/* Mountains */}
    <path d="M20 90 L80 35 L120 70 L160 25 L200 90 Z" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(184, 161, 217, 0.03)" />
    <path d="M55 55 L85 90" strokeWidth="1" strokeDasharray="2 2" />
    <path d="M140 45 L175 90" strokeWidth="1" strokeDasharray="2 2" />
    
    {/* Flag Pole and Flag */}
    <line x1="160" y1="25" x2="160" y2="8" strokeWidth="1.5" />
    <path d="M160 8 L180 13 L160 18 Z" fill="currentColor" />
    
    {/* Little Pine Trees */}
    <path d="M10 90 L15 82 L20 90 M15 82 L15 90" strokeWidth="1.2" />
    <path d="M185 90 L190 82 L195 90 M190 82 L190 90" strokeWidth="1.2" />
  </svg>
);

// Tech Icons for badges
const TechIcons = {
  flutter: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12.16 14.5c.34-.14.73-.22 1.14-.22 1.48 0 2.7 1.22 2.7 2.7v2.7h-2.7v-2.7c0-.5-.4-.9-.9-.9s-.9.4-.9.9v2.7h-2.7V17c0-1.48 1.22-2.7 2.7-2.7.27 0 .53.04.76.12z" fill="#02569B" stroke="#02569B" />
      <path d="M22 6.5L14 14.5L10 10.5L18 2.5H22Z" fill="#0175C2" />
      <path d="M14 14.5L22 22.5H18L10 14.5L14 10.5Z" fill="#13B9FD" />
    </svg>
  ),
  dart: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 12l10 10 10-10L12 2zm1 3.5l6.5 6.5-2.5 2.5L10.5 8 13 5.5zm-5 5L14.5 17 12 19.5 5.5 13 8 10.5z" fill="#00B4AB" />
    </svg>
  ),
  firebase: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.89 15.55L7.96 2.34a.43.43 0 0 1 .82 0l1.7 5.5z" fill="#FFA000" />
      <path d="M12.1 7.84l-1.62-3.15a.43.43 0 0 0-.76 0L3.89 15.55l8.21-7.71z" fill="#F57C00" />
      <path d="M20.11 15.55l-4-8-4 8 4 4.5z" fill="#FFCA28" />
    </svg>
  ),
  git: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.4 11.2L12.8 3.6c-.8-.8-2-.8-2.8 0L9.1 4.7l2.8 2.8c.6-.2 1.4.1 1.9.6.6.6.7 1.5.3 2.1l2.8 2.8c.7-.4 1.5-.3 2.1.3.8.8.8 2.1 0 2.9-.8.8-2.1.8-2.9 0-.6-.6-.7-1.5-.3-2.1L13 11.3c-.4.3-1 .4-1.5.2L8.7 14.3c.2.5.1 1.1-.3 1.5-.8.8-2.1.8-2.9 0-.8-.8-.8-2.1 0-2.9.4-.4 1-.5 1.5-.3l2.8-2.8c-.2-.5-.1-1.1.3-1.5.4-.4.9-.5 1.4-.4L8.7 5.1l-.8.8c-.8.8-.8 2 0 2.8l7.6 7.6c.8.8 2 .8 2.8 0l2.1-2.1c.8-.8.8-2 0-2.8z" fill="#F05032" />
    </svg>
  ),
  vscode: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.986 6.568l-3.342-4.99L9.43 14.512 3.12 9.53.11 11.53l6.452 4.996L3.22 21.52l17.424-9.948 3.342-4.996zM13.25 12l7.158 5.61-7.158 5.61V12z" fill="#007ACC" />
    </svg>
  )
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  const responsibilities = [
    "Gained hands-on experience in Flutter development from beginner to intermediate concepts.",
    "Built multiple UI-driven mobile application modules using Flutter and Dart.",
    "Worked on responsive design, navigation mechanics, and basic state management nodes."
  ];

  const techBadges = [
    { name: "Flutter", icon: TechIcons.flutter },
    { name: "Dart", icon: TechIcons.dart },
    { name: "Firebase", icon: TechIcons.firebase },
    { name: "Git", icon: TechIcons.git },
    { name: "VS Code", icon: TechIcons.vscode }
  ];

  // Badges floating around the smartphone mockup
  const floatingBadges = [
    { name: "Flutter", icon: TechIcons.flutter, top: "10%", right: "-12%", delay: 0 },
    { name: "Dart", icon: TechIcons.dart, top: "32%", right: "-18%", delay: 0.4 },
    { name: "Firebase", icon: TechIcons.firebase, top: "54%", right: "-12%", delay: 0.8 },
    { name: "Git", icon: TechIcons.git, bottom: "15%", left: "-12%", delay: 0.2 }
  ];

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-24 md:py-32 w-full bg-linen overflow-hidden"
    >
      {/* Decorative background grid and divider lines */}
      <div className="absolute top-0 bottom-0 left-1/10 w-px bg-dolphin/5 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-1/10 w-px bg-dolphin/5 pointer-events-none" />
      
      {/* Soft ambient glows */}
      <div className="absolute right-[-10vw] top-1/4 w-[40vw] h-[40vw] bg-amethyst/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute left-[-5vw] bottom-1/4 w-[35vw] h-[35vw] bg-amethyst-light rounded-full blur-[110px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-amethyst font-bold">
            04 / CAREER HISTORY
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-syne text-dolphin mt-2 tracking-tight relative w-fit">
            Professional Experience
            {/* Custom thick amethyst underline matching header style */}
            <div className="h-1 w-24 bg-amethyst mt-4 rounded-full" />
          </h2>
          <p className="text-sm sm:text-base text-dolphin/60 font-light mt-4 max-w-xl leading-relaxed">
            A timeline of my journey through hands-on learning, real-world projects, and continuous growth.
          </p>
        </motion.div>

        {/* Timeline Content Block */}
        <div className="relative w-full pl-6 md:pl-28 mt-12">
          
          {/* Vertical Timeline Track Line */}
          {/* Solid line for current experience */}
          <div className="absolute left-[11px] md:left-12 top-4 bottom-24 w-[2px] bg-amethyst/20 pointer-events-none z-0">
            {/* Dashed line extension for future timeline */}
            <div className="absolute left-[-1px] bottom-0 h-28 w-[2px] border-l-2 border-dashed border-amethyst/30" />
          </div>

          {/* Node 1: Present Internship */}
          <div className="relative w-full mb-16">
            
            {/* Timeline dot & Date Label (Desktop: Absolute left of line; Mobile: Header level) */}
            <div className="absolute -left-[20px] md:-left-28 top-4 flex items-center gap-3 z-10">
              <div className="w-4 h-4 rounded-full bg-amethyst border-4 border-linen shadow-[0_0_0_2px_rgba(184,161,217,0.4)]" />
              
              <div className="hidden md:flex flex-col text-left leading-tight w-20">
                <span className="text-xs font-bold text-dolphin">Jun 2025</span>
                <span className="text-[10px] font-bold text-dolphin/40 uppercase tracking-wider">Present</span>
              </div>
            </div>

            {/* Content Row: Main Card & Phone Mockup */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Main Internship Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-1 lg:col-span-8 p-6 md:p-8 rounded-[32px] bg-white/40 border border-dolphin/10 shadow-[0_8px_30px_rgba(101,90,124,0.02)] hover:shadow-[0_16px_50px_rgba(171,146,191,0.08)] transition-all duration-300 flex flex-col gap-6 md:gap-8 cursor-none"
                data-cursor="CARD"
              >
                {/* Mobile Date Header (visible on mobile only) */}
                <div className="flex md:hidden items-center gap-1.5 text-xs font-bold text-dolphin mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>June 2025 - Present</span>
                </div>

                {/* Card Header Info */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-dolphin/5">
                  <div className="flex gap-4">
                    {/* Mits Logo Container */}
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-[0_4px_15px_rgba(101,90,124,0.03)] border border-dolphin/5 shrink-0">
                      <MitsLogo />
                    </div>
                    
                    <div className="flex flex-col">
                      <h3 className="text-lg md:text-xl font-bold font-syne text-dolphin leading-snug">
                        Android App Development Intern
                      </h3>
                      <span className="text-xs md:text-sm font-semibold text-amethyst mt-0.5">
                        Muthoot Institute of Technology and Science (MITS)
                      </span>
                      
                      {/* Sub-details row */}
                      <div className="hidden sm:flex items-center gap-4 text-[10px] font-bold text-dolphin/40 uppercase tracking-wider mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 stroke-[2.5px]" />
                          <span>June 2025</span>
                        </div>
                        <span>|</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 stroke-[2.5px]" />
                          <span>Kochi, Kerala, India</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Role Pill */}
                  <span className="px-4 py-1.5 rounded-full bg-amethyst-light border border-amethyst/10 text-amethyst text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0 self-start sm:self-auto mt-1 sm:mt-0">
                    <Briefcase className="w-3.5 h-3.5" />
                    Internship
                  </span>
                </div>

                {/* Grid Body */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Responsibilities */}
                  <div className="md:col-span-7 flex flex-col gap-4">
                    <h4 className="text-[11px] uppercase tracking-wider text-dolphin/50 font-bold flex items-center gap-2 mb-1">
                      <Code2 className="w-4 h-4 stroke-[2.5px]" />
                      Key Responsibilities
                    </h4>
                    
                    <ul className="flex flex-col gap-4">
                      {responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-3.5">
                          <div className="w-5 h-5 rounded-full bg-amethyst-light text-amethyst flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                            <Check className="w-3.5 h-3.5 stroke-[3px]" />
                          </div>
                          <span className="text-xs sm:text-sm text-dolphin/70 leading-relaxed font-light">
                            {resp}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Mini Metric Cards */}
                  <div className="md:col-span-5 flex flex-col gap-3">
                    {/* Metric 1 */}
                    <div className="p-4 rounded-2xl bg-white/40 border border-dolphin/5 flex items-center gap-3.5 shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-amethyst-light text-amethyst flex items-center justify-center shrink-0">
                        <Layers className="w-4 h-4 stroke-[2.5px]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-dolphin leading-none">5+</span>
                        <span className="text-[9px] uppercase tracking-wider text-dolphin/40 font-bold mt-1">Modules Built</span>
                      </div>
                    </div>

                    {/* Metric 2 */}
                    <div className="p-4 rounded-2xl bg-white/40 border border-dolphin/5 flex items-center gap-3.5 shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-amber-600 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 stroke-[2.5px]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-dolphin leading-none">4 Weeks</span>
                        <span className="text-[9px] uppercase tracking-wider text-dolphin/40 font-bold mt-1">Duration</span>
                      </div>
                    </div>

                    {/* Metric 3 */}
                    <div className="p-4 rounded-2xl bg-white/40 border border-dolphin/5 flex items-center gap-3.5 shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 stroke-[2.5px]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-dolphin leading-none">Internship</span>
                        <span className="text-[9px] uppercase tracking-wider text-dolphin/40 font-bold mt-1">Role</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer Tech Section */}
                <div className="pt-6 border-t border-dolphin/5 flex flex-wrap items-center gap-3">
                  <span className="text-[10px] uppercase tracking-wider text-dolphin/40 font-bold flex items-center gap-1.5 mr-2">
                    <Code2 className="w-3.5 h-3.5 stroke-[2.5px]" />
                    Technologies Used
                  </span>
                  
                  <div className="flex flex-wrap gap-2">
                    {techBadges.map((badge, bIdx) => (
                      <div
                        key={bIdx}
                        className="px-3 py-1.5 rounded-xl bg-white border border-dolphin/5 shadow-sm flex items-center gap-2 text-[10px] font-bold text-dolphin/70"
                      >
                        {badge.icon}
                        <span>{badge.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>

              {/* Right Phone Mockup Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="col-span-1 lg:col-span-4 flex justify-center items-center relative py-6"
              >
                {/* Dotted orbits surrounding phone */}
                <div className="absolute w-[280px] h-[280px] border border-amethyst/10 rounded-full flex items-center justify-center z-0 animate-[spin_80s_linear_infinite]" />
                <div className="absolute w-[200px] h-[200px] border border-dashed border-amethyst/15 rounded-full z-0" />
                
                {/* Ambient glow behind mockup */}
                <div className="absolute w-[200px] h-[200px] bg-amethyst/10 rounded-full blur-[50px] pointer-events-none z-0" />

                {/* Real-time Phone body mockup slanted to the right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 6 } : { opacity: 0, scale: 0.95, rotate: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="relative w-full max-w-[215px] aspect-[455/925] z-10 cursor-none drop-shadow-[0_15px_30px_rgba(101,90,124,0.18)]"
                  data-cursor="MOCKUP"
                >
                  <Image
                    src="/experience_phone.png"
                    alt="Notes Cleanser App Mockup"
                    fill
                    unoptimized
                    className="select-none object-contain"
                    priority
                  />
                </motion.div>

                {/* Floating Orbiting Badges */}
                {floatingBadges.map((badge, bIdx) => (
                  <motion.div
                    key={bIdx}
                    style={{
                      position: "absolute",
                      top: badge.top,
                      right: badge.right,
                      bottom: badge.bottom,
                      left: badge.left,
                      zIndex: 20,
                    }}
                    animate={{
                      y: [0, -8, 0]
                    }}
                    transition={{
                      duration: 4.5 + bIdx * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: badge.delay
                    }}
                    className="badge-glass px-3.5 py-1.5 rounded-2xl flex items-center gap-2 text-[9px] font-bold text-dolphin hover:border-amethyst/50 transition-colors shadow-md pointer-events-auto"
                  >
                    {badge.icon}
                    <span>{badge.name}</span>
                  </motion.div>
                ))}
              </motion.div>

            </div>

          </div>

          {/* Node 2: Future Opportunities Call-to-Action Card */}
          <div className="relative w-full">
            
            {/* Timeline dot & Date Label (Desktop: Absolute left of line; Mobile: Header level) */}
            <div className="absolute -left-[20px] md:-left-28 top-4 flex items-center gap-3 z-10">
              <div className="w-4 h-4 rounded-full bg-linen border-4 border-amethyst/50 shadow-md" />
              
              <div className="hidden md:flex flex-col text-left leading-tight w-20">
                <span className="text-xs font-bold text-dolphin/60">Future</span>
                <span className="text-[10px] font-bold text-dolphin/30 uppercase tracking-wider">Opportunities</span>
              </div>
            </div>

            {/* "What's Next?" Call-to-Action Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="p-6 rounded-[28px] border-2 border-dashed border-amethyst/20 bg-amethyst-light/5 hover:bg-amethyst-light/10 transition-colors duration-300 flex flex-col md:flex-row justify-between items-center gap-6 cursor-none"
              data-cursor="GO"
            >
              <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
                <div className="w-12 h-12 rounded-full bg-amethyst-light text-amethyst flex items-center justify-center shrink-0 shadow-sm animate-pulse">
                  <Rocket className="w-5 h-5 stroke-[2.5px]" />
                </div>
                
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-base font-bold font-syne text-dolphin">What's Next?</h4>
                  <p className="text-xs sm:text-sm text-dolphin/60 font-light leading-relaxed max-w-xl">
                    I'm actively looking for opportunities to contribute, learn, and build impactful solutions with great teams.
                  </p>
                </div>
              </div>

              <Magnetic>
                <button
                  onClick={() => {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-3.5 bg-amethyst text-linen rounded-full font-bold text-[10px] uppercase tracking-wider shadow-lg hover:shadow-amethyst/20 transition-all flex items-center gap-2 cursor-none"
                  data-cursor="GO"
                >
                  <Send className="w-3.5 h-3.5 stroke-[2.5px]" />
                  Open to Opportunities
                </button>
              </Magnetic>
            </motion.div>

          </div>

          {/* Timeline Quote & Mountain Illustration Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-16 pt-8 border-t border-dolphin/5 flex flex-col md:flex-row justify-between items-center gap-8 w-full"
          >
            {/* Quote Block */}
            <div className="flex items-start gap-4 max-w-md">
              <Quote className="w-8 h-8 text-amethyst/30 rotate-180 shrink-0" />
              <p className="text-sm font-light text-dolphin/70 italic leading-relaxed pt-1">
                Experience is not just about the work we do, but the <span className="font-semibold text-dolphin not-italic">impact</span> we create along the way.
              </p>
            </div>

            {/* Signature & Vector Mountain Illustration */}
            <div className="flex items-center gap-8">
              <div className="flex flex-col text-right select-none font-syne font-bold text-xs uppercase tracking-wider text-amethyst leading-relaxed">
                <span>Always learning.</span>
                <span>Always building.</span>
              </div>
              
              <MountainIllustration />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
