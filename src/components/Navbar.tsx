"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import Magnetic from "./Magnetic";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      } else {
        setTheme("light");
        document.documentElement.classList.remove("dark");
      }
      
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    // Hide on scroll down, show on scroll up
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 50);

      if (currentScroll > lastScrollY.current && currentScroll > 150) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track active section via IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Trigger when section occupies the middle of the viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-6 left-0 right-0 w-full z-50 px-4 sm:px-6 flex justify-center pointer-events-none"
        >
          <nav
            className={`flex items-center gap-0.5 sm:gap-1 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full glassmorphism pointer-events-auto shadow-lg transition-all duration-300 ${
              scrolled 
                ? "py-1 px-2 sm:py-1.5 sm:px-3" 
                : "py-1.5 px-3 sm:py-2.5 sm:px-5"
            }`}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Magnetic key={item.id} pullFactor={0.2}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="relative px-1.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-[9px] sm:text-xs md:text-sm font-medium transition-colors duration-300 rounded-full cursor-none uppercase tracking-wider text-dolphin/70 hover:text-dolphin"
                  >
                    {/* Active pill background */}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-indicator"
                        className="absolute inset-0 bg-amethyst-light rounded-full border border-amethyst/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    
                    {/* Label */}
                    <span className={`relative z-10 ${isActive ? "text-amethyst font-semibold" : ""}`}>
                      {item.label}
                    </span>

                    {/* Hover indicator line */}
                    {!isActive && (
                      <motion.span
                        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-amethyst/30 transition-all duration-300 group-hover:w-1/2"
                      />
                    )}
                  </button>
                </Magnetic>
              );
            })}

            {/* Vertical Divider */}
            <div className="w-px h-3.5 bg-dolphin/10 mx-0.5 sm:mx-1 shrink-0" />

            {/* Theme Toggle Switcher */}
            {mounted && (
              <Magnetic pullFactor={0.15}>
                <button
                  onClick={toggleTheme}
                  className={`relative w-12 h-6 sm:w-16 sm:h-8 rounded-full flex items-center p-0.5 sm:p-1 transition-colors duration-500 cursor-none overflow-hidden select-none shrink-0 ${
                    theme === "light" 
                      ? "bg-sky-300 border border-sky-400/20" 
                      : "bg-[#181622] border border-amethyst/20"
                  }`}
                  data-cursor="TOGGLE"
                  aria-label="Toggle Theme"
                >
                  {/* Background Decorations: Clouds for Light Mode */}
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={theme === "light" ? { opacity: 0.9, x: 0 } : { opacity: 0, x: 8 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-1 top-1 sm:right-1.5 sm:top-1.5 text-white pointer-events-none"
                  >
                    <svg className="w-4 h-3.5 sm:w-6 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                    </svg>
                  </motion.div>

                  {/* Background Decorations: Stars for Dark Mode */}
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={theme === "dark" ? { opacity: 0.8, x: 0 } : { opacity: 0, x: -8 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-1.5 top-1.5 sm:left-2 sm:top-2 flex items-center gap-1 text-white pointer-events-none"
                  >
                    <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full" />
                    <div className="w-px h-px sm:w-0.5 sm:h-0.5 bg-white/70 rounded-full mt-0.5" />
                    <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/90 rounded-full" />
                  </motion.div>

                  {/* Sliding Slider Thumb */}
                  <motion.div
                    animate={{ x: theme === "light" ? 0 : (windowWidth < 640 ? 24 : 32) }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center z-10 shadow-md ${
                      theme === "light" 
                        ? "bg-amber-100 text-amber-500" 
                        : "bg-amethyst text-[#191621]"
                    }`}
                  >
                    {theme === "light" ? (
                      <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5px] fill-amber-100" />
                    ) : (
                      <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5px] fill-amethyst" />
                    )}
                  </motion.div>
                </button>
              </Magnetic>
            )}
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
