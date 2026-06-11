"use client";
import { motion } from "framer-motion";

const easeExpo = [0.16, 1, 0.3, 1] as const;

const pillars = [
  {
    number: "01",
    title: "Material",
    body: "380gsm technical cotton for outerwear. 220gsm ringspun for tees. Preshrunk, colorfast, built to survive the ride — not just look good standing still.",
  },
  {
    number: "02",
    title: "Modular",
    body: "Multi-pocket architecture. Adjustable systems. Every piece is designed to adapt — to the weather, the speed, the situation. Nothing is decorative.",
  },
  {
    number: "03",
    title: "Palette",
    body: "Black is the base material — not a color choice. Neon yellow is the signal. Everything else gets out of the way. No gradients. No noise.",
  },
  {
    number: "04",
    title: "Structure",
    body: "Silhouettes that hold their shape at speed. Oversized where it counts for mobility, structured where it matters for presence. Designed in motion.",
  },
];

export default function TheDesign() {
  return (
    <section id="design" className="py-32 bg-[#080808] px-5 md:px-8 relative overflow-hidden">
      {/* Background grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeExpo }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-[#f5ff00]" aria-hidden="true" />
              <span className="text-xs font-bold text-[#f5ff00] tracking-[0.4em] uppercase">
                Design System
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-white uppercase leading-[0.9]">
              Built Like<br />
              <span style={{ WebkitTextStroke: "2px #f5ff00", color: "transparent" }}>
                Gear.
              </span>
            </h2>
          </motion.div>

          <motion.p
            className="text-[#888] text-base md:text-lg leading-relaxed max-w-md"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeExpo, delay: 0.1 }}
          >
            RYDR draws from the Techwear movement — where functional design meets
            urban aesthetics. Every material, every pocket, every seam is a
            decision. Nothing exists for decoration alone.
          </motion.p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              className="bg-[#080808] p-8 group hover:bg-[rgba(245,255,0,0.03)] transition-colors duration-300"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.09 }}
            >
              <p className="font-display text-[clamp(3rem,6vw,5rem)] leading-none text-white/8 group-hover:text-[#f5ff00]/15 transition-colors duration-300 mb-4 select-none" aria-hidden="true">
                {pillar.number}
              </p>
              <h3 className="font-display text-2xl text-white uppercase tracking-wide mb-4 group-hover:text-[#f5ff00] transition-colors duration-200">
                {pillar.title}
              </h3>
              <p className="text-sm text-[#888] leading-relaxed">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          className="mt-16 pt-10 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeExpo, delay: 0.3 }}
        >
          <p className="font-display text-[clamp(1.2rem,3vw,2rem)] text-[#444] uppercase">
            Techwear principles.{" "}
            <span className="text-white">Street identity.</span>
          </p>
          <a
            href="#featured"
            className="text-xs font-bold text-[#f5ff00] tracking-[0.3em] uppercase hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Shop the collection →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
