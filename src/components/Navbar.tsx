"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart";

const navLinks = [
  { label: "Shop", href: "#featured" },
  { label: "Lookbook", href: "#categories" },
  { label: "About", href: "#manifesto" },
];

function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/8"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="group">
          <Image
            src="/logo-color.png"
            alt="RYDR by JBDB"
            width={1336}
            height={784}
            className="h-16 w-auto transition-opacity duration-200 group-hover:opacity-70"
            priority
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#aaa] hover:text-white transition-colors duration-200 tracking-wider uppercase cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-3">
          <button className="px-5 py-2 text-sm font-semibold text-white border border-white/30 rounded hover:border-white hover:text-white transition-all duration-200 tracking-wide cursor-pointer">
            Sign In
          </button>
          <a
            href="#featured"
            className="px-5 py-2 text-sm font-semibold bg-[#f5ff00] text-black rounded hover:bg-white transition-all duration-200 tracking-wide cursor-pointer"
          >
            Shop Now
          </a>
          <button
            onClick={openCart}
            className="relative w-10 h-10 flex items-center justify-center text-[#aaa] hover:text-white transition-colors duration-200 cursor-pointer"
            aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
          >
            <CartIcon />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#f5ff00] text-black text-[10px] font-bold flex items-center justify-center leading-none">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={openCart}
            className="relative w-10 h-10 flex items-center justify-center text-[#aaa] hover:text-white transition-colors duration-200 cursor-pointer"
            aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
          >
            <CartIcon />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#f5ff00] text-black text-[10px] font-bold flex items-center justify-center leading-none">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>
          <button
            className="flex flex-col gap-1.5 p-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0d0d] border-t border-white/8 px-5 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base font-semibold text-[#f0f0f0] tracking-widest uppercase py-1 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-2 border-t border-white/8 mt-2">
            <button className="w-full py-3 text-sm font-semibold text-white border border-white/30 rounded tracking-wide cursor-pointer">
              Sign In
            </button>
            <a
              href="#featured"
              className="w-full py-3 text-sm font-semibold bg-[#f5ff00] text-black rounded tracking-wide text-center cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              Shop Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
