"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const headlineLines: Array<{
  text: string;
  style?: React.CSSProperties;
}> = [
  { text: "BUILT FOR THE" },
  { text: "STREETS.", style: { color: "#f5ff00" } },
  { text: "POWERED BY" },
  { text: "VOLTS.", style: { WebkitTextStroke: "2px #f5ff00", color: "transparent" } },
];

const stats = [
  { value: "1.2K+", label: "Riders worldwide" },
  { value: "12", label: "Active drops" },
  { value: "100%", label: "Electric culture" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0d0d] grid-texture">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-riders.png"
          alt="Surron rider in the city"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0d0d0d]/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/70 via-[#0d0d0d]/20 to-[#0d0d0d]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/80 via-transparent to-transparent" />
      </div>

      {/* Neon glow accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2.5, ease }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-[100px] pointer-events-none z-0"
        style={{ background: "#f5ff00" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-24 pb-16 w-full">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-[#f5ff00]" aria-hidden="true" />
            <span className="text-xs font-semibold text-[#f5ff00] tracking-[0.4em] uppercase">
              E-Bike Streetwear
            </span>
          </motion.div>

          {/* Main headline — each line staggered */}
          <h1
            className="font-display text-[clamp(3.5rem,10vw,6rem)] text-white uppercase mb-6"
            style={{ lineHeight: 0.92 }}
          >
            {headlineLines.map((line, i) => (
              <motion.span
                key={i}
                className="block"
                initial={{ opacity: 0, y: "0.4em" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.11 }}
                style={line.style}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.62 }}
            className="text-base md:text-lg text-[#888] max-w-md leading-relaxed mb-10"
          >
            Where e-bike culture meets raw streetwear energy. Gear for riders who
            don&apos;t commute — they ride.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.76 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#featured"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#f5ff00] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-white transition-all duration-200 cursor-pointer gap-2"
            >
              Shop Collection
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#manifesto"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white font-bold text-sm tracking-widest uppercase rounded hover:border-white transition-all duration-200 cursor-pointer"
            >
              Our Story
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: 1.05 }}
            className="flex gap-10 mt-16 pt-8 border-t border-white/8"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl text-[#f5ff00]">
                  {stat.value}
                </div>
                <div className="text-xs text-[#777] uppercase tracking-wider mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease, delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-hidden="true"
      >
        <span className="text-[10px] text-[#777] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[#666] to-transparent" />
      </motion.div>
    </section>
  );
}
