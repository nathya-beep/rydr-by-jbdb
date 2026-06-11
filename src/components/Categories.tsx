"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const easeExpo = [0.16, 1, 0.3, 1] as const;

const categories = [
  {
    name: "Tees",
    subtitle: "Heavyweight drops",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    count: "6 styles",
    href: "#featured",
  },
  {
    name: "Caps",
    subtitle: "Structured fits",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    count: "4 styles",
    href: "#featured",
  },
  {
    name: "Hoodies",
    subtitle: "380gsm cotton",
    image: "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80",
    count: "3 styles",
    href: "#featured",
  },
];

export default function Categories() {
  return (
    <section id="categories" className="py-24 bg-[#0d0d0d] px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeExpo }}
        >
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-white uppercase">
            Shop By Category
          </h2>
          <a
            href="#featured"
            className="hidden md:flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors duration-200 cursor-pointer"
          >
            View all
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.name}
              href={cat.href}
              className="group relative overflow-hidden rounded-lg cursor-pointer block"
              style={{ aspectRatio: "3/4" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, ease: easeExpo, delay: i * 0.1 }}
            >
              {/* Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Yellow hover overlay */}
              <div className="absolute inset-0 bg-[#f5ff00]/0 group-hover:bg-[#f5ff00]/10 transition-all duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-xs text-[#888] tracking-[0.3em] uppercase mb-1">
                  {cat.subtitle}
                </p>
                <h3 className="font-display text-4xl text-white uppercase group-hover:text-[#f5ff00] transition-colors duration-200">
                  {cat.name}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-[#888]">{cat.count}</span>
                  {/* Decorative arrow — hidden from AT since the whole link is the affordance */}
                  <span
                    className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#f5ff00] group-hover:bg-[#f5ff00] transition-all duration-200"
                    aria-hidden="true"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white group-hover:text-black transition-colors duration-200"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
