"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Increment loading counter
    const duration = 1800; // Total loading time
    const intervalTime = 25;
    const increment = 100 / (duration / intervalTime);
    let currentCount = 0;

    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= 100) {
        setCount(100);
        clearInterval(timer);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 800); // Allow exit animations to complete
        }, 300);
      } else {
        setCount(Math.floor(currentCount));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Letters of the name to split and animate
  const firstName = "GRACIOUS".split("");
  const middleName = "JOSEPH".split("");
  const lastName = "BEN".split("");

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.1 },
    },
  };

  const letterVariants = {
    initial: { y: 60, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-linen p-8 md:p-16 select-none"
        >
          {/* Top layout decoration */}
          <div className="flex justify-between items-center w-full">
            <span className="text-[10px] uppercase tracking-[0.3em] text-dolphin/40 font-semibold">
              Personal Portfolio
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-dolphin/40 font-semibold">
              Kochi, IN
            </span>
          </div>

          {/* Center Name: Letter split animations */}
          <div className="flex flex-col items-start justify-center flex-grow py-20 max-w-5xl mx-auto w-full">
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="flex flex-col gap-2 md:gap-4 w-full"
            >
              {/* First & Middle Names */}
              <div className="flex flex-wrap text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-dolphin font-syne">
                <div className="flex mr-4 md:mr-8">
                  {firstName.map((char, index) => (
                    <motion.span key={index} variants={letterVariants} className="inline-block">
                      {char}
                    </motion.span>
                  ))}
                </div>
                <div className="flex mr-4 md:mr-8">
                  {middleName.map((char, index) => (
                    <motion.span key={index} variants={letterVariants} className="inline-block">
                      {char}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              {/* Last Name */}
              <div className="flex text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-amethyst font-syne">
                {lastName.map((char, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block">
                    {char}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom layout metadata and counter */}
          <div className="flex justify-between items-end w-full border-t border-dolphin/10 pt-8">
            <div className="text-[11px] text-dolphin/60 max-w-[200px] leading-relaxed hidden sm:block">
              AI Undergraduate &<br />
              Software Engineer
            </div>
            
            {/* Counter */}
            <div className="flex items-baseline gap-1 font-syne ml-auto">
              <span className="text-6xl sm:text-8xl md:text-9xl font-bold text-dolphin tracking-tighter">
                {count}
              </span>
              <span className="text-xl sm:text-2xl font-semibold text-amethyst">
                %
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
