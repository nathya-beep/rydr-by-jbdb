"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";

const easeExpo = [0.16, 1, 0.3, 1] as const;
const SIZES = ["S", "M", "L", "XL", "XXL"] as const;

const bundles = [
  {
    name: "Starter Pack",
    price: 45,
    items: ["1 × Heavyweight Tee"],
    description: "Your first RYDR piece. Start here.",
    featured: false,
    tag: null,
  },
  {
    name: "Rider Pack",
    price: 89,
    items: ["1 × Heavyweight Tee", "1 × Structured Cap"],
    description: "The complete daily rider kit. Best value.",
    featured: true,
    tag: "Most Popular",
  },
  {
    name: "Full Kit",
    price: 129,
    items: ["1 × Heavyweight Tee", "1 × Structured Cap", "1 × 380gsm Hoodie"],
    description: "All season. All conditions. Full RYDR.",
    featured: false,
    tag: "Best Value",
  },
];

const BUNDLE_IMAGES = [
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
  "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=600&q=80",
];

export default function Bundles() {
  const { addItem } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [added, setAdded] = useState<Record<string, boolean>>({});

  function handleAdd(bundle: (typeof bundles)[0], imageUrl: string) {
    const size = selectedSizes[bundle.name];
    if (!size) return;
    addItem({
      id: `bundle-${bundle.name}-${size}`,
      name: `${bundle.name} — ${size}`,
      price: bundle.price,
      image: imageUrl,
    });
    setAdded((prev) => ({ ...prev, [bundle.name]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [bundle.name]: false })), 2000);
  }

  return (
    <section id="bundles" className="py-24 bg-[#0d0d0d] px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeExpo }}
        >
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-white uppercase">
            Bundle & Ride
          </h2>
          <p className="text-[#888] mt-4 max-w-md mx-auto text-sm">
            Stack the essentials and save. Built for every type of rider.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {bundles.map((bundle, i) => (
            <motion.div
              key={bundle.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: easeExpo, delay: i * 0.1 }}
              className={`relative rounded-lg p-8 flex flex-col ${
                bundle.featured
                  ? "bg-[#f5ff00] text-black scale-[1.02] shadow-[0_0_60px_rgba(245,255,0,0.2)]"
                  : "bg-[rgba(255,255,255,0.03)] border border-white/8 text-[#f0f0f0] hover:border-white/20 transition-all duration-300"
              }`}
            >
              {/* Tag */}
              {bundle.tag && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold tracking-widest uppercase rounded-full ${
                    bundle.featured
                      ? "bg-black text-[#f5ff00]"
                      : "bg-[#ff3c00] text-white"
                  }`}
                >
                  {bundle.tag}
                </div>
              )}

              {/* Name */}
              <p
                className={`text-xs font-bold tracking-[0.4em] uppercase mb-2 ${
                  bundle.featured ? "text-black/60" : "text-[#666]"
                }`}
              >
                {bundle.name}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-6">
                <span
                  className={`font-display text-[clamp(3rem,7vw,5rem)] leading-none ${
                    bundle.featured ? "text-black" : "text-[#f5ff00]"
                  }`}
                >
                  ${bundle.price}
                </span>
              </div>

              {/* Description */}
              <p
                className={`text-sm mb-6 ${
                  bundle.featured ? "text-black/70" : "text-[#888]"
                }`}
              >
                {bundle.description}
              </p>

              {/* Items */}
              <ul className="flex-1 space-y-2 mb-8">
                {bundle.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                        bundle.featured ? "bg-black/15" : "bg-white/8"
                      }`}
                      aria-hidden="true"
                    >
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 12 12"
                        fill="none"
                        className={bundle.featured ? "text-black" : "text-[#f5ff00]"}
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className={bundle.featured ? "text-black/80" : "text-[#ccc]"}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Size selector */}
              <div className="mb-4">
                <p className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-2 ${bundle.featured ? "text-black/50" : "text-[#666]"}`}>
                  Select size
                </p>
                <div className="flex gap-1">
                  {SIZES.map((size) => {
                    const isSelected = selectedSizes[bundle.name] === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSizes((prev) => ({ ...prev, [bundle.name]: size }))}
                        className={`flex-1 h-9 text-[11px] font-bold rounded transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5ff00] ${
                          bundle.featured
                            ? isSelected
                              ? "bg-black text-[#f5ff00]"
                              : "bg-black/10 text-black hover:bg-black/20"
                            : isSelected
                            ? "bg-[#f5ff00] text-black"
                            : "bg-white/10 text-white hover:bg-[#f5ff00] hover:text-black"
                        }`}
                        aria-pressed={isSelected}
                        aria-label={`Talla ${size}`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => handleAdd(bundle, BUNDLE_IMAGES[i] ?? BUNDLE_IMAGES[0])}
                disabled={!selectedSizes[bundle.name]}
                className={`w-full py-3.5 font-bold text-sm tracking-widest uppercase rounded transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                  bundle.featured
                    ? "bg-black text-[#f5ff00] hover:bg-[#111]"
                    : "border border-white/20 text-white hover:border-[#f5ff00] hover:text-[#f5ff00]"
                }`}
              >
                {added[bundle.name] ? "Added ✓" : "Get This Pack"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
