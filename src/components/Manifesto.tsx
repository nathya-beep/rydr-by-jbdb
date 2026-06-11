"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const easeExpo = [0.16, 1, 0.3, 1] as const;

const lines = [
  "Every stitch is a decision.",
  "Every pocket, a purpose.",
  "We don't dress for the commute.",
  "We gear up for the ride.",
  "Function without apology.",
];

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="py-32 bg-[#0a0a0a] px-5 md:px-8 relative overflow-hidden"
    >
      {/* Decorative line */}
      <div className="absolute left-5 md:left-16 top-0 bottom-0 w-px bg-white/5" aria-hidden="true" />

      {/* Background logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
        <Image
          src="/logo-color.png"
          alt=""
          width={1336}
          height={784}
          className="w-[130%] max-w-6xl opacity-[0.09]"
        />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Section marker — yellow dash, no eyebrow text */}
        <motion.div
          className="w-10 h-px bg-[#f5ff00] mb-16"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeExpo }}
          aria-hidden="true"
        />

        {/* Poem lines */}
        <div className="space-y-4 mb-20">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              className="font-display text-[clamp(1.5rem,4vw,3.5rem)] text-white uppercase leading-tight"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: easeExpo, delay: i * 0.07 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="flex items-center gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeExpo, delay: 0.3 }}
        >
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[#666] text-xs tracking-widest" aria-hidden="true">●</span>
          <div className="flex-1 h-px bg-white/10" />
        </motion.div>

        {/* Central statement */}
        <div>
          <motion.p
            className="font-display text-[clamp(3rem,8vw,6rem)] uppercase leading-[0.9] mb-8"
            style={{ color: "#f5ff00" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: easeExpo }}
          >
            We don&apos;t
            <br />
            commute.
          </motion.p>
          <motion.p
            className="font-display text-[clamp(3rem,8vw,6rem)] uppercase leading-[0.9]"
            style={{
              WebkitTextStroke: "2px #f5ff00",
              color: "transparent",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: easeExpo, delay: 0.12 }}
          >
            We ride.
          </motion.p>
        </div>

        {/* Body text */}
        <motion.p
          className="text-[#888] text-lg leading-relaxed max-w-2xl mt-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: easeExpo, delay: 0.2 }}
        >
          RYDR draws from Techwear — where functional design meets street identity.
          Technical materials, modular construction, dark palette with electric
          accents. Built for riders who demand both performance and presence.
          The culture is the product. The product is the gear.
        </motion.p>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeExpo, delay: 0.3 }}
        >
          <div className="w-12 h-px bg-[#f5ff00] mb-4" />
          <p className="text-[#888] text-sm tracking-[0.3em] uppercase font-semibold">
            — RYDR by JBDB
          </p>
        </motion.div>
      </div>
    </section>
  );
}
