"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/lib/mockData";

const easeExpo = [0.16, 1, 0.3, 1] as const;

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const answerId = `faq-answer-${index}`;

  return (
    <motion.div
      className="border-b border-white/8"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: easeExpo, delay: index * 0.06 }}
    >
      <button
        className="w-full flex items-center justify-between py-5 gap-4 text-left cursor-pointer group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={answerId}
      >
        <span className="text-sm md:text-base font-semibold text-[#f0f0f0] group-hover:text-white transition-colors duration-200 pr-4">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22, ease: easeExpo }}
          className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors duration-200 ${
            open
              ? "bg-[#f5ff00] border-[#f5ff00]"
              : "border-white/20 group-hover:border-[#f5ff00]"
          }`}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke={open ? "#000" : "currentColor"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={answerId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeExpo }}
            style={{ overflow: "hidden" }}
          >
            <p className="text-sm text-[#999] leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-[#0d0d0d] px-5 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeExpo }}
        >
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-white uppercase">
            FAQ
          </h2>
        </motion.div>

        {/* Questions */}
        <div className="border-t border-white/8">
          {faqs.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>

        {/* Contact */}
        <motion.div
          className="mt-10 p-5 bg-[rgba(255,255,255,0.03)] border border-white/8 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeExpo, delay: 0.3 }}
        >
          <div>
            <p className="text-sm font-semibold text-white">Still got questions?</p>
            <p className="text-xs text-[#777] mt-0.5">We usually reply within 24 hours.</p>
          </div>
          <a
            href="mailto:crew@rydrjbdb.com"
            className="text-xs font-bold text-[#f5ff00] tracking-widest uppercase hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Email the Crew →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
