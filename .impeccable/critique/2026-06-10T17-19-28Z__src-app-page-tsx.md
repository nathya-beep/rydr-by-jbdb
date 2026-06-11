---
target: homepage + checkout
total_score: 19
p0_count: 2
p1_count: 2
timestamp: 2026-06-10T17-19-28Z
slug: src-app-page-tsx
---
# Critique: RYDR Homepage + Checkout (src/app/page.tsx)

## Design Health Score: 19/40 (Poor)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Place Order gives instant fake success, no processing state, no persisted record |
| 2 | Match System / Real World | 3 | "You're In." reused verbatim for newsletter and order confirmation |
| 3 | User Control and Freedom | 2 | Refresh on /checkout wipes typed info and resets to step 1; no undo on Remove |
| 4 | Consistency and Standards | 3 | Drawer promises taxes at checkout; checkout never calculates taxes |
| 5 | Error Prevention | 0 | noValidate + unconditional submit: blank form advances to payment |
| 6 | Recognition Rather Than Recall | 3 | Order summary visible + editable Ship-to recap |
| 7 | Flexibility and Efficiency | 1 | One rigid path; no sizes, no express pay, dead Sign In |
| 8 | Aesthetic and Minimalist Design | 3 | Strongest dimension; fake disabled card form detracts |
| 9 | Error Recovery | 0 | Not a single error message/state in the codebase |
| 10 | Help and Documentation | 2 | FAQ solid; Size Guide (referenced by FAQ) is dead # link |

## Anti-Patterns Verdict
LLM: Borderline. Hero is the complete hero-metric template. Manifesto + drenched Newsletter rescue real art direction. Bundles is a SaaS pricing table in a hoodie.
Detector: detect.mjs returned [] (exit 0) — likely false negative, does not parse Tailwind arbitrary values. Manual sweep: 9 AA contrast violations (#555 ~2.7:1 on interactive "Remove", checkout fine print, footer logo), 3 clamps over 6rem ceiling (7rem Hero/Manifesto), 32px qty touch targets, hero PNG 2.73MB with space in filename, zero focus-visible styles, dialog without focus trap/Escape.

## Priority Issues
- [P0] Orders go nowhere: handlePlaceOrder does clearCart()+setStep only. No persistence, Math.random() order number lost on refresh.
- [P0] Zero validation: noValidate + unconditional advance; recap renders " — , , · Mexico" when blank.
- [P1] Apparel with no sizes: Quick Add adds hoodie sizeless; FAQ references nonexistent size guide.
- [P1] Mobile cannot add to cart: Quick Add is hover-only; fallback "+ Cart" ~12px target.
- [P2] Checkout state evaporates on refresh (plain useState).
- [P2] Perf/hygiene: 2.73MB hero PNG (LCP), #555/#666 interactive contrast, 32px touch targets, no focus-visible, no Escape on drawer, dev live.js in layout.

## Persona Red Flags
Casey: hover-only Quick Add invisible on touch; drawer auto-opens every add; 2-col name grid at 320px; silent MX country default; interruption at payment loses everything.
Riley: email "x" accepted; 999 qty no cap; two tabs desync (no storage listener); Rider Pack $89 > tee+cap $70 separately; bundle shows duplicated tee photo.
Jordan: Sign In does nothing; Load More does nothing; dead card fields + "Stripe pending" reads as phishing; bounces.

## Minor Observations
WebkitTextStroke + @import Google Fonts = invisible VOLTS. if Anton fails; consent checkbox no visible focus; hero stats 12 drops vs 6 products; stock avatars as fake social proof; live.js dev artifact shipped; Sustainability dead link.

## Questions
1. If Stripe is not ready, why pretend? Pre-order/reserve fits drop culture and is honest.
2. Why Unsplash models for a brand whose manifesto says "we took the lane"?
3. Does Bundles earn its scroll depth without real discounts?
