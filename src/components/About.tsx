"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function Counter({ value, suffix = "", duration = 1200 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) {
        setCount(end);
        return;
      }

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
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-syne font-bold text-4xl sm:text-5xl text-amethyst">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Mouse tilt effect for profile card
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const centerX = width / 2;
    const centerY = height / 2;
    // Map coordinate deviation to degree rotation
    setTilt({
      x: (centerY - y) / 15,
      y: (x - centerX) / 15,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 md:py-32 w-full bg-linen overflow-hidden"
    >
      {/* Decorative vertical lines */}
      <div className="absolute top-0 bottom-0 left-1/10 w-px bg-dolphin/5 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-1/10 w-px bg-dolphin/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
          className="mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-amethyst font-bold">
            01 / ABOUT ME
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-syne text-dolphin mt-2 tracking-tight">
            At a Glance
          </h2>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Biography Column */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="col-span-1 md:col-span-7 flex flex-col gap-6"
          >
            <motion.p variants={textVariants} className="text-xl sm:text-2xl font-light text-dolphin/90 leading-relaxed">
              I am an **Artificial Intelligence undergraduate** with hands-on experience in building systems that span AI, IoT, and software engineering.
            </motion.p>
            
            <motion.p variants={textVariants} className="text-sm sm:text-base text-dolphin/70 leading-relaxed">
              Currently pursuing my B.Tech in Computer Science and Artificial Intelligence at Muthoot Institute of Technology and Science (MITS), I specialize in transforming conceptual ideas into fully functioning digital products. My technical skill set covers everything from designing acoustic threat-detection CNN pipelines to architecting multi-agent search nodes and local note cleanup algorithms.
            </motion.p>

            <motion.p variants={textVariants} className="text-sm sm:text-base text-dolphin/70 leading-relaxed">
              With a growth-oriented mindset, I am driven by the challenges of edge-computing anomalies, mobile application optimization, and network security modules. I aim to write highly refined, production-ready code that solves tangible, real-world problems.
            </motion.p>


          </motion.div>

          {/* Portrait/Card Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 md:col-span-5 flex justify-center"
          >
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[340px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl transition-all duration-200 cursor-none interactive-card bg-amethyst/5 border border-amethyst/10 flex items-center justify-center p-4"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                boxShadow: "0 20px 40px rgba(101, 90, 124, 0.08)",
              }}
              data-cursor="TILT"
            >
              {/* Nested image card container with parallax depth */}
              <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-linen border border-dolphin/5">
                <Image
                  src="/profile_avatar.png"
                  alt="Gracious Joseph Ben avatar illustration"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 340px"
                />
                
                {/* Visual Glass overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-dolphin/20 via-transparent to-transparent opacity-80 pointer-events-none" />
                
                {/* Floating overlay border info */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl glassmorphism pointer-events-none flex justify-between items-center">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-bold text-dolphin font-syne uppercase">
                      G. J. Ben
                    </span>
                    <span className="text-[9px] text-dolphin/60">
                      Kochi, Kerala
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-amethyst tracking-wider uppercase bg-amethyst-light px-2.5 py-1 rounded-full">
                    AI Student
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
