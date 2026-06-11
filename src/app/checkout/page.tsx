"use client";
import { useState, useEffect, useId, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, type CartItem } from "@/lib/cart";

const easeExpo = [0.16, 1, 0.3, 1] as const;

type Step = "info" | "payment" | "confirmed";

type ShippingInfo = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

type FieldErrors = Partial<Record<keyof ShippingInfo, string>>;

type SavedOrder = {
  number: string;
  email: string;
  items: CartItem[];
  total: number;
  placedAt: string;
};

const EMPTY_INFO: ShippingInfo = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

const COUNTRIES = [
  { code: "MX", name: "Mexico" },
  { code: "US", name: "United States" },
  { code: "BE", name: "Belgium" },
  { code: "ES", name: "Spain" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "NL", name: "Netherlands" },
  { code: "AR", name: "Argentina" },
  { code: "CO", name: "Colombia" },
  { code: "CL", name: "Chile" },
  { code: "BR", name: "Brazil" },
];

const SESSION_KEY = "rydr-checkout";
const ORDER_KEY = "rydr-last-order";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateInfo(info: ShippingInfo): FieldErrors {
  const errors: FieldErrors = {};
  if (!info.email.trim()) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(info.email.trim()))
    errors.email = "Enter a valid email, like rider@example.com.";
  if (!info.firstName.trim()) errors.firstName = "First name is required.";
  if (!info.lastName.trim()) errors.lastName = "Last name is required.";
  if (!info.address.trim()) errors.address = "Street address is required.";
  if (!info.city.trim()) errors.city = "City is required.";
  if (!info.zip.trim()) errors.zip = "ZIP / postal code is required.";
  if (!info.country) errors.country = "Select your country.";
  return errors;
}

function FieldInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  autoComplete,
  error,
  className = "",
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  autoComplete?: string;
  error?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-xs font-semibold text-[#999] tracking-wider uppercase">
        {label}
        {required && <span className="text-[#f5ff00] ml-0.5" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`bg-transparent border rounded px-4 py-3 text-sm text-[#f0f0f0] placeholder-white/50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5ff00]/70 ${
          error
            ? "border-[#ff3c00]"
            : "border-white/12 focus:border-[#f5ff00]/60"
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-[#ff6a3d] font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function FieldSelect({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { code: string; name: string }[];
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-[#999] tracking-wider uppercase">
        {label}
        {required && <span className="text-[#f5ff00] ml-0.5" aria-hidden="true">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`bg-[#111] border rounded px-4 py-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5ff00]/70 transition-colors duration-200 cursor-pointer appearance-none ${
          value ? "text-[#f0f0f0]" : "text-white/50"
        } ${error ? "border-[#ff3c00]" : "border-white/12 focus:border-[#f5ff00]/60"}`}
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
      >
        <option value="" disabled>
          Select country
        </option>
        {options.map((o) => (
          <option key={o.code} value={o.code}>
            {o.name}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} className="text-xs text-[#ff6a3d] font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "info", label: "Information" },
    { key: "payment", label: "Review" },
    { key: "confirmed", label: "Confirmed" },
  ];
  const stepIndex = { info: 0, payment: 1, confirmed: 2 };
  const current = stepIndex[step];

  return (
    <nav aria-label="Checkout progress" className="flex items-center gap-0">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center gap-0">
          <span
            className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${
              i < current
                ? "text-[#f5ff00]"
                : i === current
                ? "text-[#f0f0f0]"
                : "text-[#777]"
            }`}
            aria-current={i === current ? "step" : undefined}
          >
            {i < current ? "✓ " : ""}
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <span className="mx-3 text-[#555] text-xs select-none" aria-hidden="true">
              /
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

function OrderSummary({ subtotal }: { subtotal: number }) {
  const { items } = useCart();

  return (
    <aside className="bg-[#111] rounded-xl p-6 border border-white/6">
      <h3 className="font-display text-lg text-white uppercase tracking-wider mb-5">
        Order Summary
      </h3>

      {items.length === 0 ? (
        <p className="text-sm text-[#888] py-4">No items in cart.</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3 items-center">
              <div className="relative w-14 h-16 flex-shrink-0 rounded overflow-hidden bg-white/4">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#f5ff00] text-black text-[10px] font-bold flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#f0f0f0] truncate">{item.name}</p>
              </div>
              <p className="font-display text-base text-[#f5ff00] flex-shrink-0">
                ${item.price * item.quantity}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="border-t border-white/6 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[#999]">Subtotal</span>
          <span className="text-[#f0f0f0]">${subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#999]">Shipping</span>
          <span className="text-[#f0f0f0]">{subtotal > 0 ? "Free" : "—"}</span>
        </div>
        <div className="flex justify-between pt-3 border-t border-white/6">
          <span className="font-semibold text-[#f0f0f0]">Total</span>
          <span className="font-display text-2xl text-[#f5ff00]">${subtotal}</span>
        </div>
      </div>
    </aside>
  );
}

function InfoStep({
  info,
  setInfo,
  onContinue,
}: {
  info: ShippingInfo;
  setInfo: React.Dispatch<React.SetStateAction<ShippingInfo>>;
  onContinue: () => void;
}) {
  const uid = useId();
  const [errors, setErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const set = (key: keyof ShippingInfo) => (v: string) => {
    setInfo((prev) => ({ ...prev, [key]: v }));
    // Clear the field's error as soon as the user starts fixing it.
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateInfo(info);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first invalid field.
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus();
      });
      return;
    }
    onContinue();
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      {errorCount > 0 && (
        <div
          className="flex gap-3 p-4 bg-[#ff3c00]/10 border border-[#ff3c00]/30 rounded-lg mb-6"
          role="alert"
        >
          <p className="text-sm text-[#ff9d7a]">
            {errorCount === 1
              ? "1 field needs attention before continuing."
              : `${errorCount} fields need attention before continuing.`}
          </p>
        </div>
      )}

      {/* Contact */}
      <section className="mb-8">
        <h2 className="font-display text-lg text-white uppercase tracking-wider mb-5">
          Contact
        </h2>
        <FieldInput
          id={`${uid}-email`}
          label="Email"
          type="email"
          placeholder="your@email.com"
          value={info.email}
          onChange={set("email")}
          required
          autoComplete="email"
          error={errors.email}
        />
      </section>

      {/* Delivery */}
      <section className="mb-8">
        <h2 className="font-display text-lg text-white uppercase tracking-wider mb-5">
          Delivery
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldInput
              id={`${uid}-first`}
              label="First name"
              placeholder="Miguel"
              value={info.firstName}
              onChange={set("firstName")}
              required
              autoComplete="given-name"
              error={errors.firstName}
            />
            <FieldInput
              id={`${uid}-last`}
              label="Last name"
              placeholder="Reyes"
              value={info.lastName}
              onChange={set("lastName")}
              required
              autoComplete="family-name"
              error={errors.lastName}
            />
          </div>

          <FieldInput
            id={`${uid}-address`}
            label="Address"
            placeholder="123 Calle Insurgentes"
            value={info.address}
            onChange={set("address")}
            required
            autoComplete="street-address"
            error={errors.address}
          />

          <FieldInput
            id={`${uid}-apartment`}
            label="Apartment, suite, etc. (optional)"
            placeholder="Apt 4B"
            value={info.apartment}
            onChange={set("apartment")}
            autoComplete="address-line2"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FieldInput
              id={`${uid}-city`}
              label="City"
              placeholder="Ciudad de México"
              value={info.city}
              onChange={set("city")}
              required
              autoComplete="address-level2"
              error={errors.city}
            />
            <FieldInput
              id={`${uid}-state`}
              label="State / Province"
              placeholder="CDMX"
              value={info.state}
              onChange={set("state")}
              autoComplete="address-level1"
            />
            <FieldInput
              id={`${uid}-zip`}
              label="ZIP / Postal code"
              placeholder="06600"
              value={info.zip}
              onChange={set("zip")}
              required
              autoComplete="postal-code"
              error={errors.zip}
            />
          </div>

          <FieldSelect
            id={`${uid}-country`}
            label="Country / Region"
            value={info.country}
            onChange={set("country")}
            options={COUNTRIES}
            required
            error={errors.country}
          />
        </div>
      </section>

      <button
        type="submit"
        className="w-full py-4 bg-[#f5ff00] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-white transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Continue to Review
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
      </button>
    </form>
  );
}

function ReviewStep({
  info,
  placing,
  onBack,
  onPlaceOrder,
}: {
  info: ShippingInfo;
  placing: boolean;
  onBack: () => void;
  onPlaceOrder: () => void;
}) {
  const uid = useId();
  const [agreed, setAgreed] = useState(false);

  return (
    <div>
      {/* Shipping recap */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-[#999] tracking-widest uppercase">
            Ship to
          </h2>
          <button
            onClick={onBack}
            className="text-xs text-[#f5ff00] hover:underline cursor-pointer px-2 py-1.5 -mr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5ff00]/70 rounded"
          >
            Edit address
          </button>
        </div>
        <div className="bg-white/3 rounded-lg px-4 py-3 border border-white/6 text-sm text-[#ccc] leading-relaxed">
          <p className="font-medium text-[#f0f0f0]">
            {info.firstName} {info.lastName}
          </p>
          <p>
            {info.address}
            {info.apartment ? `, ${info.apartment}` : ""}
          </p>
          <p>
            {info.city}{info.state ? `, ${info.state}` : ""} {info.zip} ·{" "}
            {COUNTRIES.find((c) => c.code === info.country)?.name ?? info.country}
          </p>
          <p className="text-[#999] mt-1">{info.email}</p>
        </div>
      </section>

      {/* Reserve — honest pre-order framing while Stripe is pending */}
      <section className="mb-8">
        <h2 className="font-display text-lg text-white uppercase tracking-wider mb-5">
          Reserve Your Order
        </h2>

        <div className="bg-white/3 border border-white/8 rounded-lg p-5 space-y-4">
          <div className="flex gap-3">
            <span
              className="w-7 h-7 rounded-full bg-[#f5ff00] text-black font-display text-sm flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              1
            </span>
            <p className="text-sm text-[#ccc] leading-relaxed pt-1">
              Place your reservation now. No payment is collected today.
            </p>
          </div>
          <div className="flex gap-3">
            <span
              className="w-7 h-7 rounded-full bg-[#f5ff00] text-black font-display text-sm flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              2
            </span>
            <p className="text-sm text-[#ccc] leading-relaxed pt-1">
              We confirm stock and email you a secure payment link within 24 hours.
            </p>
          </div>
          <div className="flex gap-3">
            <span
              className="w-7 h-7 rounded-full bg-[#f5ff00] text-black font-display text-sm flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              3
            </span>
            <p className="text-sm text-[#ccc] leading-relaxed pt-1">
              Pay when you&apos;re ready. Your gear ships the same week.
            </p>
          </div>
        </div>
      </section>

      {/* Consent */}
      <label
        htmlFor={`${uid}-consent`}
        className="flex gap-3 items-start cursor-pointer mb-6 group"
      >
        <div className="relative mt-0.5 flex-shrink-0">
          <input
            id={`${uid}-consent`}
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="peer sr-only"
          />
          <div
            className={`w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center peer-focus-visible:ring-2 peer-focus-visible:ring-[#f5ff00]/70 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#0a0a0a] ${
              agreed
                ? "bg-[#f5ff00] border-[#f5ff00]"
                : "border-white/30 bg-transparent group-hover:border-white/50"
            }`}
            aria-hidden="true"
          >
            {agreed && (
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6l3 3 5-5"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
        <p className="text-sm text-[#999] leading-relaxed">
          I understand this is a reservation: RYDR will email me a payment link to
          complete the purchase. I can cancel any time before paying.
        </p>
      </label>

      <button
        onClick={onPlaceOrder}
        disabled={!agreed || placing}
        className={`w-full py-4 font-bold text-sm tracking-widest uppercase rounded transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
          agreed && !placing
            ? "bg-[#f5ff00] text-black hover:bg-white cursor-pointer"
            : "bg-white/8 text-white/40 cursor-not-allowed"
        }`}
      >
        {placing ? "Placing reservation…" : "Reserve order"}
      </button>

      {!agreed && (
        <p className="text-center text-xs text-[#888] mt-3">
          Check the box above to enable the button.
        </p>
      )}
    </div>
  );
}

function ConfirmedStep({ order }: { order: SavedOrder }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeExpo }}
      className="text-center py-8"
    >
      {/* Check */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: easeExpo }}
        className="w-20 h-20 rounded-full bg-[#f5ff00] flex items-center justify-center mx-auto mb-8"
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <p className="text-xs text-[#f5ff00] tracking-[0.4em] uppercase mb-3">
          Reservation Confirmed
        </p>
        <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] text-white uppercase leading-none mb-4">
          Locked In.
        </h2>
        <p className="text-[#999] text-sm max-w-sm mx-auto leading-relaxed mb-2">
          Order <span className="text-[#f0f0f0] font-semibold">{order.number}</span>{" "}
          reserved. We&apos;ll email{" "}
          <span className="text-[#f0f0f0] font-semibold">{order.email}</span> a
          payment link within 24 hours.
        </p>
        <p className="text-[#888] text-xs max-w-sm mx-auto mb-8">
          Save your order number. Questions? Reply to our email or write to
          crew@rydrjbdb.com.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-8 py-3.5 bg-[#f5ff00] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-white transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Back to Shop
          </Link>
          <a
            href="mailto:crew@rydrjbdb.com"
            className="px-8 py-3.5 border border-white/20 text-white font-semibold text-sm tracking-wider rounded hover:border-white transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5ff00]/70"
          >
            Email the Crew
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Time-based, collision-safe enough for client reservations; readable over the phone. */
function generateOrderNumber() {
  const t = Date.now().toString(36).toUpperCase().slice(-6);
  return `#RYDR-${t}`;
}

function readSession(): { step: Step; info: ShippingInfo } | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      (parsed.step === "info" || parsed.step === "payment") &&
      parsed.info &&
      typeof parsed.info === "object"
    ) {
      return { step: parsed.step, info: { ...EMPTY_INFO, ...parsed.info } };
    }
  } catch {}
  return null;
}

function readLastOrder(): SavedOrder | null {
  try {
    const raw = localStorage.getItem(ORDER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.number === "string" && Array.isArray(parsed.items)) {
      return parsed as SavedOrder;
    }
  } catch {}
  return null;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>("info");
  const [info, setInfo] = useState<ShippingInfo>(EMPTY_INFO);
  const [order, setOrder] = useState<SavedOrder | null>(null);
  const [placing, setPlacing] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore mid-flow state (refresh-proof) and any just-placed order.
  useEffect(() => {
    const saved = readSession();
    if (saved) {
      setInfo(saved.info);
      setStep(saved.step);
    }
    const last = readLastOrder();
    if (last && !saved) {
      // Arriving fresh with a recent confirmation: show it again.
      const ageMs = Date.now() - new Date(last.placedAt).getTime();
      if (ageMs < 1000 * 60 * 30) {
        setOrder(last);
        setStep("confirmed");
      }
    }
    setHydrated(true);
  }, []);

  // Persist mid-flow state on every change.
  useEffect(() => {
    if (!hydrated || step === "confirmed") return;
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ step, info }));
    } catch {}
  }, [step, info, hydrated]);

  function handlePlaceOrder() {
    if (placing) return;
    setPlacing(true);

    const newOrder: SavedOrder = {
      number: generateOrderNumber(),
      email: info.email.trim(),
      items,
      total: subtotal,
      placedAt: new Date().toISOString(),
    };

    // TODO(stripe): replace with a server action that persists the order
    // and creates a Stripe Checkout Session. Until then the reservation
    // lives in localStorage so a refresh cannot destroy the confirmation.
    try {
      localStorage.setItem(ORDER_KEY, JSON.stringify(newOrder));
      sessionStorage.removeItem(SESSION_KEY);
    } catch {}

    setOrder(newOrder);
    clearCart();
    setStep("confirmed");
    setPlacing(false);
  }

  const isConfirmed = step === "confirmed" && order !== null;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-white/6">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-display text-xl text-white tracking-widest group-hover:text-[#f5ff00] transition-colors duration-200">
              RYDR
            </span>
            <span className="text-[9px] text-[#888] font-medium tracking-[0.25em] uppercase -mt-0.5">
              by JBDB
            </span>
          </Link>

          {!isConfirmed && (
            <div className="hidden sm:block">
              <StepIndicator step={step} />
            </div>
          )}

          <Link
            href="/"
            className="text-xs text-[#999] hover:text-white transition-colors duration-200 tracking-wider uppercase px-2 py-2"
          >
            ← Shop
          </Link>
        </div>
      </header>

      {/* Mobile step indicator */}
      {!isConfirmed && (
        <div className="sm:hidden border-b border-white/6 px-5 py-3">
          <StepIndicator step={step} />
        </div>
      )}

      {/* Body */}
      <main className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-16">
        {!hydrated ? null : isConfirmed ? (
          <ConfirmedStep order={order} />
        ) : items.length === 0 ? (
          /* Empty cart fallback */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-[#999] mb-6">Your cart is empty.</p>
            <Link
              href="/"
              className="px-8 py-3 bg-[#f5ff00] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-white transition-colors duration-200 cursor-pointer"
            >
              Back to Shop
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">
            {/* Left: Form steps */}
            <div>
              <AnimatePresence mode="wait">
                {step === "info" && (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.3, ease: easeExpo }}
                  >
                    <InfoStep
                      info={info}
                      setInfo={setInfo}
                      onContinue={() => setStep("payment")}
                    />
                  </motion.div>
                )}
                {step === "payment" && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3, ease: easeExpo }}
                  >
                    <ReviewStep
                      info={info}
                      placing={placing}
                      onBack={() => setStep("info")}
                      onPlaceOrder={handlePlaceOrder}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Order summary (sticky on desktop) */}
            <div className="order-first lg:order-last">
              <div className="lg:sticky lg:top-8">
                <OrderSummary subtotal={subtotal} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
