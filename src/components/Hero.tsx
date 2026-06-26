"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Download, FileText, Mail } from "lucide-react";
import Magnetic from "./Magnetic";

export default function Hero() {
  // Parallax physics setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Map mouse positions to parallax offset values
  const bgX = useTransform(springX, (val) => val * 0.015);
  const bgY = useTransform(springY, (val) => val * 0.015);
  const blob1X = useTransform(springX, (val) => val * -0.04);
  const blob1Y = useTransform(springY, (val) => val * -0.04);
  const blob2X = useTransform(springX, (val) => val * 0.06);
  const blob2Y = useTransform(springY, (val) => val * -0.06);
  const floatX = useTransform(springX, (val) => val * 0.03);
  const floatY = useTransform(springY, (val) => val * 0.03);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Normalize coordinates around center (0,0)
    mouseX.set(clientX - width / 2);
    mouseY.set(clientY - height / 2);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Split headers for staggered reveal
  const title1 = "GRACIOUS";
  const title2 = "JOSEPH BEN";

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col justify-between p-6 md:p-12 overflow-hidden bg-linen select-none"
    >
      {/* Parallax Floating Ambient Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Dot pattern background */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute inset-0 dot-matrix"
        />

        {/* Soft luxury blurred shapes */}
        <motion.div
          style={{ x: blob1X, y: blob1Y }}
          className="absolute top-1/4 left-1/3 w-[35vw] h-[35vw] rounded-full bg-amethyst-light blur-[100px] opacity-70"
        />
        <motion.div
          style={{ x: blob2X, y: blob2Y }}
          className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-amethyst/10 blur-[120px] opacity-60"
        />

        {/* Floating circles/crosses for editorial style */}
        <motion.div
          style={{ x: floatX, y: floatY }}
          className="absolute top-1/3 right-1/5 w-16 h-16 border border-amethyst/20 rounded-full flex items-center justify-center"
        >
          <div className="w-2 h-2 bg-amethyst/30 rounded-full" />
        </motion.div>
        <motion.div
          style={{ x: blob1X, y: floatY }}
          className="absolute bottom-1/3 left-1/10 w-24 h-24 border border-dolphin/5 rounded-lg rotate-12"
        />
      </div>

      {/* Empty top spacing matching preloader layout */}
      <div className="w-full flex justify-between items-center z-10 pt-16">
        <span className="text-[10px] uppercase tracking-[0.25em] text-dolphin/40 font-semibold">
          AI Undergrad & Developer
        </span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-dolphin/40 font-semibold">
          Available for Roles
        </span>
      </div>

      {/* Main Hero Titles */}
      <div className="relative z-10 flex flex-col justify-center flex-grow max-w-5xl mx-auto w-full py-16">
        <div className="flex flex-col gap-2 md:gap-4">
          {/* Header 1 */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-dolphin font-syne leading-none"
            >
              {title1}
            </motion.h1>
          </div>

          {/* Header 2 */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
              className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-amethyst font-syne leading-none"
            >
              {title2}
            </motion.h1>
          </div>

          {/* Subheading intro and description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
            className="mt-6 md:mt-8 max-w-xl"
          >
            <p className="text-base sm:text-lg text-dolphin/80 leading-relaxed font-light">
              Crafting intelligent systems, edge-AI threat detection, and mobile applications. Currently engineering project recommendation blueprints and note-cleaning pipelines.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1 }}
            className="flex flex-wrap gap-4 mt-8 md:mt-10 items-center"
          >
            <Magnetic>
              <button
                onClick={() => handleScrollTo("projects")}
                data-cursor="GO"
                className="px-6 py-3.5 bg-dolphin text-linen rounded-full font-medium text-xs uppercase tracking-wider shadow-lg hover:shadow-dolphin/20 transition-shadow duration-300 cursor-none"
              >
                View Projects
              </button>
            </Magnetic>

            <Magnetic>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo("contact");
                }}
                className="px-6 py-3.5 border border-dolphin/20 text-dolphin hover:bg-dolphin hover:text-linen rounded-full font-medium text-xs uppercase tracking-wider transition-colors duration-300 cursor-none flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                Contact Me
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href="/resume.pdf"
                download
                className="px-6 py-3.5 text-dolphin/70 hover:text-dolphin rounded-full font-medium text-xs uppercase tracking-wider transition-colors duration-300 cursor-none flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                Get Resume
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section: Scroll helper */}
      <div className="w-full flex justify-between items-end z-10 border-t border-dolphin/10 pt-6">
        <span className="text-[10px] tracking-[0.2em] uppercase text-dolphin/50 font-medium">
          MITS B.Tech CS & AI
        </span>
        
        {/* Magnetic Scroll Down Indicator */}
        <Magnetic>
          <button
            onClick={() => handleScrollTo("about")}
            data-cursor="ABOUT"
            className="p-3 border border-dolphin/10 hover:border-dolphin/30 rounded-full text-dolphin transition-colors duration-300 cursor-none"
          >
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </Magnetic>
      </div>
    </section>
  );
}
