"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Award, Calendar, BookOpen, Star } from "lucide-react";

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  score?: string;
  location: string;
}

interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
}

const educationData: EducationItem[] = [
  {
    institution: "Muthoot Institute of Technology and Science (MITS)",
    degree: "B.Tech in Computer Science and Artificial Intelligence",
    period: "Aug. 2023 – May 2027 (Expected)",
    location: "Kochi, Kerala, India",
  },
  {
    institution: "Nirmala Public School (CBSE)",
    degree: "Higher Secondary (Class XII)",
    period: "Graduated May 2023",
    score: "90.6%",
    location: "Kochi, Kerala, India",
  }
];

const certificationsData: CertificationItem[] = [
  {
    title: "GenAI in Action: Develop, Fine-Tune, and Deploy AI Solutions",
    issuer: "iSkew Learning",
    year: "2026",
  },
  {
    title: "AI: Constraint Satisfaction",
    issuer: "NPTEL",
    year: "2026",
  },
  {
    title: "Python for Data Science",
    issuer: "NPTEL",
    year: "2026",
  },
  {
    title: "Introduction to Machine Learning",
    issuer: "NPTEL",
    year: "2026",
  },
  {
    title: "End-to-End Project Lifecycle Using MERN Stack",
    issuer: "Zero Pixels",
    year: "2025",
  },
  {
    title: "English Proficiency Certification (B2+)",
    issuer: "Cambridge Linguaskill",
    year: "2024",
  }
];

export default function Education() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

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
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="education"
      ref={containerRef}
      className="relative py-24 md:py-32 w-full bg-linen overflow-hidden"
    >
      {/* Decorative vertical lines */}
      <div className="absolute top-0 bottom-0 left-1/10 w-px bg-dolphin/5 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-1/10 w-px bg-dolphin/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Education Column */}
          <div className="lg:col-span-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <span className="text-[10px] uppercase tracking-[0.25em] text-amethyst font-bold">
                05 / EDUCATION
              </span>
              <h2 className="text-4xl font-bold font-syne text-dolphin mt-2 tracking-tight">
                Academic Journey
              </h2>
            </motion.div>

            {/* Education Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-col gap-6"
            >
              {educationData.map((edu, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="p-8 rounded-3xl bg-linen border border-dolphin/10 hover:border-amethyst/30 transition-all duration-500 shadow-[0_4px_30px_rgba(101,90,124,0.02)] hover:shadow-[0_12px_40px_rgba(171,146,191,0.06)] cursor-none relative"
                  data-cursor="DEGREE"
                >
                  <div className="flex gap-4">
                    <div className="p-3 bg-amethyst-light text-amethyst rounded-2xl h-fit">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-xs text-dolphin/50 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{edu.period}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold font-syne text-dolphin leading-snug">
                        {edu.institution}
                      </h3>
                      
                      <p className="text-sm font-semibold text-amethyst leading-relaxed">
                        {edu.degree}
                      </p>

                      {edu.score && (
                        <div className="mt-2 text-xs font-bold text-dolphin tracking-wide bg-dolphin/5 px-2.5 py-1 rounded w-fit">
                          Score: {edu.score}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Club Leadership Sub-Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="mt-6 p-8 rounded-3xl bg-linen border border-dolphin/10 hover:border-amethyst/30 transition-all duration-500 shadow-[0_4px_30px_rgba(101,90,124,0.02)] hover:shadow-[0_12px_40px_rgba(171,146,191,0.06)] cursor-none"
              data-cursor="LEAD"
            >
              <div className="flex gap-4">
                <div className="p-3 bg-dolphin/5 text-dolphin rounded-2xl h-fit">
                  <Star className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-dolphin/50 font-medium">
                    Activities & Interests
                  </span>
                  <h3 className="text-base font-bold font-syne text-dolphin">
                    Polaris Game Club
                  </h3>
                  <p className="text-sm font-semibold text-amethyst">
                    Event Management Lead
                  </p>
                  <p className="text-xs text-dolphin/60 leading-relaxed font-light mt-1">
                    Organized gaming structures and team collaborations. Main interests include Artificial Intelligence, Mobile Architectures, Cybersecurity, and Database Systems.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Certifications Column */}
          <div className="lg:col-span-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-12"
            >
              <span className="text-[10px] uppercase tracking-[0.25em] text-amethyst font-bold">
                06 / CREDENTIALS
              </span>
              <h2 className="text-4xl font-bold font-syne text-dolphin mt-2 tracking-tight">
                Certifications
              </h2>
            </motion.div>

            {/* Certifications Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-col gap-4"
            >
              {certificationsData.map((cert, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="p-5 rounded-2xl bg-linen border border-dolphin/10 hover:border-amethyst/30 transition-all duration-300 shadow-[0_4px_20px_rgba(101,90,124,0.01)] hover:shadow-[0_8px_30px_rgba(171,146,191,0.05)] cursor-none"
                  data-cursor="AWARD"
                >
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-amethyst-light text-amethyst rounded-xl h-fit">
                        <Award className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-sm font-bold font-syne text-dolphin leading-snug">
                          {cert.title}
                        </h4>
                        <span className="text-[10px] text-dolphin/60">
                          {cert.issuer}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-amethyst bg-amethyst-light px-2.5 py-1 rounded-full whitespace-nowrap">
                      {cert.year}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
