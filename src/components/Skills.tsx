"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Layers, Cpu, Database, Wrench } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: <Code className="w-5 h-5" />,
    skills: ["Python", "Java", "PHP", "C / C++", "SQL", "JavaScript"],
  },
  {
    title: "Frameworks & Libraries",
    icon: <Layers className="w-5 h-5" />,
    skills: ["Flutter", "React", "CustomTkinter", "ROS-2", "OpenCV", "PIL"],
  },
  {
    title: "Artificial Intelligence",
    icon: <Cpu className="w-5 h-5" />,
    skills: ["Machine Learning", "Computer Vision", "scikit-learn", "YOLOv8", "TensorFlow Lite Micro", "Gemini API (RAG)"],
  },
  {
    title: "Databases & Systems",
    icon: <Database className="w-5 h-5" />,
    skills: ["MySQL", "SQLite", "Database-driven Apps", "JSON Metadata Catalogs"],
  },
  {
    title: "Tools & Hardware",
    icon: <Wrench className="w-5 h-5" />,
    skills: ["Git / GitHub", "VS Code", "Arduino", "Raspberry Pi", "ESP32-S3", "LTE Alerts & Sensors"],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 w-full bg-linen overflow-hidden"
    >
      {/* Decorative vertical lines */}
      <div className="absolute top-0 bottom-0 left-1/10 w-px bg-dolphin/5 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-1/10 w-px bg-dolphin/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-amethyst font-bold">
            02 / SKILLSET
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-syne text-dolphin mt-2 tracking-tight">
            Core Technologies
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative p-8 rounded-3xl bg-linen border border-dolphin/10 hover:border-amethyst/30 transition-all duration-500 shadow-[0_4px_30px_rgba(101,90,124,0.02)] hover:shadow-[0_12px_40px_rgba(171,146,191,0.08)] group hover:-translate-y-1.5 cursor-none"
              data-cursor="EXPAND"
            >
              {/* Inner card light glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amethyst/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amethyst-light text-amethyst rounded-2xl group-hover:bg-amethyst group-hover:text-linen transition-colors duration-500">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold font-syne text-dolphin">
                  {category.title}
                </h3>
              </div>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-2 relative z-10">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3.5 py-1.5 bg-dolphin/5 hover:bg-amethyst/10 text-dolphin border border-dolphin/5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
