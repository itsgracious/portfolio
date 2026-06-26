"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
}

const experienceData: ExperienceItem[] = [
  {
    role: "Android App Development Intern",
    company: "Muthoot Institute of Technology and Science (MITS)",
    period: "June 2025",
    location: "Kochi, Kerala, India",
    points: [
      "Gained hands-on experience in Flutter development from beginner to intermediate concepts.",
      "Built multiple UI-driven mobile application modules using Flutter and Dart.",
      "Worked on responsive design, navigation mechanics, and basic state management nodes."
    ]
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Scroll progress for vertical line animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-24 md:py-32 w-full bg-linen overflow-hidden"
    >
      {/* Decorative vertical lines */}
      <div className="absolute top-0 bottom-0 left-1/10 w-px bg-dolphin/5 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-1/10 w-px bg-dolphin/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-[10px] uppercase tracking-[0.25em] text-amethyst font-bold">
            04 / CAREER HISTORY
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-syne text-dolphin mt-2 tracking-tight">
            Professional Experience
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-3xl mx-auto mt-12 pl-8 md:pl-16">
          {/* Vertical scroll tracker line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-dolphin/10 pointer-events-none">
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="w-full h-full bg-amethyst"
            />
          </div>

          {/* Timeline Items */}
          <div className="flex flex-col gap-12">
            {experienceData.map((item, idx) => (
              <TimelineItem key={idx} item={item} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Single Timeline Item
function TimelineItem({ item, index }: { item: ExperienceItem; index: number }) {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-100px" });

  return (
    <div ref={itemRef} className="relative">
      {/* Timeline Circle Indicator */}
      <div className="absolute -left-[37px] md:-left-[45px] top-1.5 z-10 w-6 h-6 rounded-full bg-linen border-2 border-amethyst flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="w-2.5 h-2.5 rounded-full bg-amethyst"
        />
      </div>

      {/* Card Body */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="p-8 rounded-3xl bg-linen border border-dolphin/10 hover:border-amethyst/30 transition-all duration-500 shadow-[0_4px_30px_rgba(101,90,124,0.02)] hover:shadow-[0_12px_40px_rgba(171,146,191,0.06)] cursor-none"
        data-cursor="INTERN"
      >
        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold font-syne text-dolphin">
              {item.role}
            </h3>
            <span className="text-sm font-semibold text-amethyst">
              {item.company}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1.5 text-xs text-dolphin/60">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{item.period}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{item.location}</span>
            </div>
          </div>
        </div>

        {/* Detailed Points */}
        <ul className="flex flex-col gap-3 mt-6 border-t border-dolphin/10 pt-6">
          {item.points.map((pt, pIdx) => (
            <li key={pIdx} className="flex gap-3 text-sm text-dolphin/70 leading-relaxed font-light">
              <span className="text-amethyst select-none font-bold">•</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
