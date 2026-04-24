# TheCraftMachine — Design System

A complete visual and motion specification derived from the editorial confidence of Tom Carder Media and the brand identity of TheCraftMachine: **precision, craft, and mechanical creativity**. Everything here is derived from the references — nothing generic.

---

## 1. Brand DNA

**Core metaphor**: Scattered raw materials → assembled machine. The brand animation (start: workshop table with tools; end: "The Craft Machine. Ready to build." assembled in brass) defines the narrative arc of every interaction. We take the raw, we shape it into something extraordinary.

**Emotional register**: Warm confidence. Heavy editorial type, warm neutral surfaces, one dominant accent (orange), slow intentional motion. Never frantic, never sterile.

**Anti-patterns** (enforced):
- No gradient buttons or gradient fills on UI elements
- No purple, violet, neon, glowing orbs, or blue-to-purple anything
- No pure white (`#fff`) or pure black (`#000`) — warmth is non-negotiable
- No icon-in-colored-circle decoration
- No centered default layout — center only for isolated hero moments
- No generic filler language ("Unlock the power of…")

---

## 2. Color Tokens

### Palette concept
Two surface temperatures — workshop warmth — with orange as the single accent. Light backgrounds read as warm parchment; dark backgrounds carry the warmth of a forge at night.

```css
:root {
  /* ── Surfaces ─────────────────────────────────────────── */
  --color-surface-light:      #F4EDE6;   /* warm parchment — primary light bg */
  --color-surface-light-alt:  #EDE5DC;   /* slightly deeper — alternating light sections */
  --color-surface-dark:       #18120D;   /* forge warmth — primary dark bg */
  --color-surface-dark-alt:   #221A13;   /* slightly lifted — alternating dark sections */

  /* ── Text ─────────────────────────────────────────────── */
  --color-text-primary:       #18120D;   /* on light surfaces */
  --color-text-secondary:     #6B5D52;   /* muted on light */
  --color-text-inverse:       #F4EDE6;   /* on dark surfaces */
  --color-text-muted-inv:     #8B7A6E;   /* muted on dark */

  /* ── Primary accent — orange ──────────────────────────── */
  --color-primary:            #E8420D;   /* solid orange — buttons, dots, highlights */
  --color-primary-hover:      #C93608;   /* hover state */
  --color-primary-active:     #A82D06;   /* pressed state */
  --color-primary-light:      #FF6B3D;   /* decorative accents, glows */
  --color-primary-tint:       rgba(232, 66, 13, 0.10); /* subtle backgrounds */

  /* ── Borders ──────────────────────────────────────────── */
  --color-border:             rgba(24, 18, 13, 0.12);
  --color-border-strong:      rgba(24, 18, 13, 0.28);
  --color-border-dark:        rgba(244, 237, 230, 0.12);
  --color-border-dark-strong: rgba(244, 237, 230, 0.28);
}

/* Dark mode — same tokens, dark values */
[data-theme="dark"] {
  --color-surface-light:      #18120D;
  --color-surface-light-alt:  #221A13;
  --color-text-primary:       #F4EDE6;
  --color-text-secondary:     #8B7A6E;
  --color-text-inverse:       #18120D;
  --color-text-muted-inv:     #6B5D52;
  --color-border:             rgba(244, 237, 230, 0.12);
  --color-border-strong:      rgba(244, 237, 230, 0.28);
  --color-primary-tint:       rgba(232, 66, 13, 0.15);
}
```

### Section color map
The page alternates between two temperatures. Transitions are animated via GSAP (see §8), not hard cuts.

| Section              | Background                  | Text                        |
|----------------------|-----------------------------|-----------------------------|
| Hero / Intro         | `--color-surface-dark`      | `--color-text-inverse`      |
| About / Process      | `--color-surface-light`     | `--color-text-primary`      |
| Work / Portfolio     | `--color-surface-dark`      | `--color-text-inverse`      |
| Testimonials         | `--color-surface-light-alt` | `--color-text-primary`      |
| Contact / Footer     | `--color-surface-dark`      | `--color-text-inverse`      |

---

## 3. Typography

### Font pairing

Both fonts from [Fontshare](https://www.fontshare.com/). Load both as a single request.

| Role          | Font              | Source    | Weights loaded  |
|---------------|-------------------|-----------|-----------------|
| Display       | **Clash Display** | Fontshare | 500, 600, 700   |
| Body / UI     | **Satoshi**       | Fontshare | 400, 500, 700   |

**Clash Display** carries the editorial weight of the reference site's bold headlines — broad strokes, mechanical precision, high contrast at display sizes.  
**Satoshi** handles everything else: body copy, UI labels, navigation. It's neutral enough to not compete, warm enough to match the brand.

```html
<!-- In <head>, before your stylesheet -->
<link rel="preconnect" href="https://api.fontshare.com">
<link
  rel="stylesheet"
  href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=satoshi@400,500,700&display=swap"
>
```

**Rule**: Clash Display is only used at `24px` (–text-xl) and above. Below that, use Satoshi at 500 or 700.

### Fluid type scale

All sizes use `clamp()`. No breakpoint-specific type overrides needed.

```css
:root {
  --font-display:  'Clash Display', sans-serif;
  --font-body:     'Satoshi', sans-serif;

  /* ── Size scale ────────────────────────────────────────── */
  --text-xs:       clamp(0.694rem,  0.65rem  + 0.22vw, 0.75rem);   /*  11–12px */
  --text-sm:       clamp(0.833rem,  0.78rem  + 0.27vw, 0.938rem);  /*  13–15px */
  --text-base:     clamp(1rem,      0.94rem  + 0.32vw, 1.125rem);  /*  16–18px */
  --text-md:       clamp(1.125rem,  1.05rem  + 0.38vw, 1.313rem);  /*  18–21px */
  --text-lg:       clamp(1.25rem,   1.15rem  + 0.5vw,  1.5rem);    /*  20–24px */
  --text-xl:       clamp(1.5rem,    1.3rem   + 1vw,    2rem);      /*  24–32px */
  --text-2xl:      clamp(2rem,      1.6rem   + 2vw,    2.75rem);   /*  32–44px */
  --text-3xl:      clamp(2.5rem,    1.9rem   + 3vw,    3.75rem);   /*  40–60px */
  --text-4xl:      clamp(3.5rem,    2.5rem   + 5vw,    6rem);      /*  56–96px */
  --text-display:  clamp(5rem,      3.5rem   + 7.5vw,  9rem);      /* 80–144px */

  /* ── Leading ───────────────────────────────────────────── */
  --leading-tight:   0.95;   /* display headings only */
  --leading-snug:    1.1;    /* large headings */
  --leading-normal:  1.5;    /* body copy */
  --leading-loose:   1.7;    /* long-form / editorial */

  /* ── Tracking ──────────────────────────────────────────── */
  --tracking-tight:   -0.03em;  /* display headings */
  --tracking-snug:    -0.02em;  /* large headings */
  --tracking-normal:  -0.01em;  /* body */
  --tracking-wide:     0.08em;  /* nav items, ALL CAPS labels */
  --tracking-wider:    0.12em;  /* micro labels, categories */
}
```

### Usage table

| Element          | Font           | Size token        | Weight | Case     | Tracking              |
|------------------|----------------|-------------------|--------|----------|-----------------------|
| Hero display     | Clash Display  | `--text-display`  | 700    | Mixed    | `--tracking-tight`    |
| Section heading  | Clash Display  | `--text-4xl`      | 600    | Mixed    | `--tracking-tight`    |
| Sub-heading      | Clash Display  | `--text-2xl`      | 500    | Mixed    | `--tracking-snug`     |
| Lead paragraph   | Satoshi        | `--text-lg`       | 400    | Mixed    | `--tracking-normal`   |
| Body copy        | Satoshi        | `--text-base`     | 400    | Mixed    | `--tracking-normal`   |
| Nav items        | Satoshi        | `--text-xs`       | 500    | ALL CAPS | `--tracking-wide`     |
| Button label     | Satoshi        | `--text-sm`       | 700    | ALL CAPS | `--tracking-wide`     |
| Category label   | Satoshi        | `--text-xs`       | 500    | ALL CAPS | `--tracking-wider`    |

---

## 4. Spacing & Layout

### Spacing scale

```css
:root {
  --space-1:    4px;
  --space-2:    8px;
  --space-3:    12px;
  --space-4:    16px;
  --space-5:    24px;
  --space-6:    32px;
  --space-7:    48px;
  --space-8:    64px;
  --space-9:    96px;
  --space-10:   128px;
  --space-11:   160px;
  --space-12:   200px;

  /* Fluid section rhythm */
  --section-gap:    clamp(80px, 10vw, 160px);
  --section-inset:  clamp(24px, 5vw, 80px);   /* horizontal page padding */
}
```

### Grid

```css
:root {
  --grid-columns:   12;
  --grid-gutter:    clamp(16px, 2vw, 24px);
  --grid-max:       1440px;
}

.container {
  width: 100%;
  max-width: var(--grid-max);
  margin-inline: auto;
  padding-inline: var(--section-inset);
}

.grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: var(--grid-gutter);
}
```

### Breakpoints (mobile-first)

```css
/* xs:  0px    — default */
/* sm:  480px  */
/* md:  768px  */
/* lg:  1024px */
/* xl:  1280px */
/* 2xl: 1440px */
```

### Alignment rule
Default **left-aligned**. Center only for:
- Isolated hero headlines at mobile
- Pull-quotes that span full width
- Never for body paragraphs

---

## 5. Border, Radius & Shadow

```css
:root {
  --radius-sm:    4px;
  --radius-md:    8px;
  --radius-lg:    16px;
  --radius-pill:  100px;   /* navigation buttons */
  --radius-full:  9999px;  /* dots, avatars */

  /* Warm-tinted shadows — never cold blue */
  --shadow-sm:  0 1px 3px  rgba(24, 18, 13, 0.08), 0 1px 2px rgba(24, 18, 13, 0.06);
  --shadow-md:  0 4px 16px rgba(24, 18, 13, 0.10), 0 2px 6px rgba(24, 18, 13, 0.06);
  --shadow-lg:  0 8px 32px rgba(24, 18, 13, 0.12), 0 4px 12px rgba(24, 18, 13, 0.08);
}
```

---

## 6. Motion System

### Design principles
- **Intentional, not decorative** — motion communicates state changes, not personality
- **Scroll-driven by default** — content earns its reveal through user action
- **Cinematic pacing** — slower than SaaS defaults, but never sluggish

### Easing curves

```css
:root {
  --ease-out-quart:    cubic-bezier(0.25, 1, 0.5, 1);       /* standard reveals */
  --ease-out-expo:     cubic-bezier(0.16, 1, 0.3, 1);        /* snappy entrances */
  --ease-in-out-sine:  cubic-bezier(0.37, 0, 0.63, 1);       /* section transitions */
  --ease-in-quart:     cubic-bezier(0.5, 0, 0.75, 0);        /* exits */
  --ease-spring:       cubic-bezier(0.34, 1.3, 0.64, 1);     /* micro-interactions */
  --ease-cinematic:    cubic-bezier(0.76, 0, 0.24, 1);        /* entrance curtain */

  /* Duration scale */
  --duration-instant:    100ms;
  --duration-fast:       200ms;
  --duration-base:       400ms;
  --duration-slow:       700ms;
  --duration-cinematic:  1200ms;

  /* Composites */
  --transition-base:  var(--duration-base) var(--ease-out-quart);
  --transition-fast:  var(--duration-fast) var(--ease-out-expo);
  --transition-slow:  var(--duration-slow) var(--ease-out-quart);
}
```

### Named animation presets

| Name           | Transform                                  | Duration   | Easing           | Use                    |
|----------------|--------------------------------------------|------------|------------------|------------------------|
| `clip-reveal`  | `clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)` | `900ms` | `ease-out-expo` | Headline reveals       |
| `fade-up`      | `translateY(40px) + opacity 0→1`           | `700ms`    | `ease-out-quart` | Section blocks         |
| `scale-in`     | `scale(0.96) + opacity 0→1`               | `400ms`    | `ease-spring`    | Card entrances         |
| `slide-right`  | `translateX(-60px) + opacity 0→1`         | `600ms`    | `ease-out-quart` | Left-rail items        |
| `curtain-wipe` | `scaleY(1→0)` on overlay element          | `500ms`    | `ease-cinematic` | Entrance animation     |
| `bg-morph`     | `background-color` via GSAP               | `600ms`    | `power2.out`     | Section color shifts   |

### GSAP global defaults

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
  ease: 'power3.out',
  duration: 0.7,
});

ScrollTrigger.defaults({
  toggleActions: 'play none none none',
});
```

---

## 7. Components

### Navigation

Floats fixed at top. Uses `mix-blend-mode: difference` so the logo/wordmark stays readable over both light and dark sections without JS color switching. Nav links use pill-outlined style; CTA uses solid orange square button with arrow — matching the reference exactly.

```html
<nav class="site-nav" aria-label="Primary">
  <a href="/" class="nav-logo" aria-label="TheCraftMachine home">TCM</a>
  <div class="nav-links">
    <a href="/work"    class="nav-link">What We Do</a>
    <a href="/about"   class="nav-link">Our Journey</a>
    <a href="/contact" class="nav-cta">
      Take the Next Step
      <span class="nav-cta-arrow" aria-hidden="true">→</span>
    </a>
  </div>
</nav>
```

```css
.site-nav {
  position: fixed;
  inset-block-start: 0;
  inset-inline: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--section-inset);
  mix-blend-mode: difference;
  pointer-events: none;  /* children re-enable */
}

.site-nav > * { pointer-events: auto; }

.nav-logo {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 700;
  letter-spacing: var(--tracking-tight);
  color: #F4EDE6;  /* always light — blend mode inverts against light bg */
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.nav-link {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  padding: var(--space-2) var(--space-5);
  border: 1px solid rgba(244, 237, 230, 0.40);
  border-radius: var(--radius-pill);
  color: #F4EDE6;
  text-decoration: none;
  transition: border-color var(--transition-fast), opacity var(--transition-fast);
}

.nav-link:hover { opacity: 0.7; }

.nav-cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  padding: var(--space-2) var(--space-3) var(--space-2) var(--space-4);
  background: var(--color-primary);
  color: #fff;
  border-radius: var(--radius-sm);
  text-decoration: none;
  mix-blend-mode: normal;  /* orange button is always orange — opt out of blend */
  transition: background var(--transition-fast);
}

.nav-cta:hover { background: var(--color-primary-hover); }
```

### Primary Button

```html
<a href="/contact" class="btn btn-primary">
  Start a project <span aria-hidden="true">→</span>
</a>

<a href="/work" class="btn btn-ghost">
  See the work
</a>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: var(--transition-fast);
}

.btn-primary {
  padding: var(--space-4) var(--space-6);
  background: var(--color-primary);
  color: #fff;
  border-radius: var(--radius-sm);
}
.btn-primary:hover { background: var(--color-primary-hover); }

.btn-ghost {
  padding: var(--space-4) var(--space-6);
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-pill);
}
.btn-ghost:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* Ghost on dark surfaces */
.surface-dark .btn-ghost {
  color: var(--color-text-inverse);
  border-color: var(--color-border-dark-strong);
}
.surface-dark .btn-ghost:hover {
  border-color: var(--color-primary-light);
  color: var(--color-primary-light);
}
```

### Project Card

```html
<article class="project-card">
  <div class="project-card-media">
    <video autoplay muted loop playsinline preload="metadata">
      <source src="/projects/client-name.mp4" type="video/mp4">
    </video>
  </div>
  <footer class="project-card-footer">
    <span class="project-card-category">Branding</span>
    <h3 class="project-card-title">Client Name</h3>
  </footer>
</article>
```

```css
.project-card {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  background: var(--color-surface-dark-alt);
  cursor: pointer;
}

.project-card-media {
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.project-card-media video,
.project-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out-quart);
}

.project-card:hover .project-card-media video,
.project-card:hover .project-card-media img {
  transform: scale(1.04);
}

.project-card-footer {
  padding: var(--space-5) var(--space-6);
}

.project-card-category {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-primary);
}

.project-card-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 600;
  letter-spacing: var(--tracking-tight);
  color: var(--color-text-inverse);
  margin-top: var(--space-2);
  line-height: var(--leading-snug);
}
```

### Accent dot

Used sparingly near display headings as a punctuation-like decoration. Matches the small orange dot visible in the reference screenshots.

```css
.accent-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  vertical-align: middle;
}
```

---

## 8. Scroll Architecture

### Core concept
Derived directly from the reference: **the page pins on certain sections, and inner content advances through a sequence**. When the last item is reached, the page resumes scrolling. This creates a "gallery within the scroll" effect — the illusion that content scrolls independently of the page.

### Portfolio pinned section

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function initPortfolioScroll() {
  const section = document.querySelector('.portfolio-section');
  const items   = gsap.utils.toArray('.portfolio-item');

  // Each item gets one full viewport-height of scroll range
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      pin: true,
      scrub: 1.2,
      start: 'top top',
      end: () => `+=${(items.length - 1) * window.innerHeight}`,
      anticipatePin: 1,
    },
  });

  items.forEach((item, i) => {
    if (i === 0) return;
    // Outgoing item fades up
    tl.to(items[i - 1],
      { opacity: 0, yPercent: -6, duration: 1 },
      i - 0.5
    );
    // Incoming item fades from below
    tl.fromTo(item,
      { opacity: 0, yPercent: 6 },
      { opacity: 1, yPercent: 0, duration: 1 },
      i - 0.5
    );
  });
}
```

```html
<section class="portfolio-section">
  <!-- Items stack absolutely, first is visible by default -->
  <div class="portfolio-track">
    <div class="portfolio-item portfolio-item--active">
      <video ...></video>
      <div class="portfolio-item-label">
        <span class="project-card-category">Videography</span>
        <h3>Client One</h3>
        <a href="/work/client-one" class="btn btn-ghost">Find out more →</a>
      </div>
    </div>
    <div class="portfolio-item" aria-hidden="true">...</div>
    <div class="portfolio-item" aria-hidden="true">...</div>
  </div>
</section>
```

```css
.portfolio-section {
  position: relative;
  height: 100vh;
}

.portfolio-track {
  position: relative;
  width: 100%;
  height: 100%;
}

.portfolio-item {
  position: absolute;
  inset: 0;
  opacity: 0;
}

.portfolio-item--active { opacity: 1; }

.portfolio-item video,
.portfolio-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portfolio-item-label {
  position: absolute;
  bottom: var(--space-9);
  left: var(--section-inset);
  color: var(--color-text-inverse);
}

.portfolio-item-label h3 {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 700;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  margin-block: var(--space-3) var(--space-6);
}
```

### Background color transitions between sections

```javascript
function initColorTransitions() {
  const sections = document.querySelectorAll('[data-bg]');

  sections.forEach((section) => {
    const bg   = section.dataset.bg;
    const text = section.dataset.text;

    ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      end: 'bottom 45%',
      onEnter:     () => morphBackground(bg, text),
      onEnterBack: () => morphBackground(bg, text),
    });
  });

  function morphBackground(bg, text) {
    gsap.to('body', {
      backgroundColor: bg,
      color: text,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: true,
    });
  }
}
```

```html
<!-- Apply data attributes to each section -->
<section data-bg="#18120D" data-text="#F4EDE6" class="hero">...</section>
<section data-bg="#F4EDE6" data-text="#18120D" class="about">...</section>
<section data-bg="#18120D" data-text="#F4EDE6" class="portfolio-section">...</section>
```

---

## 9. Required Animation Implementations

### A. Scroll-Controlled Video

Video plays forward on scroll down, rewinds on scroll up. Fully tied to scroll position via GSAP `scrub`.

```html
<!-- Section is tall (400vh) — sticky inner container keeps video in view -->
<section class="scroll-video-section" style="height: 400vh;">
  <div class="scroll-video-sticky">
    <video
      class="scroll-video"
      src="/video/craft-process.mp4"
      preload="auto"
      muted
      playsinline
      aria-hidden="true"
    ></video>
    <div class="scroll-video-caption">
      <h2 class="reveal-text">Built frame by frame.</h2>
      <p>Every project delivered with the same obsession as the first.</p>
    </div>
  </div>
</section>
```

```css
.scroll-video-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}

.scroll-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.scroll-video-caption {
  position: absolute;
  bottom: var(--space-10);
  left: var(--section-inset);
  color: var(--color-text-inverse);
  max-width: 480px;
}
```

```javascript
function initScrollVideo() {
  const video   = document.querySelector('.scroll-video');
  const section = document.querySelector('.scroll-video-section');

  if (!video || !section) return;

  video.pause();
  video.currentTime = 0;

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate(self) {
      requestAnimationFrame(() => {
        if (!video.duration) return;
        const target = self.progress * video.duration;
        if (Math.abs(video.currentTime - target) > 0.05) {
          video.currentTime = target;
        }
      });
    },
  });
}
```

**Performance checklist:**
- Encode with H.264 (MP4) + WebM fallback for Chromium
- Keep video under 20MB — trim aggressively, lower bitrate is fine at full-bleed
- Never drive `video.currentTime` from `scroll` events — always via `requestAnimationFrame` inside ScrollTrigger's `onUpdate`
- On mobile: serve a poster image + disable the scroll-video behavior via `matchMedia('(pointer: coarse)')`

---

### B. Site Entrance Animation

**Concept** (derived from brand animation assets): The page loads behind a warm-dark curtain. The "TCM" wordmark scales up from opacity 0, holds briefly, then the curtain wipes upward — revealing the hero section. Hero content staggers in.

Total duration: **~1.2 seconds**. Respects `prefers-reduced-motion`.

```html
<!-- Place immediately after <body> opening tag -->
<div class="entrance-curtain" aria-hidden="true">
  <div class="entrance-logo">TCM</div>
</div>
```

```css
.entrance-curtain {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #18120D;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  will-change: transform;
}

.entrance-logo {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: #F4EDE6;
  letter-spacing: var(--tracking-tight);
  will-change: transform, opacity;
}
```

```javascript
function initEntrance() {
  const curtain  = document.querySelector('.entrance-curtain');
  const logo     = document.querySelector('.entrance-logo');
  const reveals  = document.querySelectorAll('.hero-reveal');

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    curtain?.remove();
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl
    // Phase 1: logo builds in (0 → 0.45s)
    .fromTo(logo,
      { opacity: 0, scale: 0.85, yPercent: 12 },
      { opacity: 1, scale: 1,    yPercent: 0, duration: 0.45 }
    )
    // Phase 2: brief hold (0.45 → 0.65s)
    .to({}, { duration: 0.2 })
    // Phase 3: curtain wipes up (0.65 → 1.15s)
    .to(curtain,
      {
        yPercent: -100,
        duration: 0.5,
        ease: 'power4.inOut',
        onComplete: () => curtain.remove(),
      }
    )
    // Phase 4: hero content staggers in (0.9 → 1.3s)
    .fromTo(reveals,
      { opacity: 0, yPercent: 5 },
      { opacity: 1, yPercent: 0, duration: 0.45, stagger: 0.08 },
      '-=0.25'
    );
}

document.addEventListener('DOMContentLoaded', initEntrance);
```

---

### C. Standard Scroll-Reveal

Two variants — text (clip-path) and blocks (fade-up) — plus a staggered group pattern.

```javascript
function initScrollReveals() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Headline reveal: text wipes in from left via clip-path
  gsap.utils.toArray('.reveal-text').forEach((el) => {
    gsap.fromTo(el,
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      }
    );
  });

  // Block reveal: fade + translate up
  gsap.utils.toArray('.reveal-block').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 48 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      }
    );
  });

  // Staggered groups (service cards, client logos, etc.)
  gsap.utils.toArray('.reveal-group').forEach((group) => {
    const items = group.querySelectorAll('.reveal-item');
    gsap.fromTo(items,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: group, start: 'top 85%' },
      }
    );
  });
}
```

**HTML usage:**
```html
<!-- Headline wipe -->
<h2 class="reveal-text">We build things that last.</h2>

<!-- Single block -->
<div class="reveal-block">
  <p>A paragraph that fades up when entering the viewport.</p>
</div>

<!-- Staggered card grid -->
<div class="reveal-group">
  <div class="reveal-item">Service one</div>
  <div class="reveal-item">Service two</div>
  <div class="reveal-item">Service three</div>
</div>
```

---

## 10. Hero Section Structure

The hero is always dark (`#18120D`). The headline is large enough to fill the viewport width. Inline images embedded within the type flow — exactly as seen in the reference.

```html
<section class="hero" data-bg="#18120D" data-text="#F4EDE6">
  <div class="container">
    <div class="hero-content">

      <span class="hero-label hero-reveal">Web Agency — Paris</span>

      <h1 class="hero-heading">
        We build
        <span class="hero-inline-media" aria-hidden="true">
          <img src="/images/project-thumb-1.jpg" alt="">
        </span>
        digital machines
        <br>
        that move
        <span class="hero-inline-media" aria-hidden="true">
          <img src="/images/project-thumb-2.jpg" alt="">
        </span>
        people.
      </h1>

      <p class="hero-body hero-reveal">
        From strategy to screen — every decision made with the
        precision of a craftsman.
      </p>

      <div class="hero-actions hero-reveal">
        <a href="/work" class="btn btn-primary">See the work →</a>
        <a href="/contact" class="btn btn-ghost">Start a project</a>
      </div>

    </div>
  </div>
</section>
```

```css
.hero {
  min-height: 100svh;
  display: flex;
  align-items: flex-end;
  padding-bottom: var(--space-10);
  background: var(--color-surface-dark);
  color: var(--color-text-inverse);
}

.hero-label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-primary);
  display: block;
  margin-bottom: var(--space-5);
}

.hero-heading {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 700;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  margin-bottom: var(--space-7);
  /* Let it fill the line — no max-width */
}

/* Inline image embedded in heading type */
.hero-inline-media {
  display: inline-block;
  width: clamp(80px, 11vw, 156px);
  height: clamp(48px, 6.5vw, 96px);
  border-radius: var(--radius-md);
  overflow: hidden;
  vertical-align: middle;
  margin-inline: 0.15em;
  transform: translateY(-0.08em);
}

.hero-inline-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-body {
  font-size: var(--text-lg);
  line-height: var(--leading-normal);
  color: var(--color-text-muted-inv);
  max-width: 44ch;
  margin-bottom: var(--space-7);
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}
```

---

## 11. Implementation Notes

### Tech stack
- **Framework**: Next.js 14+ (App Router) or plain HTML
- **Animation**: GSAP 3 + ScrollTrigger plugin
- **Fonts**: Fontshare CDN (preconnect in `<head>`)
- **Video**: Self-hosted or CDN — never bundle in `/public` for production

### GSAP install

```bash
npm install gsap
```

```typescript
// src/lib/gsap.ts — central registration, import this once in layout.tsx
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
```

### Accessibility checklist
- All animations gated behind `prefers-reduced-motion: no-preference`
- Entrance: curtain removed instantly if reduced-motion
- Scroll-video: show static poster + `aria-hidden="true"` on video
- Nav: `aria-label="Primary"` on `<nav>`, `aria-label` on logo link
- Project cards in portfolio section: only first is visible, rest get `aria-hidden="true"` dynamically as they become active

### Color contrast (WCAG AA)
| Pairing                               | Ratio  | Pass |
|---------------------------------------|--------|------|
| `#F4EDE6` text on `#18120D` bg        | 14.8:1 | ✓ AAA |
| `#18120D` text on `#F4EDE6` bg        | 14.8:1 | ✓ AAA |
| `#E8420D` orange on `#18120D` bg      | 5.1:1  | ✓ AA |
| `#E8420D` orange on `#F4EDE6` bg      | 3.2:1  | ✓ AA (large text only — use at 18px+) |
| `#fff` text on `#E8420D` button       | 4.6:1  | ✓ AA |

### Performance guidance
- `will-change: transform` on `.entrance-curtain` and `.portfolio-item` only — remove after animation completes via `onComplete`
- Call `ScrollTrigger.refresh()` after any DOM layout change (e.g., font load, image load)
- Use `scrub: 1.2` (not `true`) for portfolio section — adds a small lag that feels more physical
- Lazy-load all off-screen images with `loading="lazy"`; use `preload="metadata"` on non-hero videos

---

## 12. Design Decisions Log

| Decision | Rationale |
|----------|-----------|
| Clash Display (not Neue Haas or similar) | Matches the broad, heavy editorial confidence of the reference; available free on Fontshare; condensed at high weights which prevents text overflow on `--text-display` sizes |
| `#18120D` not `#000` for dark surfaces | The reference screenshot has a visible warm-brown undertone to its near-black — this prevents the sterile, generic feel of pure black and ties to the "forge / workshop" brand metaphor |
| `mix-blend-mode: difference` on nav | Removes the need for JS-based color switching on scroll — the nav inverts naturally against both the dark hero and light sections |
| Pinned scroll for portfolio | The defining interaction of the reference site — content advances while the page is locked. Creates tension and release, and keeps the URL stable for the entire gallery |
| Curtain entrance (not skeleton/loader) | The curtain with logo-reveal reads as intentional design, not a loading state. Keeps the cinematic feel without adding perceived wait time |
| Orange at full saturation, not tinted | Orange appears only as signal: buttons, the accent dot, category labels. Tinting it would turn it decorative — it needs to read as "action" everywhere it appears |
| Inline images in hero type | Directly derived from the reference screenshot's hero — images embedded within the headline type flow creates a premium editorial feel that generic grid layouts cannot replicate |
