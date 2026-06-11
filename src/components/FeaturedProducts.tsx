"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/lib/mockData";
import { useCart } from "@/lib/cart";

const easeExpo = [0.16, 1, 0.3, 1] as const;

const SIZES = ["S", "M", "L", "XL", "XXL"] as const;

/** Caps are one-size; tees and hoodies need a size choice. */
function isSized(category: string) {
  return category === "tees" || category === "hoodies";
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const [added, setAdded] = useState<string | null>(null);
  const { addItem } = useCart();
  const sized = isSized(product.category);

  function handleAdd(size?: string) {
    addItem({
      id: size ? `${product.id}-${size}` : product.id,
      name: size ? `${product.name} — ${size}` : product.name,
      price: product.price,
      image: product.image,
    });
    setAdded(size ?? "one");
    setTimeout(() => setAdded(null), 2000);
  }

  return (
    <motion.div
      className="group relative bg-[rgba(255,255,255,0.03)] border border-white/8 rounded-lg overflow-hidden hover:border-white/20 transition-colors duration-300"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: easeExpo, delay: (index % 3) * 0.09 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

        {/* RYDR brand overlay — hoodies only */}
        {product.category === "hoodies" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <div className="flex flex-col items-center gap-0.5 opacity-90">
              <span
                className="font-display text-[clamp(1.8rem,5vw,2.8rem)] text-white leading-none tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.6)" }}
              >
                RYDR
              </span>
              <span className="text-[9px] text-[#f5ff00] tracking-[0.35em] uppercase font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                by JBDB
              </span>
            </div>
          </div>
        )}

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded tracking-wider uppercase ${
              product.badgeColor === "yellow"
                ? "bg-[#f5ff00] text-black"
                : "bg-[#ff3c00] text-white"
            }`}
          >
            {product.badge}
          </span>
        </div>

        {/* Add bar — always visible on touch, slides up on desktop hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 md:group-focus-within:translate-y-0 transition-transform duration-300">
          {sized ? (
            <div className="bg-black/85 backdrop-blur-sm px-2 py-2">
              <p className="text-[10px] text-[#ccc] tracking-[0.25em] uppercase text-center mb-1.5">
                {added && added !== "one" ? `Added ${added} ✓` : "Select size"}
              </p>
              <div className="flex gap-1.5 justify-center">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleAdd(size)}
                    className={`flex-1 max-w-[64px] h-10 text-xs font-bold rounded transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5ff00] ${
                      added === size
                        ? "bg-[#f5ff00] text-black"
                        : "bg-white/10 text-white hover:bg-[#f5ff00] hover:text-black"
                    }`}
                    aria-label={`Add ${product.name} size ${size} to cart`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={() => handleAdd()}
              className="w-full h-12 bg-white text-black font-bold text-xs tracking-widest uppercase hover:bg-[#f5ff00] transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#f5ff00]"
            >
              {added ? "Added to cart ✓" : "Quick Add — One Size"}
            </button>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-[#f0f0f0] tracking-wide mb-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-display text-xl text-[#f5ff00]">
            ${product.price}
          </span>
          <span className="text-xs text-[#999]">
            {sized ? "S–XXL" : "One size"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  return (
    <section id="featured" className="py-24 bg-[#0d0d0d] px-5 md:px-8">
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
            Featured Products
          </h2>
          <a
            href="#categories"
            className="hidden md:flex items-center gap-2 text-sm text-[#999] hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Shop by category
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
