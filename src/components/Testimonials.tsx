"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/mockData";

const easeExpo = [0.16, 1, 0.3, 1] as const;

const avatars = [
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&q=80",
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#090909] px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeExpo }}
        >
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-white uppercase">
            Riders Speak
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: easeExpo, delay: i * 0.08 }}
              className="group p-6 bg-[rgba(255,255,255,0.03)] border border-white/8 rounded-lg hover:border-white/20 hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300"
            >
              {/* Quote mark */}
              <div
                className="font-display text-5xl text-[#f5ff00]/20 leading-none mb-4 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </div>

              {/* Text */}
              <p className="text-[#bbb] text-sm leading-relaxed mb-6">
                {t.text}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/8">
                <div>
                  <p className="text-white font-semibold text-sm">{t.handle}</p>
                  <p className="text-xs text-[#777] mt-0.5">{t.location}</p>
                </div>
                {/* Stars — decorative, hidden from assistive tech */}
                <div className="flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg
                      key={j}
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="#f5ff00"
                      className="opacity-80"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof bar */}
        <motion.div
          className="mt-12 p-5 border border-white/8 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeExpo, delay: 0.3 }}
        >
          <p className="text-[#888] text-sm">
            Join <span className="text-white font-semibold">1,200+</span> riders already repping RYDR
          </p>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {avatars.map((src, j) => (
                <Image
                  key={j}
                  src={src}
                  alt=""
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-[#0d0d0d] object-cover"
                />
              ))}
            </div>
            <span className="text-xs text-[#888] ml-1">and counting</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
