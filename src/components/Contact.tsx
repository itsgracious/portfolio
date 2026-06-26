"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Github, Linkedin, ArrowRight, Send, Check } from "lucide-react";
import Magnetic from "./Magnetic";

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  const socialLinks = [
    {
      label: "Email",
      value: "graciousben.dev@gmail.com",
      href: "mailto:graciousben.dev@gmail.com",
      icon: <Mail className="w-5 h-5" />,
    },
    {
      label: "GitHub",
      value: "github.com/itsgracious",
      href: "https://github.com/itsgracious",
      icon: <Github className="w-5 h-5" />,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/gracious-ben",
      href: "https://linkedin.com/in/gracious-ben",
      icon: <Linkedin className="w-5 h-5" />,
    },
  ];

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-24 md:py-32 w-full bg-linen overflow-hidden"
    >
      {/* Decorative vertical lines */}
      <div className="absolute top-0 bottom-0 left-1/10 w-px bg-dolphin/5 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-1/10 w-px bg-dolphin/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <span className="text-[10px] uppercase tracking-[0.25em] text-amethyst font-bold">
                  07 / COLLABORATION
                </span>
                <h2 className="text-4xl md:text-5xl font-bold font-syne text-dolphin mt-2 tracking-tight">
                  Let's Connect
                </h2>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-sm sm:text-base text-dolphin/70 leading-relaxed font-light mb-8 max-w-sm"
              >
                I am actively seeking roles in AI, Machine Learning, Computer Vision, and Software Engineering. Have a question or want to build something together?
              </motion.p>
            </div>

            {/* Social Links List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-6"
            >
              {socialLinks.map((link, idx) => (
                <Magnetic key={idx} pullFactor={0.15}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group w-fit cursor-none"
                    data-cursor="LINK"
                  >
                    <div className="p-3 bg-dolphin/5 text-dolphin rounded-2xl group-hover:bg-amethyst group-hover:text-linen transition-colors duration-500">
                      {link.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-dolphin/40 font-bold">
                        {link.label}
                      </span>
                      <span className="text-sm font-semibold text-dolphin group-hover:text-amethyst transition-colors duration-300">
                        {link.value}
                      </span>
                    </div>
                  </a>
                </Magnetic>
              ))}
            </motion.div>
          </div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 md:p-12 rounded-[32px] bg-linen border border-dolphin/10 shadow-[0_8px_30px_rgba(101,90,124,0.02)] flex flex-col gap-8 relative overflow-hidden"
            >
              {/* Floating Input 1: Name */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent border-b border-dolphin/20 focus:border-amethyst outline-none py-3 text-sm text-dolphin transition-colors duration-300 font-light cursor-none"
                />
                <motion.label
                  htmlFor="name"
                  animate={{
                    y: focusedField === "name" || formState.name ? -20 : 8,
                    scale: focusedField === "name" || formState.name ? 0.85 : 1,
                    color: focusedField === "name" ? "#AB92BF" : "#655A7C",
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute left-0 text-sm font-light pointer-events-none origin-top-left"
                >
                  Your Name
                </motion.label>
              </div>

              {/* Floating Input 2: Email */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent border-b border-dolphin/20 focus:border-amethyst outline-none py-3 text-sm text-dolphin transition-colors duration-300 font-light cursor-none"
                />
                <motion.label
                  htmlFor="email"
                  animate={{
                    y: focusedField === "email" || formState.email ? -20 : 8,
                    scale: focusedField === "email" || formState.email ? 0.85 : 1,
                    color: focusedField === "email" ? "#AB92BF" : "#655A7C",
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute left-0 text-sm font-light pointer-events-none origin-top-left"
                >
                  Your Email
                </motion.label>
              </div>

              {/* Floating Input 3: Message */}
              <div className="relative">
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent border-b border-dolphin/20 focus:border-amethyst outline-none py-3 text-sm text-dolphin transition-colors duration-300 resize-none font-light cursor-none"
                />
                <motion.label
                  htmlFor="message"
                  animate={{
                    y: focusedField === "message" || formState.message ? -20 : 8,
                    scale: focusedField === "message" || formState.message ? 0.85 : 1,
                    color: focusedField === "message" ? "#AB92BF" : "#655A7C",
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute left-0 text-sm font-light pointer-events-none origin-top-left"
                >
                  Message details...
                </motion.label>
              </div>

              {/* Submit Button */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] text-dolphin/40 font-semibold uppercase tracking-wider hidden sm:block">
                  Secure on-device delivery
                </span>

                <Magnetic>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3.5 bg-dolphin text-linen rounded-full font-medium text-xs uppercase tracking-wider shadow-lg transition-all duration-300 cursor-none flex items-center gap-2 ${
                      isSent ? "bg-emerald-500 hover:bg-emerald-500 shadow-emerald-500/20" : "hover:shadow-dolphin/20"
                    }`}
                    data-cursor={isSent ? "SENT" : "SEND"}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-linen/30 border-t-linen rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : isSent ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Message Sent</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Transmit Message</span>
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
