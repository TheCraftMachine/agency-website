# TheCraftMachine — Architecture

Next.js 16 (App Router) + Tailwind CSS v4 + shadcn/ui (fully restyled).  
This file is the single source of truth for any agent building this project.  
Read it fully before writing a single line of code.

---

## Stack

| Layer         | Choice                  | Reason                                                  |
|---------------|-------------------------|---------------------------------------------------------|
| Framework     | Next.js 15 (App Router) | RSC by default, file-based routing, built-in image/font |
| Styling       | Tailwind CSS v4         | Token-based, co-located classes, no CSS modules needed  |
| Components    | shadcn/ui               | Accessible primitives — **visually overridden entirely** |
| Animation     | GSAP 3 + ScrollTrigger  | Industry standard for scroll-driven, pinned animations  |
| Fonts         | Fontshare CDN           | Clash Display + Satoshi (not next/font — CDN only)      |
| Language      | TypeScript              | Strict mode on                                          |
| Package mgr   | npm                     | Lock file committed                                     |

**shadcn is used for its accessible behavior (Dialog, Sheet, etc.), not its visual style.  
Every component is restyled from scratch using our design tokens.**

---

## Bootstrap commands

Run in order. Do not deviate.

```bash
# 1. Init Next.js project (if not already done)
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# 2. Init shadcn (choose CSS variables style, no default colors)
npx shadcn@latest init
# When prompted:
#   Style: Default
#   Base color: Neutral  (we override everything in globals.css anyway)
#   CSS variables: Yes

# 3. Add shadcn components we actually use
npx shadcn@latest add button card dialog sheet separator

# 4. Install GSAP
npm install gsap
npm install --save-dev @types/gsap

# 5. Install additional utilities
npm install clsx tailwind-merge
```

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              ← Root layout: fonts, body classes, GSAP init, entrance curtain
│   ├── page.tsx                ← Home: assembles all homepage sections in order
│   ├── globals.css             ← ALL design tokens as CSS custom properties + Tailwind theme
│   ├── work/
│   │   ├── page.tsx            ← Work index (grid of all projects)
│   │   └── [slug]/
│   │       └── page.tsx        ← Individual project case study
│   ├── about/
│   │   └── page.tsx            ← Our Journey
│   └── contact/
│       └── page.tsx            ← Contact form + info
│
├── components/
│   ├── layout/
│   │   ├── site-nav.tsx        ← Fixed nav (mix-blend-mode: difference)
│   │   └── site-footer.tsx     ← Footer with nav links + social
│   │
│   ├── sections/               ← One file per homepage section
│   │   ├── hero.tsx            ← Dark section, display headline + inline images
│   │   ├── scroll-video.tsx    ← Scroll-controlled video (400vh section)
│   │   ├── portfolio-reel.tsx  ← Pinned scroll, project sequence
│   │   ├── services.tsx        ← Light section, 3-4 service cards
│   │   ├── about-teaser.tsx    ← Dark section, short brand story
│   │   ├── testimonials.tsx    ← Light-alt section, quote rotation
│   │   └── contact-cta.tsx     ← Dark section, large CTA block
│   │
│   ├── ui/                     ← shadcn primitives — all restyled
│   │   ├── button.tsx          ← btn-primary + btn-ghost variants
│   │   ├── card.tsx            ← Project card anatomy
│   │   ├── dialog.tsx          ← shadcn Dialog (restyled backdrop)
│   │   ├── sheet.tsx           ← Mobile nav drawer
│   │   └── separator.tsx       ← Thin warm-tinted rule
│   │
│   ├── common/
│   │   ├── accent-dot.tsx      ← Small orange dot decoration
│   │   ├── inline-media.tsx    ← Image embedded inside heading type
│   │   ├── project-card.tsx    ← Card used in work grid
│   │   ├── reveal-text.tsx     ← Clip-path reveal wrapper (client)
│   │   └── reveal-block.tsx    ← Fade-up reveal wrapper (client)
│   │
│   └── entrance/
│       └── entrance-curtain.tsx ← Site entrance animation (client, fixed overlay)
│
├── lib/
│   ├── gsap.ts                 ← GSAP registration (ScrollTrigger) — import once
│   ├── utils.ts                ← cn() helper (clsx + tailwind-merge)
│   └── motion.ts               ← Shared animation config constants
│
├── data/
│   ├── projects.ts             ← All project data (typed)
│   └── services.ts             ← Services / offerings data
│
├── hooks/
│   ├── use-reduced-motion.ts   ← Reads prefers-reduced-motion
│   └── use-scroll-video.ts     ← Scroll-to-video-time logic
│
└── types/
    └── index.ts                ← Shared TypeScript types
```

---

## globals.css — the single source of truth for tokens

This file defines all CSS custom properties AND the Tailwind v4 theme extension.  
**Do not hardcode any color, size, or font value elsewhere in the codebase.**

```css
/* src/app/globals.css */
@import "tailwindcss";

/* ─── Fontshare (loaded in layout.tsx <head>) ─────────────────────── */
/* Clash Display: display headings ≥ 24px                              */
/* Satoshi: body, UI, nav                                              */

/* ─── Design tokens ───────────────────────────────────────────────── */
@layer base {
  :root {
    /* Surfaces */
    --surface-light:      #F4EDE6;
    --surface-light-alt:  #EDE5DC;
    --surface-dark:       #18120D;
    --surface-dark-alt:   #221A13;

    /* Text */
    --text-primary:       #18120D;
    --text-secondary:     #6B5D52;
    --text-inverse:       #F4EDE6;
    --text-muted-inv:     #8B7A6E;

    /* Orange accent */
    --primary:            #E8420D;
    --primary-hover:      #C93608;
    --primary-active:     #A82D06;
    --primary-light:      #FF6B3D;
    --primary-tint:       rgba(232, 66, 13, 0.10);

    /* Borders */
    --border:             rgba(24, 18, 13, 0.12);
    --border-strong:      rgba(24, 18, 13, 0.28);
    --border-dark:        rgba(244, 237, 230, 0.12);
    --border-dark-strong: rgba(244, 237, 230, 0.28);

    /* Typography */
    --font-display: 'Clash Display', sans-serif;
    --font-body:    'Satoshi', sans-serif;

    /* Fluid type scale */
    --text-xs:       clamp(0.694rem,  0.65rem  + 0.22vw, 0.75rem);
    --text-sm:       clamp(0.833rem,  0.78rem  + 0.27vw, 0.938rem);
    --text-base:     clamp(1rem,      0.94rem  + 0.32vw, 1.125rem);
    --text-md:       clamp(1.125rem,  1.05rem  + 0.38vw, 1.313rem);
    --text-lg:       clamp(1.25rem,   1.15rem  + 0.5vw,  1.5rem);
    --text-xl:       clamp(1.5rem,    1.3rem   + 1vw,    2rem);
    --text-2xl:      clamp(2rem,      1.6rem   + 2vw,    2.75rem);
    --text-3xl:      clamp(2.5rem,    1.9rem   + 3vw,    3.75rem);
    --text-4xl:      clamp(3.5rem,    2.5rem   + 5vw,    6rem);
    --text-display:  clamp(5rem,      3.5rem   + 7.5vw,  9rem);

    /* Spacing */
    --space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
    --space-5: 24px;  --space-6: 32px;  --space-7: 48px;  --space-8: 64px;
    --space-9: 96px;  --space-10: 128px; --space-11: 160px; --space-12: 200px;

    --section-gap:   clamp(80px, 10vw, 160px);
    --section-inset: clamp(24px, 5vw, 80px);
    --grid-max:      1440px;
    --grid-gutter:   clamp(16px, 2vw, 24px);

    /* Radius */
    --radius-sm:   4px;
    --radius-md:   8px;
    --radius-lg:   16px;
    --radius-pill: 100px;

    /* Easing */
    --ease-out-quart:  cubic-bezier(0.25, 1, 0.5, 1);
    --ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
    --ease-spring:     cubic-bezier(0.34, 1.3, 0.64, 1);
    --ease-cinematic:  cubic-bezier(0.76, 0, 0.24, 1);

    /* Duration */
    --dur-fast:      200ms;
    --dur-base:      400ms;
    --dur-slow:      700ms;
    --dur-cinematic: 1200ms;

    /* shadcn required vars — mapped to our tokens */
    --background:   var(--surface-light);
    --foreground:   var(--text-primary);
    --card:         var(--surface-light-alt);
    --card-foreground: var(--text-primary);
    --primary-shadcn: var(--primary);
    --primary-foreground: #fff;
    --border-shadcn: var(--border);
    --ring:         var(--primary);
    --radius:       var(--radius-md);
  }

  [data-theme="dark"] {
    --surface-light:     #18120D;
    --surface-light-alt: #221A13;
    --text-primary:      #F4EDE6;
    --text-secondary:    #8B7A6E;
    --border:            rgba(244, 237, 230, 0.12);
    --border-strong:     rgba(244, 237, 230, 0.28);
    --background:        var(--surface-dark);
    --foreground:        var(--text-inverse);
  }
}

/* ─── Base resets ─────────────────────────────────────────────────── */
@layer base {
  *, *::before, *::after { box-sizing: border-box; }

  html {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--text-primary);
    background: var(--surface-dark);   /* page starts dark (hero is dark) */
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  h1, h2, h3, h4 {
    font-family: var(--font-display);
    font-weight: 700;
    line-height: 0.95;
    letter-spacing: -0.03em;
  }

  p { line-height: 1.5; }

  a { color: inherit; text-decoration: none; }

  img, video { display: block; max-width: 100%; }
}

/* ─── Tailwind v4 theme extension ─────────────────────────────────── */
@theme {
  --color-surface-light:     var(--surface-light);
  --color-surface-light-alt: var(--surface-light-alt);
  --color-surface-dark:      var(--surface-dark);
  --color-surface-dark-alt:  var(--surface-dark-alt);
  --color-primary:           var(--primary);
  --color-primary-hover:     var(--primary-hover);
  --color-text-primary:      var(--text-primary);
  --color-text-inverse:      var(--text-inverse);
  --color-text-secondary:    var(--text-secondary);
  --color-text-muted-inv:    var(--text-muted-inv);

  --font-display: var(--font-display);
  --font-body:    var(--font-body);

  --spacing-section: var(--section-gap);
  --spacing-inset:   var(--section-inset);

  --radius-sm:   var(--radius-sm);
  --radius-md:   var(--radius-md);
  --radius-lg:   var(--radius-lg);
  --radius-pill: var(--radius-pill);
}
```

---

## layout.tsx

Root layout loads fonts, places the entrance curtain, and registers GSAP.

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { SiteNav }          from '@/components/layout/site-nav';
import { SiteFooter }       from '@/components/layout/site-footer';
import { EntranceCurtain }  from '@/components/entrance/entrance-curtain';

export const metadata: Metadata = {
  title:       'TheCraftMachine — Web Agency',
  description: 'We build digital machines that move people.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body>
        <EntranceCurtain />
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
```

---

## Routing map

| Route           | File                         | Section breakdown                                              |
|-----------------|------------------------------|----------------------------------------------------------------|
| `/`             | `app/page.tsx`               | Hero → ScrollVideo → PortfolioReel → Services → AboutTeaser → Testimonials → ContactCTA |
| `/work`         | `app/work/page.tsx`          | Grid of all projects with filters                             |
| `/work/[slug]`  | `app/work/[slug]/page.tsx`   | Case study: hero → challenge → process → result → next project |
| `/about`        | `app/about/page.tsx`         | Brand story, team, values, timeline                           |
| `/contact`      | `app/contact/page.tsx`       | Form + direct info                                            |

---

## Data models

```typescript
// src/types/index.ts

export type Project = {
  slug:        string;
  title:       string;
  category:    string;           // "Branding" | "Web" | "Videography" | ...
  client:      string;
  year:        number;
  cover:       string;           // path to /public/projects/{slug}/cover.jpg
  video?:      string;           // path to /public/projects/{slug}/reel.mp4
  summary:     string;           // 1–2 sentences for card
  description: string;           // full case study body (MDX or plain string)
  tags:        string[];
  featured:    boolean;          // appears in portfolio reel on homepage
};

export type Service = {
  id:          string;
  title:       string;
  description: string;
};

export type Testimonial = {
  quote:       string;
  author:      string;
  role:        string;
  company:     string;
};
```

```typescript
// src/data/projects.ts
import type { Project } from '@/types';

export const projects: Project[] = [
  {
    slug:      'client-one',
    title:     'Client One',
    category:  'Branding',
    client:    'Studio XYZ',
    year:      2024,
    cover:     '/projects/client-one/cover.jpg',
    video:     '/projects/client-one/reel.mp4',
    summary:   'Brand identity for a Paris-based architecture studio.',
    description: '...',
    tags:      ['branding', 'identity'],
    featured:  true,
  },
  // ...
];

export const featuredProjects = projects.filter(p => p.featured);
```

---

## Component rules

### General
- **Server Components by default.** Only add `'use client'` when the component uses:
  - `useEffect`, `useState`, `useRef`
  - GSAP animations
  - Browser APIs (`window`, `document`)
- **No inline styles** except for dynamic values that cannot be expressed in Tailwind (e.g., `style={{ height: `${n * 100}vh` }}`).
- **`cn()` for all className merging.** Never string-concatenate classes.

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge }               from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Animation components (client)
All GSAP code lives in `'use client'` components only.  
Import GSAP from `@/lib/gsap.ts`, never directly from the `gsap` package in page files.

```typescript
// src/lib/gsap.ts
'use client';
import gsap                from 'gsap';
import { ScrollTrigger }   from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power3.out', duration: 0.7 });
}

export { gsap, ScrollTrigger };
```

```typescript
// src/hooks/use-reduced-motion.ts
'use client';
import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}
```

---

## shadcn components — override map

shadcn generates components in `src/components/ui/`.  
**After install, restyle each file to match our tokens. Never leave shadcn defaults.**

| Component    | What to override                                                                 |
|--------------|----------------------------------------------------------------------------------|
| `button.tsx` | Remove all variant color defaults. Add `primary` (orange, square radius) and `ghost` (pill, outlined) only. Remove `destructive`, `secondary`, `link` variants. |
| `card.tsx`   | Background → `--surface-dark-alt`. Remove default border. Apply `--radius-md`. |
| `dialog.tsx` | Backdrop → `rgba(24,18,13,0.7)` (warm dark). Content panel → `--surface-light`. Remove shadcn animation, add custom GSAP entrance via `onOpenChange`. |
| `sheet.tsx`  | Used for mobile nav. Background → `--surface-dark`. Width: `80vw` max `320px`. |
| `separator.tsx` | Color → `var(--border)`. No radius. Height `1px`.                           |

### Button component target output

```tsx
// src/components/ui/button.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base: shared across all variants
  'inline-flex items-center justify-center gap-3 font-body text-sm font-bold uppercase tracking-[0.08em] cursor-pointer transition-colors duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--primary] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        primary: 'bg-[--primary] text-white rounded-[--radius-sm] hover:bg-[--primary-hover] active:bg-[--primary-active]',
        ghost:   'bg-transparent text-[--text-primary] border border-[--border-strong] rounded-[--radius-pill] hover:border-[--primary] hover:text-[--primary]',
        'ghost-inv': 'bg-transparent text-[--text-inverse] border border-[--border-dark-strong] rounded-[--radius-pill] hover:border-[--primary-light] hover:text-[--primary-light]',
      },
      size: {
        default: 'px-6 py-4',
        sm:      'px-4 py-3 text-xs',
        icon:    'w-10 h-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size:    'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

---

## Section anatomy

### Homepage section order
```
1. <Hero />             dark   — display headline, inline images, CTA
2. <ScrollVideo />      dark   — scroll-controlled video (400vh)
3. <PortfolioReel />    dark   — pinned scroll, featured projects
4. <Services />         light  — 3–4 service cards, left-aligned
5. <AboutTeaser />      dark   — short brand story block
6. <Testimonials />     light-alt — rotating quote
7. <ContactCTA />       dark   — large heading + CTA button
```

Each section that changes background must have `data-bg` and `data-text` attributes.  
The GSAP color-morph system (defined in `lib/motion.ts`) reads these on mount.

### Section template
```tsx
// Every section follows this shell:
export function SectionName() {
  return (
    <section
      data-bg="var(--surface-dark)"
      data-text="var(--text-inverse)"
      className="relative"
    >
      <div className="container mx-auto max-w-[--grid-max] px-[--section-inset] py-[--section-gap]">
        {/* content */}
      </div>
    </section>
  );
}
```

### Navigation structure
```
Fixed top / mix-blend-mode: difference
Left:  TCM wordmark (Clash Display, 700)
Right: [WHAT WE DO] [OUR JOURNEY] [TAKE THE NEXT STEP →]
         pill ghost    pill ghost    solid orange square
Mobile: Hamburger → Sheet (shadcn) from right, full-height dark panel
```

---

## GSAP initialization pattern

All GSAP calls happen in `useEffect` inside client components.  
Always clean up via the returned function.

```tsx
'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function SomeAnimatedSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // All GSAP selectors are scoped to ref.current
      gsap.from('.reveal-target', {
        opacity: 0,
        y: 48,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
        },
      });
    }, ref);

    return () => ctx.revert();   // cleanup on unmount
  }, []);

  return <section ref={ref}>...</section>;
}
```

**Never** call `ScrollTrigger.create()` outside a `gsap.context()`.  
Always `ctx.revert()` on unmount to avoid ScrollTrigger leaks.

---

## Color morphing between sections

Initialized once at the root level in `app/page.tsx` via a client wrapper.

```typescript
// src/lib/motion.ts
export const SECTION_BG_TRIGGER = {
  start: 'top 55%',
  end:   'bottom 45%',
} as const;
```

```tsx
// src/components/common/color-morph-watcher.tsx
'use client';
import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function ColorMorphWatcher() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-bg]');

    sections.forEach((section) => {
      const bg   = section.dataset.bg!;
      const text = section.dataset.text!;

      ScrollTrigger.create({
        trigger: section,
        start: 'top 55%',
        end:   'bottom 45%',
        onEnter:     () => morph(bg, text),
        onEnterBack: () => morph(bg, text),
      });
    });

    function morph(bg: string, text: string) {
      gsap.to('body', { backgroundColor: bg, color: text, duration: 0.6, ease: 'power2.out', overwrite: true });
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return null;
}
```

Place `<ColorMorphWatcher />` at the bottom of `app/page.tsx`.

---

## Entrance animation

```tsx
// src/components/entrance/entrance-curtain.tsx
'use client';
import { useEffect, useRef } from 'react';
import { useReducedMotion }  from '@/hooks/use-reduced-motion';
import { gsap }              from '@/lib/gsap';

export function EntranceCurtain() {
  const curtain = useRef<HTMLDivElement>(null);
  const logo    = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !curtain.current || !logo.current) {
      curtain.current?.remove();
      return;
    }

    const heroReveals = document.querySelectorAll('.hero-reveal');
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(logo.current,
        { opacity: 0, scale: 0.85, yPercent: 12 },
        { opacity: 1, scale: 1,    yPercent: 0, duration: 0.45 }
      )
      .to({}, { duration: 0.2 })
      .to(curtain.current,
        { yPercent: -100, duration: 0.5, ease: 'power4.inOut', onComplete: () => curtain.current?.remove() }
      )
      .fromTo(heroReveals,
        { opacity: 0, yPercent: 5 },
        { opacity: 1, yPercent: 0, duration: 0.45, stagger: 0.08 },
        '-=0.25'
      );
  }, [reduced]);

  return (
    <div
      ref={curtain}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#18120D',
               display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
    >
      <div
        ref={logo}
        style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)',
                 fontWeight: 700, color: '#F4EDE6', letterSpacing: '-0.03em' }}
      >
        TCM
      </div>
    </div>
  );
}
```

---

## Scroll-reveal wrappers

These are thin client wrappers — they accept children and animate them on scroll.  
Use them throughout sections by wrapping elements, not by adding classes directly.

```tsx
// src/components/common/reveal-text.tsx
'use client';
import { useEffect, useRef } from 'react';
import { useReducedMotion }  from '@/hooks/use-reduced-motion';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { cn }                from '@/lib/utils';

export function RevealText({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref     = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)',   opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%' } }
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return <div ref={ref} className={cn('overflow-hidden', className)}>{children}</div>;
}
```

```tsx
// src/components/common/reveal-block.tsx
'use client';
import { useEffect, useRef } from 'react';
import { useReducedMotion }  from '@/hooks/use-reduced-motion';
import { gsap }              from '@/lib/gsap';
import { cn }                from '@/lib/utils';

export function RevealBlock({ children, className, delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref     = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 0.7, delay,
          scrollTrigger: { trigger: ref.current, start: 'top 88%' } }
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced, delay]);

  return <div ref={ref} className={cn(className)}>{children}</div>;
}
```

---

## Tailwind usage rules

1. Use CSS variable references in brackets for design tokens: `bg-[--surface-dark]`, `text-[--primary]`
2. Never write raw hex values in class names — always reference a CSS variable
3. Font families: `font-[--font-display]` and `font-[--font-body]`
4. Fluid type: applied via `text-[length:--text-4xl]` or just inline `style={{ fontSize: 'var(--text-display)' }}` for display sizes
5. Use `px-[--section-inset]` and `py-[--section-gap]` for section rhythm
6. Do not use Tailwind color palette (`bg-orange-500`, `text-gray-900`) — only our tokens

---

## Image & video conventions

```
/public/
  projects/
    {slug}/
      cover.jpg          ← 1600×1200px, compressed (< 200KB)
      reel.mp4           ← H.264, 1920×1080, < 20MB
      reel.webm          ← WebM fallback
      thumb.jpg          ← 800×600px, for cards
  images/
    hero-thumb-1.jpg     ← Inline hero images (≈ 400×300px)
    hero-thumb-2.jpg
  video/
    scroll-hero.mp4      ← Scroll-controlled video section
    scroll-hero.webm
```

All `<Image>` components use Next.js `next/image` with explicit `width`/`height` or `fill`.  
Videos use native `<video>` with `muted`, `playsinline`, `preload="metadata"` (or `"auto"` for scroll-video).

---

## Environment variables

```bash
# .env.local — none required for MVP
# If a contact form is added later:
# RESEND_API_KEY=
# CONTACT_EMAIL=
```

---

## What NOT to build

- No dark mode toggle UI (sections handle their own light/dark)
- No page transitions via Next.js router (sections animate themselves)
- No animation library other than GSAP (no Framer Motion, no AOS)
- No component library UI other than shadcn (no Radix standalone, no Headless UI)
- No CSS Modules (globals.css + Tailwind is sufficient)
- No Redux or Zustand (no shared state needed)
- No CMS for MVP (static data files in `/data/`)

---

## Build checklist (for the implementing agent)

Complete these in order. Do not skip ahead.

- [ ] Bootstrap (create-next-app, shadcn init, npm installs)
- [ ] `globals.css` — all tokens, Tailwind theme extension, base resets
- [ ] `src/lib/` — `gsap.ts`, `utils.ts`, `motion.ts`
- [ ] `src/types/index.ts` + `src/data/projects.ts` + `src/data/services.ts`
- [ ] `src/hooks/` — `use-reduced-motion.ts`, `use-scroll-video.ts`
- [ ] Restyle shadcn components: `button.tsx`, `card.tsx`, `dialog.tsx`, `sheet.tsx`, `separator.tsx`
- [ ] `entrance-curtain.tsx`
- [ ] `site-nav.tsx` (fixed, blend-mode, pill links, orange CTA)
- [ ] `site-footer.tsx`
- [ ] `reveal-text.tsx` + `reveal-block.tsx` + `accent-dot.tsx` + `inline-media.tsx`
- [ ] `hero.tsx` section
- [ ] `scroll-video.tsx` section
- [ ] `portfolio-reel.tsx` section (pinned scroll)
- [ ] `services.tsx` section
- [ ] `about-teaser.tsx` section
- [ ] `testimonials.tsx` section
- [ ] `contact-cta.tsx` section
- [ ] `app/page.tsx` — assemble all sections + `<ColorMorphWatcher />`
- [ ] `app/work/page.tsx` — project grid
- [ ] `app/work/[slug]/page.tsx` — case study template
- [ ] `app/about/page.tsx`
- [ ] `app/contact/page.tsx`
- [ ] Verify: all animations check `useReducedMotion()`
- [ ] Verify: no hardcoded hex values outside `globals.css`
- [ ] Verify: every GSAP `context()` has a `revert()` cleanup
- [ ] Verify: `npm run build` passes with zero TypeScript errors
