"use client";
import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart";

const easeExpo = [0.16, 1, 0.3, 1] as const;

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, subtotal, itemCount, isOpen, closeCart } =
    useCart();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) closeCart();
    },
    [closeCart]
  );

  // Escape closes; focus moves into the dialog on open.
  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleOverlayClick}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.aside
            key="drawer"
            className="fixed top-0 right-0 bottom-0 w-full max-w-[420px] bg-[#0d0d0d] border-l border-white/8 z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: easeExpo }}
            aria-label="Shopping cart"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <div>
                <h2 className="font-display text-xl text-white uppercase tracking-wider">
                  Cart
                </h2>
                {itemCount > 0 && (
                  <p className="text-xs text-[#999] mt-0.5">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </p>
                )}
              </div>
              <button
                ref={closeButtonRef}
                onClick={closeCart}
                className="w-11 h-11 flex items-center justify-center text-[#999] hover:text-white transition-colors duration-200 cursor-pointer rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5ff00]/70"
                aria-label="Close cart"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
                  <div className="w-16 h-16 rounded-full bg-white/4 flex items-center justify-center">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#666"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-[#f0f0f0] font-semibold text-sm">Your cart is empty</p>
                    <p className="text-[#999] text-xs mt-1">Add something to ride with.</p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="mt-2 px-4 py-3 text-xs text-[#f5ff00] tracking-widest uppercase font-bold hover:underline cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5ff00]/70 rounded"
                  >
                    Browse Drops
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-white/6 -mx-1">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: easeExpo }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-4 py-4 px-1">
                          {/* Image */}
                          <div className="relative w-20 h-24 flex-shrink-0 rounded overflow-hidden bg-white/4">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <p className="text-sm font-semibold text-[#f0f0f0] truncate">
                                {item.name}
                              </p>
                              <p className="font-display text-lg text-[#f5ff00] mt-0.5">
                                ${item.price}
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                              {/* Quantity control */}
                              <div className="flex items-center gap-0 border border-white/10 rounded overflow-hidden">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="w-10 h-10 flex items-center justify-center text-[#999] hover:text-white hover:bg-white/8 transition-colors duration-150 cursor-pointer text-lg leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#f5ff00]/70"
                                  aria-label={`Decrease quantity of ${item.name}`}
                                >
                                  −
                                </button>
                                <span className="w-9 h-10 flex items-center justify-center text-sm text-[#f0f0f0] font-medium select-none">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="w-10 h-10 flex items-center justify-center text-[#999] hover:text-white hover:bg-white/8 transition-colors duration-150 cursor-pointer text-lg leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#f5ff00]/70"
                                  aria-label={`Increase quantity of ${item.name}`}
                                >
                                  +
                                </button>
                              </div>

                              {/* Remove */}
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-xs text-[#999] hover:text-[#ff3c00] transition-colors duration-200 cursor-pointer underline underline-offset-2 px-2 py-3 -mr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5ff00]/70 rounded"
                                aria-label={`Remove ${item.name} from cart`}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/8 px-6 py-5 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#999]">Subtotal</span>
                  <span className="font-display text-xl text-[#f5ff00]">
                    ${subtotal}
                  </span>
                </div>
                <p className="text-xs text-[#999]">
                  Free shipping worldwide. No hidden fees.
                </p>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-[#f5ff00] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-white transition-colors duration-200 cursor-pointer"
                >
                  Checkout
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* Continue shopping */}
                <button
                  onClick={closeCart}
                  className="w-full py-3 text-xs text-[#999] hover:text-white transition-colors duration-200 tracking-widest uppercase cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5ff00]/70 rounded"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
