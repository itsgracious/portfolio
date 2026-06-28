"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { ExternalLink, Shield, Car, Eye, Cpu, Radio, Network, FileText, X } from "lucide-react";
import Image from "next/image";
import Magnetic from "./Magnetic";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string[];
  tech: string[];
  year: string;
  github: string;
  live?: string;
  visualType: "camera" | "cleaner" | "agents" | "sonar" | "network";
  blueprintDetail: string;
  images?: string[];
}

const projectsList: Project[] = [
  {
    id: "cypher",
    title: "Project Cypher",
    subtitle: "Vehicle Detection & Search System",
    year: "2025",
    tech: ["Python", "YOLOv8", "OpenCV", "Tkinter", "OCR"],
    description: [
      "Computer vision system to detect, track, and catalog vehicles from CCTV footage using YOLOv8.",
      "Extracts attributes including color, size, and license plate text via OCR, storing metadata in JSON.",
      "Built a Tkinter-based search UI with filters for vehicle type, plate, color, featuring clip playback and route-map."
    ],
    github: "https://github.com/itsgracious/project-cypher",
    visualType: "camera",
    blueprintDetail: "System Architecture: CCTV Input -> YOLOv8 Detection -> Tracker Module -> Tesseract OCR (Licence Plate) -> JSON Cataloguer -> Tkinter Search UI. Supports real-time filter playback and multi-camera routing overlay.",
    images: [
      "/portfolio/cypher_1.png",
      "/portfolio/cypher_2.png",
      "/portfolio/cypher_3.png",
      "/portfolio/cypher_4.jpg"
    ]
  },
  {
    id: "notescleanser",
    title: "NotesCleanser",
    subtitle: "AI-Powered Note Cleanup App",
    year: "2026",
    tech: ["Flutter", "Dart", "TensorFlow Lite", "Teachable Machine", "Android Service"],
    description: [
      "Developed a privacy-first mobile application that identifies handwritten notes, document screenshots, and PDFs.",
      "Runs an on-device TensorFlow Lite image classification model for zero cloud data processing.",
      "Features local scanning with confidence-based filtering, storage reclamation analytics, and background notifications."
    ],
    github: "https://github.com/itsgracious",
    visualType: "cleaner",
    blueprintDetail: "Local Android Filesystem → Media Collection (photo_manager) → Image/PDF Preprocessing (pdfx) → TensorFlow Lite Inference Engine → Confidence-Based Note Classification → Review Interface → Storage Reclamation Analytics → Secure User-Confirmed Deletion.",
    images: [
      "/portfolio/cleanser_cover.png",
      "/portfolio/cleanser_4.jpg",
      "/portfolio/cleanser_1.jpg",
      "/portfolio/cleanser_3.jpg"
    ]
  },
  {
    id: "launchpad",
    title: "LaunchPad AI",
    subtitle: "AI-Powered Project Recommendation & Blueprint Generator",
    year: "2026",
    tech: ["Python", "Gemini API", "Pydantic", "RAG Architecture", "Multi-Agent System"],
    description: [
      "Built an intelligent project discovery platform using a lightweight Retrieval-Augmented Generation (RAG) architecture.",
      "Designed a modular multi-agent system for profile analysis, research retrieval, and academic report creation.",
      "Generates structured outputs including problem statements, architecture diagrams, and technology stacks."
    ],
    github: "https://github.com/Neha7010/LaunchPadAI",
    live: "https://huggingface.co/spaces/Gracykutty/launchpad-ai",
    visualType: "agents",
    blueprintDetail: "Flowchart: User Resume/Preferences -> Profile Agent -> Vector DB retrieval -> Blueprint Generator Agent -> Pydantic Schema Validator -> Output: structured system documentation, architecture SVGs, and roadmaps.",
    images: [
      "/portfolio/launchpad_1.png",
      "/portfolio/launchpad_2.png",
      "/portfolio/launchpad_3.png",
      "/portfolio/launchpad_4.png"
    ]
  },

  {
    id: "sentinel",
    title: "Sentinel NIDS",
    subtitle: "Network Intrusion Detection System",
    year: "2024 - 2025",
    tech: ["Python", "Scikit-learn", "Flask", "Raspberry Pi", "Random Forest", "Isolation Forest"],
    description: [
      "Built an edge-deployed network intrusion detection system (NIDS) on Raspberry Pi 3B.",
      "Utilizes a two-stage ML pipeline: Isolation Forest for anomaly detection and Random Forest for attack classification.",
      "Developed a Flask dashboard for real-time traffic monitoring over SSH."
    ],
    github: "https://github.com/itsgracious",
    visualType: "network",
    blueprintDetail: "Network Flow: Raw Packets -> Pi 3B Socket -> Feature Extractor -> Isolation Forest Anomaly Filter -> Random Forest Classifier (CICIDS2017 training) -> Flask Dashboard (WebSocket stats) -> SMS alerts."
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 md:py-32 w-full bg-linen overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute top-0 bottom-0 left-1/10 w-px bg-dolphin/5 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-1/10 w-px bg-dolphin/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-[10px] uppercase tracking-[0.25em] text-amethyst font-bold">
            03 / SELECTED WORKS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-syne text-dolphin mt-2 tracking-tight">
            Projects
          </h2>
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-28 md:gap-36">
          {projectsList.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <ProjectCard
                key={project.id}
                project={project}
                isEven={isEven}
                onOpenDetails={() => setSelectedProject(project)}
              />
            );
          })}
        </div>
      </div>

      {/* Blueprint Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <DetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// Project Card Component
interface CardProps {
  project: Project;
  isEven: boolean;
  onOpenDetails: () => void;
}

function ProjectCard({ project, isEven, onOpenDetails }: CardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [swipingIdx, setSwipingIdx] = useState<number | null>(null);
  const [deckOrder, setDeckOrder] = useState<number[]>([3, 2, 1, 0]);
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const images = project.images;
  const coverImage = project.id === "cypher" 
    ? "/portfolio/cypher_1.png" 
    : project.id === "notescleanser" 
      ? "/portfolio/cleanser_2.png" 
      : "/portfolio/launchpad_cover.jpg";
  
  const isMobile = windowSize.width < 640;
  const isWidescreen = project.id === "cypher" || project.id === "launchpad";
  
  const activeHeight = isWidescreen 
    ? (isMobile ? Math.min(windowSize.width * 0.9, 340) * 0.5625 : 450)
    : (isMobile ? Math.min(windowSize.height * 0.75, 480) : 580);
      
  const activeWidth = isWidescreen
    ? (isMobile ? Math.min(windowSize.width * 0.9, 340) : 800)
    : activeHeight * 0.5625; // 9:16 portrait ratio

  const handleCardClick = () => {
    if (images && images.length > 0) {
      setActiveIdx(0);
    } else {
      onOpenDetails();
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null || !images) return;
    
    const current = activeIdx;
    setSwipingIdx(current);
    
    // Cycle the deck order: put swiped card at the bottom of the deck stack
    setDeckOrder((prev) => {
      const filtered = prev.filter((i) => i !== current);
      return [current, ...filtered];
    });

    if (current < images.length - 1) {
      setActiveIdx(current + 1);
    } else {
      setActiveIdx(null);
    }

    setTimeout(() => {
      setSwipingIdx(null);
    }, 800);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx(null);
  };

  // Rest of deck style positions (top to bottom card layout)
  const deckVariants: Variants = {
    deck: (pos: number) => ({
      x: 0,
      y: pos === 3 ? 0 : pos === 2 ? 12 : pos === 1 ? 24 : 36,
      scale: pos === 3 ? 1 : pos === 2 ? 0.95 : pos === 1 ? 0.90 : 0.85,
      rotate: pos === 3 ? 0 : pos === 2 ? -2 : pos === 1 ? 2 : 0,
      width: 200,
      height: 275,
      rotateY: 0,
      opacity: 1,
      zIndex: pos * 10,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    })
  };

  // Fullscreen popping modal and swipe variants
  const modalVariants: Variants = {
    initial: {
      x: 0,
      y: 80,
      width: 200,
      height: 275,
      scale: 0.8,
      rotateY: 0,
      rotateZ: 0,
      opacity: 0,
      zIndex: 100,
    },
    active: {
      x: 0,
      y: -30,
      width: activeWidth,
      height: activeHeight,
      scale: 1.15,
      rotateY: 180,
      rotateZ: 0,
      opacity: 1,
      zIndex: 100,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
    },
    exit: {
      x: [0, -360, 0],
      width: [activeWidth, 200, 200],
      height: [activeHeight, 275, 275],
      rotateY: [180, 0, 0],
      rotateZ: [0, 12, 0],
      scale: [1.15, 0.7, 0.9],
      opacity: [1, 0.8, 0],
      zIndex: [100, -10, -10],
      transition: {
        times: [0, 0.55, 1],
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center`}
    >
      {/* Visual Mockup Column */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -40 : 40 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`col-span-1 lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}
      >
        <div
          onClick={handleCardClick}
          className="relative w-full h-[320px] sm:h-auto sm:aspect-[4/3] rounded-3xl overflow-hidden glassmorphism border border-dolphin/10 hover:border-amethyst/30 shadow-[0_8px_30px_rgba(101,90,124,0.02)] hover:shadow-[0_20px_50px_rgba(171,146,191,0.1)] transition-all duration-500 cursor-none group flex items-center justify-center"
          data-cursor={images ? "EXPAND" : "BLUEPRINT"}
        >
          {images && images.length > 0 ? (
            <div className="relative w-[200px] h-[275px] mt-[-18px]" style={{ perspective: 1000 }}>
              {deckOrder.map((i) => {
                // If card is currently active or swiping in modal backdrop, do not render inline
                if (i === activeIdx || i === swipingIdx) return null;
                return (
                  <motion.div
                    key={i}
                    layoutId={`${project.id}-card-${i}`}
                    custom={deckOrder.indexOf(i)}
                    variants={deckVariants}
                    animate="deck"
                    className="absolute inset-0 w-full h-full rounded-2xl cursor-none"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute inset-0 w-full h-full border border-dolphin/20 rounded-2xl overflow-hidden bg-linen shadow-md">
                      <Image
                        src={coverImage}
                        alt={`${project.title} cover`}
                        fill
                        unoptimized
                        className="object-cover select-none"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Inner Parallax Mockup Frame for SVGs */
            <div className="absolute inset-4 rounded-[20px] overflow-hidden bg-linen/50 flex items-center justify-center p-4 border border-dolphin/5">
              <ProjectVisual type={project.visualType} />
            </div>
          )}
        </div>

        {/* Full-screen Lightbox Popup Overlay */}
        <AnimatePresence>
          {(activeIdx !== null || swipingIdx !== null) && images && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ perspective: 1200 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-dolphin/95 backdrop-blur-xl"
              onClick={handleClose}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 p-3 rounded-full border border-white/10 hover:border-white/30 text-white bg-white/5 hover:bg-white/10 transition-all cursor-none z-[110]"
                data-cursor="CLOSE"
                aria-label="Close Gallery"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Popping / Swiping Deck Area */}
              <div 
                className="relative flex items-center justify-center" 
                style={{ width: activeWidth, height: activeHeight, transformStyle: "preserve-3d" }}
              >
                {images.map((img, i) => {
                  const isActive = i === activeIdx;
                  const isSwiping = i === swipingIdx;
                  if (!isActive && !isSwiping) return null;

                  return (
                    <motion.div
                      key={i}
                      layoutId={`${project.id}-card-${i}`}
                      initial={isActive ? "initial" : "exit"}
                      animate={isActive ? "active" : "exit"}
                      variants={modalVariants}
                      onClick={handleNextImage}
                      style={{ transformStyle: "preserve-3d" }}
                      className="absolute rounded-2xl cursor-none"
                    >
                      <div className="absolute inset-0 w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                        {/* Front Face: Cover Image (Visible when rotateY is 0) */}
                        <div 
                          className="absolute inset-0 w-full h-full border border-white/10 rounded-2xl overflow-hidden bg-[#13111C]" 
                          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(0deg)" }}
                        >
                          <Image
                            src={coverImage}
                            alt={`${project.title} cover`}
                            fill
                            unoptimized
                            className="object-cover select-none"
                          />
                        </div>
                        
                        {/* Back Face: Screenshot (Visible when rotateY is 180) */}
                        <div 
                          className="absolute inset-0 w-full h-full border border-white/15 rounded-2xl overflow-hidden shadow-2xl bg-black" 
                          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                        >
                          <Image
                            src={img}
                            alt={`${project.title} fullscreen screenshot`}
                            fill
                            unoptimized
                            className="object-contain select-none bg-black"
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Info and Progress Overlays */}
              {activeIdx !== null && (
                <>
                  <div className="absolute top-4 left-4 z-30 bg-dolphin/90 text-linen text-[9px] font-mono font-bold px-3 py-1.5 rounded-lg border border-white/15 uppercase tracking-wider select-none">
                    Screen {activeIdx + 1} / {images.length}
                  </div>

                  <div className="absolute top-4 right-4 z-30 bg-amethyst text-linen text-[9px] font-mono font-bold px-3 py-1.5 rounded-lg border border-amethyst/30 uppercase tracking-wider select-none animate-pulse">
                    Click card to flip & cycle
                  </div>

                  {/* Bottom Navigation Dots */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30 bg-dolphin/85 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15 select-none">
                    {images.map((_, dotIdx) => (
                      <div
                        key={dotIdx}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          dotIdx === activeIdx ? "bg-amethyst scale-125" : "bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Content Column */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 40 : -40 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={`col-span-1 lg:col-span-6 flex flex-col gap-4 ${isEven ? "lg:order-2" : "lg:order-1"}`}
      >
        <div className="flex justify-between items-baseline">
          <span className="text-[10px] uppercase font-bold tracking-wider text-amethyst">
            {project.year}
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-dolphin/40 font-semibold font-syne">
            0{project.id}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold font-syne text-dolphin tracking-tight">
          {project.title}
        </h3>
        
        <h4 className="text-xs uppercase tracking-wider text-dolphin/60 font-semibold">
          {project.subtitle}
        </h4>

        <div className="flex flex-col gap-2 mt-2">
          {project.description.map((bullet, idx) => (
            <p key={idx} className="text-sm text-dolphin/70 leading-relaxed pl-3 border-l border-amethyst/30">
              {bullet}
            </p>
          ))}
        </div>

        {/* Tech Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((t, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-amethyst-light text-amethyst border border-amethyst/5 rounded-full text-[10px] font-medium"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <Magnetic>
            <button
              onClick={onOpenDetails}
              className="px-5 py-2.5 bg-dolphin text-linen rounded-full font-medium text-[10px] uppercase tracking-wider cursor-none transition-shadow duration-300"
              data-cursor="BLUEPRINT"
            >
              View Blueprint
            </button>
          </Magnetic>

          <Magnetic>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border border-dolphin/10 hover:border-dolphin/30 text-dolphin rounded-full cursor-none transition-colors duration-300 flex items-center justify-center"
              data-cursor="CODE"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </Magnetic>

          {project.live && (
            <Magnetic>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-dolphin/10 hover:border-dolphin/30 hover:bg-dolphin/5 text-dolphin rounded-full font-medium text-[10px] uppercase tracking-wider cursor-none transition-all duration-300 flex items-center justify-center gap-1.5"
                data-cursor="LIVE"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Live Demo</span>
              </a>
            </Magnetic>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Custom Vector Renderings based on Project Category
function ProjectVisual({ type }: { type: Project["visualType"] }) {
  if (type === "camera") {
    return (
      <div className="relative w-full h-full border border-dolphin/10 rounded-xl overflow-hidden flex flex-col justify-between p-4 bg-linen/25 font-mono text-[9px] text-dolphin/40 select-none">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
            <span>CAM_01_FEED</span>
          </div>
          <span>YOLOv8 DETECT</span>
        </div>
        
        {/* Schematic targeting squares */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[120px] h-[80px] border border-dashed border-amethyst flex flex-col justify-between p-1">
            <span className="text-[8px] text-amethyst font-semibold bg-amethyst-light px-1 self-start rounded">
              VEHICLE_SEDAN: 98%
            </span>
            <span className="text-[8px] text-amethyst self-end font-semibold">
              PLATE: KL-07-CS
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center w-full border-t border-dolphin/10 pt-2">
          <span>FPS: 30.0</span>
          <span>Attributes: Blue, Large</span>
        </div>
      </div>
    );
  }

  if (type === "cleaner") {
    return (
      <div className="relative w-full h-full border border-dolphin/10 rounded-xl overflow-hidden flex flex-col justify-between p-4 bg-linen/25 font-mono text-[9px] text-dolphin/40 select-none">
        <div className="flex justify-between items-center w-full">
          <span>TFLITE_MODEL_CLEANER</span>
          <span>ACCURACY: 94.2%</span>
        </div>
        
        {/* Floating notes schematic circles */}
        <div className="absolute inset-0 flex items-center justify-center gap-6">
          <div className="w-16 h-16 rounded-full border border-dashed border-amethyst flex flex-col items-center justify-center p-1 bg-amethyst-light/10">
            <span className="text-[8px] text-amethyst font-bold">NOTES</span>
            <span className="text-[7px]">87.2%</span>
          </div>
          <div className="w-20 h-20 rounded-full border border-dashed border-dolphin/40 flex flex-col items-center justify-center p-1 bg-dolphin/5">
            <span className="text-[8px] text-dolphin font-bold">BOARD</span>
            <span className="text-[7px]">96.5%</span>
          </div>
        </div>

        <div className="flex justify-between items-center w-full border-t border-dolphin/10 pt-2">
          <span>STORAGE RECLAIMED: 4.8 GB</span>
          <span>MODE: OFFLINE</span>
        </div>
      </div>
    );
  }

  if (type === "agents") {
    return (
      <div className="relative w-full h-full border border-dolphin/10 rounded-xl overflow-hidden flex flex-col justify-between p-4 bg-linen/25 font-mono text-[9px] text-dolphin/40 select-none">
        <div className="flex justify-between items-center w-full">
          <span>MULTI_AGENT_RAG</span>
          <span>STATUS: GENERATING</span>
        </div>
        
        {/* Vector Agent Nodes */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="w-4/5 h-1/2 overflow-visible" viewBox="0 0 200 80">
            <line x1="20" y1="40" x2="100" y2="20" stroke="#AB92BF" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="20" y1="40" x2="100" y2="60" stroke="#AB92BF" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="100" y1="20" x2="180" y2="40" stroke="#AB92BF" strokeWidth="1" />
            <line x1="100" y1="60" x2="180" y2="40" stroke="#AB92BF" strokeWidth="1" />
            
            <circle cx="20" cy="40" r="8" fill="#655A7C" />
            <circle cx="100" cy="20" r="8" fill="#AB92BF" />
            <circle cx="100" cy="60" r="8" fill="#AB92BF" />
            <circle cx="180" cy="40" r="8" fill="#655A7C" />
            
            <text x="20" y="32" textAnchor="middle" fill="#655A7C" fontSize="6">Input</text>
            <text x="100" y="10" textAnchor="middle" fill="#655A7C" fontSize="6">Research</text>
            <text x="100" y="74" textAnchor="middle" fill="#655A7C" fontSize="6">Planner</text>
            <text x="180" y="32" textAnchor="middle" fill="#655A7C" fontSize="6">Blueprint</text>
          </svg>
        </div>

        <div className="flex justify-between items-center w-full border-t border-dolphin/10 pt-2">
          <span>TOKENS: 2.4k</span>
          <span>OUTPUT: SYSTEM_DOCS</span>
        </div>
      </div>
    );
  }



  if (type === "network") {
    return (
      <div className="relative w-full h-full border border-dolphin/10 rounded-xl overflow-hidden flex flex-col justify-between p-4 bg-linen/25 font-mono text-[9px] text-dolphin/40 select-none">
        <div className="flex justify-between items-center w-full">
          <span>RASPBERRY_PI_NIDS</span>
          <span>SSH DASHBOARD</span>
        </div>
        
        {/* Anomalies graph */}
        <div className="absolute inset-0 flex flex-col justify-center px-4 pointer-events-none gap-2">
          <div className="w-full flex items-center justify-between border-b border-dashed border-dolphin/10 pb-1">
            <span>PACKET SCAN RATE:</span>
            <span className="text-amethyst font-semibold">142/s</span>
          </div>
          <div className="w-full flex items-center justify-between border-b border-dashed border-dolphin/10 pb-1">
            <span>ISOLATION FOREST:</span>
            <span className="text-emerald-500 font-semibold">CLEAR</span>
          </div>
          <div className="w-full flex items-center justify-between border-b border-dashed border-dolphin/10 pb-1">
            <span>RANDOM FOREST:</span>
            <span className="text-dolphin font-semibold">0% CLASSIF</span>
          </div>
        </div>

        <div className="flex justify-between items-center w-full border-t border-dolphin/10 pt-2">
          <span>ALERTS: ACTIVE</span>
          <span>IP: 192.168.1.15</span>
        </div>
      </div>
    );
  }

  return null;
}

// Blueprint Detail Modal Component
interface ModalProps {
  project: Project;
  onClose: () => void;
}

function DetailModal({ project, onClose }: ModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-dolphin/40 backdrop-blur-md"
    >
      <motion.div
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-linen border border-dolphin/20 p-6 md:p-12 rounded-[32px] shadow-2xl flex flex-col gap-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-dolphin/10 hover:border-dolphin/30 hover:bg-dolphin/5 transition-all text-dolphin cursor-none"
          data-cursor="CLOSE"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Year & Index */}
        <div className="flex justify-between items-center">
          <span className="text-[10px] uppercase font-bold tracking-wider text-amethyst">
            {project.year} Architectural blueprint
          </span>
          <span className="text-[10px] uppercase font-mono text-dolphin/40">
            [SYS_DOC_{project.id.toUpperCase()}]
          </span>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1 border-b border-dolphin/10 pb-4">
          <h3 className="text-3xl font-bold font-syne text-dolphin tracking-tight">
            {project.title}
          </h3>
          <p className="text-xs uppercase font-medium text-dolphin/60 tracking-wider">
            {project.subtitle}
          </p>
        </div>

        {/* Specifications */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h4 className="text-[10px] uppercase tracking-wider text-dolphin/50 font-bold">
              Technical Overview
            </h4>
            <p className="text-sm text-dolphin/80 leading-relaxed font-light">
              {project.blueprintDetail}
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <h4 className="text-[10px] uppercase tracking-wider text-dolphin/50 font-bold">
              Tech Stack Composition
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-dolphin/5 text-dolphin border border-dolphin/10 rounded-lg text-xs font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Close CTA */}
        <div className="mt-6 border-t border-dolphin/10 pt-6 flex justify-end">
          <Magnetic>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-dolphin text-linen rounded-full font-medium text-xs uppercase tracking-wider cursor-none"
              data-cursor="DONE"
            >
              Close Specifications
            </button>
          </Magnetic>
        </div>
      </motion.div>
    </motion.div>
  );
}
