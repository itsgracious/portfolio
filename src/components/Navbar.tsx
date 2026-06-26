"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
          className="fixed top-6 left-0 right-0 w-full z-50 px-6 flex justify-center pointer-events-none"
        >
          <nav
            className={`flex items-center gap-1 px-4 py-2 rounded-full glassmorphism pointer-events-auto shadow-lg transition-all duration-300 ${
              scrolled ? "py-1.5 px-3" : "py-2.5 px-5"
            }`}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Magnetic key={item.id} pullFactor={0.2}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="relative px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium transition-colors duration-300 rounded-full cursor-none uppercase tracking-wider text-dolphin/70 hover:text-dolphin"
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
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
