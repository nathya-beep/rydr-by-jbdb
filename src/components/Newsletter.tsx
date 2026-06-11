"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const easeExpo = [0.16, 1, 0.3, 1] as const;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section id="newsletter" className="py-24 bg-[#f5ff00] px-5 md:px-8">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: easeExpo }}
      >
        {/* Eyebrow */}
        <p className="text-xs font-bold text-black/70 tracking-[0.5em] uppercase mb-4">
          Stay Locked In
        </p>

        {/* Headline */}
        <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] text-black uppercase leading-[0.9] mb-6">
          Join The Crew
        </h2>

        <p className="text-black/70 text-base mb-10 max-w-sm mx-auto">
          New drops, exclusive collabs, and rider culture — straight to your
          inbox. No noise. Just signal.
        </p>

        {/* Form / Success */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: easeExpo }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.45, delay: 0.1, ease: easeExpo }}
                className="w-12 h-12 rounded-full bg-black flex items-center justify-center mb-2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f5ff00"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </motion.div>
              <p className="font-display text-2xl text-black uppercase">
                You&apos;re In.
              </p>
              <p className="text-black/60 text-sm">Welcome to the crew, rider.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 bg-black/10 border border-black/20 rounded text-black placeholder-black/70 text-sm font-medium focus:outline-none focus:border-black transition-colors duration-200"
              />
              <button
                type="submit"
                className="px-8 py-3.5 bg-black text-[#f5ff00] font-bold text-sm tracking-widest uppercase rounded hover:bg-[#111] transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                Join Now
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="text-black/60 text-xs mt-5 tracking-wide">
          No spam. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
}
