# Design System — RYDR by JBDB

## Theme

Always-dark. No light mode. The brand lives at night, under streetlights, on lit-up city grids.

**Color strategy:** Drenched — the surface IS the color. Black is not a background choice; it is the material the brand is made of. Neon yellow cuts through it as the only light source.

## Colors

### Core palette

| Token | Value | Role |
|---|---|---|
| `--background` | `#0d0d0d` | Page surface, primary bg |
| `--foreground` | `#f0f0f0` | Primary text |
| `--primary` | `#f5ff00` | Brand yellow — CTAs, prices, accents, interactive states |
| `--primary-foreground` | `#0d0d0d` | Text on yellow |
| `--accent` | `#ff3c00` | Electric orange — badges (Bestseller/Limited), destructive |
| `--accent-foreground` | `#ffffff` | Text on orange |
| `--card` | `rgba(255,255,255,0.04)` | Surface for product cards, glass panels |
| `--secondary` | `#1a1a1a` | Subtle raised surface |
| `--muted` | `#1a1a1a` | Muted bg |
| `--muted-foreground` | `#888888` | Secondary text, subheadlines |
| `--border` | `rgba(255,255,255,0.08)` | Card borders, dividers |
| `--popover` | `#141414` | Dropdowns, tooltips |
| Footer bg | `#080808` | Slightly darker than main bg |

### Usage rules

- Yellow (`#f5ff00`) is used on: primary CTAs, prices, section kickers, hover states, interactive affordances.
- Orange (`#ff3c00`) is used on: "Bestseller" and "Limited" badges only. Not decorative.
- Never use orange as a substitute for yellow in interactive states.
- White (`#f0f0f0`) for headings and high-emphasis text only.
- `#888` for body/subheadline. `#666` for captions and secondary metadata.
- `#555` and below: footer-only subdued text.
- Glass cards: `rgba(255,255,255,0.04)` surface + `rgba(255,255,255,0.08)` border.

## Typography

### Font stack

| Role | Family | Source |
|---|---|---|
| Display / Heading | Anton | Google Fonts |
| Body / UI | Epilogue | Google Fonts |
| Mono | Geist Mono (CSS var only) | System |

Max 2 active families (Anton + Epilogue). Geist Mono is declared but not used in UI.

### Display (Anton)

```css
.font-display {
  font-family: 'Anton', sans-serif;
  letter-spacing: 0.02em;
}
```

Used for: hero headline, section headings, product prices, logo wordmark, stat values.
Always uppercase. Never used for body copy.

### Scale

| Use | Size | Weight | Font |
|---|---|---|---|
| Hero headline | `clamp(3.5rem, 10vw, 7rem)` | 400 (Anton) | Display |
| Section heading | `clamp(2rem, 5vw, 4rem)` | 400 (Anton) | Display |
| Subsection heading | `1.5rem–2rem` | 700–800 | Epilogue |
| Body | `1rem` | 400–500 | Epilogue |
| Body large | `1.125rem` | 400 | Epilogue |
| Label / kicker | `0.75rem` | 700 | Epilogue, uppercase, tracked |
| Badge | `0.75rem` | 700 | Epilogue, uppercase |
| Caption / meta | `0.625rem–0.75rem` | 500–600 | Epilogue |

Line length: cap body at 65ch max.

### Letter-spacing

- Display headings: `letter-spacing: 0.02em` (set globally on `.font-display`)
- Uppercase labels: `tracking-[0.3em]` to `tracking-[0.4em]`
- Nav links: `tracking-wider`
- Never tighter than `-0.01em` on display type

## Components

### Navbar

Fixed top, full-width. Transparent when at top; becomes `bg-[#0d0d0d]/95 backdrop-blur-md` with bottom border on scroll.

- Logo: Anton wordmark "RYDR" + Epilogue "by JBDB" subline
- Desktop: inline nav links (Shop, Lookbook, About) + "Sign In" outline button + "Shop Now" yellow CTA
- Mobile: hamburger (animated 3-bar → X) → full-screen dropdown menu
- Height: `h-16`

### Hero

Full-viewport section. Background: full-bleed image with three overlay layers (flat dark, vertical gradient, horizontal gradient) + neon yellow glow blur accent.

Structure: eyebrow line → display headline (4 lines, last line with outline stroke) → subheadline → CTA row → stats row (3 stats) → scroll indicator.

Grid texture: 60px grid lines at `rgba(255,255,255,0.025)`.

### Product Card

Aspect ratio 3:4 image + info strip below.

```
Surface: rgba(255,255,255,0.03) | border: rgba(255,255,255,0.08)
Hover: border → rgba(255,255,255,0.20)
Image: scale-105 on hover (700ms transition)
Overlay: bg-black/0 → bg-black/20 on hover
Badge: top-left, yellow (New Drop) or orange (Bestseller/Limited)
Quick Add: slide up from bottom on hover, white → yellow on click
Info: product name (sm/semibold) + price (Anton/yellow) + "+ Cart" ghost link
```

### Badges

Two variants only:
- **New Drop**: `bg-[#f5ff00] text-black` — yellow filled
- **Bestseller / Limited**: `bg-[#ff3c00] text-white` — orange filled

Shared: `text-xs font-bold px-2.5 py-1 rounded tracking-wider uppercase`

### Buttons

| Variant | Style |
|---|---|
| Primary | `bg-[#f5ff00] text-black font-bold hover:bg-white` |
| Outline | `border border-white/30 text-white hover:border-white` |
| Ghost | `text-[#666] hover:text-white underline underline-offset-2` |
| Outline accent | `border border-white/20 hover:border-[#f5ff00] hover:text-[#f5ff00]` |

All buttons: `text-sm font-semibold tracking-widest uppercase rounded`

### Section kickers

Small uppercase label above section headings. Use sparingly — not on every section.

```css
text-xs text-[#f5ff00] tracking-[0.4em] uppercase mb-3
```

Preceded by a horizontal rule accent:
```css
<span className="w-8 h-px bg-[#f5ff00]" /> + kicker text
```

### Dividers / separators

- `border-t border-white/8` — standard horizontal rule
- `w-px bg-gradient-to-b from-[#666] to-transparent` — scroll indicator vertical line

## Layout

- Max width: `max-w-7xl` (80rem)
- Horizontal padding: `px-5 md:px-8` (20px / 32px)
- Section vertical padding: `py-24` (6rem)
- Card grid: `grid-cols-2 md:grid-cols-3 gap-4 md:gap-6`

## Motion

### Fade-up (CSS, IntersectionObserver)

The primary entrance animation. Applied to sections and cards via `.fade-up` class.

```css
.fade-up {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

JS triggers `.visible` via IntersectionObserver at `threshold: 0.08`. Stagger delays: `.delay-100` through `.delay-500` (0.1s increments).

**Known issue:** Content starts invisible (`opacity: 0`). On hidden tabs or headless renderers, the IntersectionObserver may not fire, leaving sections blank.

**Reduced motion:** Fade-up disables completely (`opacity: 1, transform: none, transition: none`).

### Available (not yet used)

- **Framer Motion v12** is installed. Use for complex sequenced animations, exit animations, layout transitions, or any animation that needs better control than CSS transitions.
- `tw-animate-css` for utility-class-triggered CSS animations.

### Interaction transitions

- Color/border transitions: `duration-200` with `ease` (default)
- Image scale on card hover: `duration-700`
- Mobile menu: `duration-200`
- Navbar transparency: `duration-300`

## Texture / FX

- Grid texture on Hero: `background-image` linear-gradient grid at 60px, `rgba(255,255,255,0.025)`
- Neon glow: `w-[600px] h-[300px] opacity-10 blur-[100px]` positioned center-top of hero, `#f5ff00`
- Backdrop blur: navbar uses `backdrop-blur-md` on scroll
- Custom scrollbar: 4px, `#333` thumb → `#f5ff00` on hover

## Radius

`--radius: 0.375rem` (6px base). Cards and buttons use `rounded` (6px). No large radius or pill shapes.

## Tech stack

| Layer | Package | Version |
|---|---|---|
| Framework | Next.js | 16.2.7 |
| Runtime | React | 19.2.4 |
| Styling | Tailwind CSS | v4 |
| Animation | Framer Motion | 12.x |
| Animation CSS | tw-animate-css | 1.x |
| UI primitives | Base UI (Radix replacement) | 1.x |
| Component kit | shadcn | 4.x |
| Icons | Lucide React | 1.x |
| Utilities | clsx, tailwind-merge, cva | latest |

## Known quality issues (from crawl)

1. **Contrast failures in footer** — `#444` and `#333` text on `#080808` bg fails WCAG AA. Copyright text and tagline are nearly invisible.
2. **Invisible content risk** — `.fade-up` starts at `opacity: 0`. Headless renderers and background tabs may never fire the IntersectionObserver, shipping blank sections.
3. **Hero headline clamp max** — Set to `9rem` (144px). Design guideline ceiling is 6rem; above that the page is shouting. Recommend `clamp(3.5rem, 10vw, 6.5rem)`.
4. **Framer Motion installed, unused** — CSS-only animation works for simple fade-ins, but Framer Motion would enable exit animations, layout transitions, and more expressive motion that fits the brand energy.
5. **Kicker pattern risk** — "Latest Drops", "E-Bike Streetwear" etc. are eyebrow labels. If used on every section, they hit the absolute ban on "tiny uppercase tracked eyebrow above every section." Audit which sections can drop or vary the kicker.
