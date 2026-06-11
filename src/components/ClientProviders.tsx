"use client";
import { CartProvider } from "@/lib/cart";
import CartDrawer from "@/components/CartDrawer";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
