# The Craft Machine — Portfolio Site

## Références design & architecture

Lire ces deux fichiers **en entier** avant toute tâche :

| Fichier | Contenu |
|---|---|
| `@docs/design-system.md` | Tokens, composants, animations, motion — source unique de vérité |
| `@docs/architecture.md` | Stack, structure des fichiers, conventions |

---

## Règles absolues

- **Jamais** de valeur design codée en dur — tout vient des tokens CSS dans `globals.css`
- **Jamais** d'autre librairie d'animation que GSAP (pas de Framer Motion, AOS, etc.)
- **Toujours** vérifier `useReducedMotion()` avant d'initier une animation GSAP
- **Toujours** `ctx.revert()` dans le cleanup de chaque `useEffect` GSAP
- Les `data-bg` doivent contenir des **valeurs hex résolues** — GSAP ne peut pas animer vers `var(--surface-dark)`
- Composants Server par défaut — `'use client'` uniquement si `useEffect`, `useState`, `useRef`, GSAP, ou APIs browser
- Importer GSAP **toujours** depuis `@/lib/gsap`, jamais directement depuis le package `gsap`

---

## Stack

| Couche | Choix | Version |
|---|---|---|
| Framework | Next.js App Router | 16.2.4 |
| React | React | 19.x |
| Styling | Tailwind CSS | v4 (config dans CSS, pas de `tailwind.config.ts`) |
| Animation | GSAP + ScrollTrigger | 3.x |
| Fonts | Fontshare CDN (pas next/font) | Clash Display + Satoshi |
| Language | TypeScript strict | 5.x |

**Packages installés :** `gsap`, `clsx`, `tailwind-merge`, `class-variance-authority`, `@radix-ui/react-dialog`, `@radix-ui/react-separator`, `lucide-react`

Commandes : `npm run dev` · `npm run build` · `npx tsc --noEmit`

---

## Structure du site

```
/              → Hero + PortfolioReel + Services + AboutTeaser + Testimonials + ContactCTA
/work          → Grille de tous les projets (6 projets)
/work/[slug]   → Case study individuel — 6 paths SSG via generateStaticParams
/about         → Histoire de l'agence + valeurs
/contact       → Formulaire de contact (état local uniquement, pas d'API)
/#testimonials → Ancre sur la homepage
```

---

## Architecture des fichiers — état complet

```
src/
├── app/
│   ├── globals.css              ← TOUS les tokens CSS + @theme Tailwind v4
│   ├── layout.tsx               ← Root layout : Fontshare, EntranceCurtain, SiteNav, SiteFooter
│   ├── page.tsx                 ← Homepage : 6 sections + ColorMorphWatcher (ScrollVideo commenté)
│   ├── about/page.tsx           ← Server component, multi-sections + ColorMorphWatcher
│   ├── contact/page.tsx         ← CLIENT component ('use client'), formulaire fictif
│   └── work/
│       ├── page.tsx             ← Grille projets (server)
│       └── [slug]/page.tsx      ← Case study (server, async params)
│
├── components/
│   ├── entrance/
│   │   └── entrance-curtain.tsx ← Rideau d'entrée (client)
│   ├── layout/
│   │   ├── site-nav.tsx         ← Nav fixe blend-mode (client, useState pour mobile)
│   │   └── site-footer.tsx      ← Footer (server)
│   ├── sections/                ← Une section = un fichier
│   │   ├── hero.tsx             ← Server — fond BEIGE (#F4EDE6), texte sombre
│   │   ├── scroll-video.tsx     ← Client (GSAP + useScrollVideo hook) — NON UTILISÉ (commenté dans page.tsx)
│   │   ├── portfolio-reel.tsx   ← Client — card statique, affiche featuredProjects[0]
│   │   ├── services.tsx         ← Server (RevealText/RevealBlock sont clients)
│   │   ├── about-teaser.tsx     ← Server
│   │   ├── testimonials.tsx     ← Client (useState pour rotation)
│   │   └── contact-cta.tsx      ← Server
│   ├── common/
│   │   ├── accent-dot.tsx       ← Server, props: className + style
│   │   ├── color-morph-watcher.tsx ← Client invisible, anime body.backgroundColor
│   │   ├── inline-media.tsx     ← Server — CRÉÉ MAIS NON UTILISÉ (voir note hero)
│   │   ├── project-card.tsx     ← Server, lien vers /work/[slug]
│   │   ├── reveal-block.tsx     ← Client, fade-up GSAP sur scroll
│   │   └── reveal-text.tsx      ← Client, clip-path reveal GSAP sur scroll
│   └── ui/
│       ├── button.tsx           ← CRÉÉ MAIS NON UTILISÉ (voir note boutons)
│       └── separator.tsx        ← Utilisé dans Services + SiteFooter
│
├── data/
│   ├── projects.ts              ← 6 projets + export featuredProjects (3 featured)
│   └── services.ts              ← 4 services ET 3 testimonials (dans le même fichier)
│
├── hooks/
│   ├── use-reduced-motion.ts    ← Lit prefers-reduced-motion
│   └── use-scroll-video.ts      ← ScrollTrigger scrub sur video.currentTime
│
├── lib/
│   ├── gsap.ts                  ← Registration GSAP + ScrollTrigger + defaults
│   ├── motion.ts                ← CRÉÉ MAIS NON UTILISÉ en pratique (voir note)
│   └── utils.ts                 ← cn() helper
│
└── types/
    └── index.ts                 ← Project, Service, Testimonial
```

---

## Détails d'implémentation critiques

### Couplage EntranceCurtain ↔ Hero : classe `.hero-reveal`

`EntranceCurtain` recherche les éléments `.hero-reveal` dans le DOM via `document.querySelectorAll('.hero-reveal')` et les anime (opacity 0→1, yPercent 5→0) après le wipe du rideau.

Dans `hero.tsx`, 4 éléments portent cette classe :
- Le label "Web Agency — Paris" (`<span>`)
- Le `<h1>` (titre display)
- Le `<p>` (accroche)
- Le `<div>` des boutons CTA

**Règle** : tout élément above-the-fold qui doit apparaître dans l'animation d'entrée doit avoir `className="hero-reveal"`. Ne pas utiliser cette classe sur des éléments hors du héro.

### Couplage PortfolioReel ↔ classe `.portfolio-item`

Le useEffect de `portfolio-reel.tsx` sélectionne les items via :
```js
gsap.utils.toArray('.portfolio-item', section)
```
Chaque `PortfolioItem` rend un `<div className="portfolio-item">`. Si tu renommes cette classe, le pinned scroll ne fonctionnera plus.

### Hero : `100svh`, pas `100vh`

Le héro utilise `minHeight: '100svh'` (small viewport height). Sur mobile, `svh` exclut la barre d'adresse du navigateur — `100vh` aurait causé un débordement. Ne pas changer en `100vh`.

### Images inline dans le héro : implémentation directe

Le fichier `src/components/common/inline-media.tsx` existe mais **n'est pas utilisé dans le héro**. Les deux images inline (`/images/hero-thumb-1.jpg` et `/images/hero-thumb-2.jpg`) sont implémentées directement dans `hero.tsx` avec des `<span style={{ position: 'relative', ... }}><Image fill /></span>`. Pour modifier ces images inline, éditer `hero.tsx` directement.

### Boutons : inline styles, pas le composant `Button`

Le composant `src/components/ui/button.tsx` existe mais **n'est utilisé nulle part**. Tous les boutons du site sont des `<Link>` ou `<button>` avec des inline styles. Si tu veux utiliser le composant Button, il faudra remplacer les implémentations inline. Il a 3 variants : `primary`, `ghost`, `ghost-inv`.

### `motion.ts` : non utilisé en pratique

`src/lib/motion.ts` exporte `SECTION_BG_TRIGGER` mais `color-morph-watcher.tsx` hardcode ses propres valeurs (`'top 55%'`, `'bottom 45%'`) directement. Le fichier existe mais n'est pas importé.

### `testimonials` dans `services.ts`

Les données testimonials sont exportées depuis `src/data/services.ts`, pas depuis un fichier séparé. Toujours importer depuis :
```ts
import { testimonials } from '@/data/services';
```

### Formulaire contact : entièrement fictif

`app/contact/page.tsx` simule une soumission avec `setTimeout(800ms)` puis affiche "Message received." Il n'y a aucun appel API. Pour brancher Resend ou autre : ajouter un `RESEND_API_KEY` dans `.env.local`, créer `app/api/contact/route.ts`, et remplacer le `handleSubmit`.

### Mobile nav : pas de lock du scroll body

Le menu mobile (overlay dans `site-nav.tsx`) s'ouvre en `position: fixed, inset: 0, zIndex: 200` mais ne met pas `document.body.style.overflow = 'hidden'`. Le contenu derrière scrolle quand le menu est ouvert. C'est un bug connu à corriger si nécessaire.

### Nav : mécanique blend-mode

La `<nav>` a `mixBlendMode: 'difference'` et `pointerEvents: 'none'`. Les enfants directs re-activent les events avec `pointerEvents: 'auto'`. Le logo et les liens pill sont en `color: '#F4EDE6'` fixe — le blend mode les inverse automatiquement sur les sections claires (blanc devient noir). Le bouton CTA orange a `mixBlendMode: 'normal'` pour ne **pas** être affecté par le blend.

### PortfolioReel : vidéo vs image

Chaque `PortfolioItem` rend une `<video autoPlay muted loop>` si `project.video` est défini, sinon une `<Image fill>`. Les 3 projets featured (`maison-verdier`, `atelier-brun`, `collectif-nord`) ont tous un champ `video: '/projects/{slug}/reel.mp4'` défini. Comme ces fichiers n'existent pas encore, les videos affichent rien (pas d'erreur). Déposer les .mp4 pour qu'elles apparaissent.

### ScrollVideo : garde mobile

`use-scroll-video.ts` vérifie `window.matchMedia('(pointer: coarse)').matches` et skip l'initialisation ScrollTrigger sur mobile. La vidéo reste statique (bloquée à `currentTime = 0`) sur les écrans tactiles. La section fait quand même 400vh — à considérer si l'expérience mobile est prioritaire.

### `app/about/page.tsx` : double ColorMorphWatcher

La page About a plusieurs sections dark/light. Elle inclut `<ColorMorphWatcher />` à la fin, comme la homepage. Sans ça, les transitions de couleur de fond n'auraient pas lieu. Toute nouvelle page multi-sections doit faire pareil.

### Case study : params async (Next.js 15+)

```ts
interface Props {
  params: Promise<{ slug: string }>;
}
export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;  // ← obligatoire en Next.js 15+
```

C'est le nouveau pattern Next.js 15+ où `params` est une Promise. Ne pas revenir à l'ancien pattern synchrone.

### Case study : `nextProject` cyclique

```ts
const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
```
Le dernier projet pointe vers le premier. L'ordre suit l'ordre du tableau `projects` dans `data/projects.ts`.

---

## Données : contenu actuel (tout fictif)

### Projets (`src/data/projects.ts`)

| Slug | Titre | Catégorie | Année | Featured |
|---|---|---|---|---|
| `maison-verdier` | Maison Verdier | Web Design | 2024 | ✅ (PortfolioReel) |
| `atelier-brun` | Atelier Brun | Branding | 2024 | ✅ (PortfolioReel) |
| `collectif-nord` | Collectif Nord | Videography | 2023 | ✅ (PortfolioReel) |
| `studio-leo` | Studio Léo | Web Design | 2023 | — |
| `brasserie-cent` | Brasserie Cent | Branding | 2023 | — |
| `fondation-maret` | Fondation Maret | Web Design | 2022 | — |

Pour changer quels projets apparaissent dans le reel : modifier `featured: true/false`. L'ordre dans le reel = ordre dans le tableau.

### Services (`src/data/services.ts`)

4 services : Web Design & Build · Brand Identity · Film & Motion · Digital Strategy

3 testimonials : Sophie Verdier (Maison Verdier) · Marc Brun (Atelier Brun) · Isabelle Morel (Collectif Nord)

---

## Assets — état actuel

### Images en place (placeholders PNG monochromes)

```
public/images/hero-thumb-1.jpg    ← 400×300, placeholder sombre
public/images/hero-thumb-2.jpg    ← 400×300, placeholder sombre
public/projects/maison-verdier/cover.jpg
public/projects/atelier-brun/cover.jpg
public/projects/collectif-nord/cover.jpg
public/projects/studio-leo/cover.jpg
public/projects/brasserie-cent/cover.jpg
public/projects/fondation-maret/cover.jpg
```

### Vidéos manquantes (section vide en l'état)

```
public/video/scroll-hero.mp4          ← Section ScrollVideo (400vh)
public/video/scroll-hero.webm         ← Fallback WebM
public/video/scroll-hero-poster.jpg   ← Poster sur mobile (référencé dans scroll-video.tsx)
public/projects/maison-verdier/reel.mp4
public/projects/atelier-brun/reel.mp4
public/projects/collectif-nord/reel.mp4
```

Encoder en H.264, < 20MB par vidéo. La section ScrollVideo ne se casse pas si le fichier est absent — elle affiche juste un fond noir.

---

## Conventions de code

### Tokens dans Tailwind v4

```tsx
// ✅ CSS variable en bracket
className="bg-[--surface-dark] text-[--primary]"
className="text-[length:--text-xl]"   // pour les tailles fluides
className="hover:bg-[--primary-hover]"

// ✅ Inline style pour les valeurs complexes
style={{ fontSize: 'var(--text-display)', lineHeight: 'var(--leading-tight)' }}

// ❌ Jamais de palette Tailwind brute
className="bg-orange-500 text-gray-900"
// ❌ Jamais de hex codé en dur (sauf les 3 exceptions documentées plus haut)
style={{ color: '#E8420D' }}
```

### Carte couleur des sections (`data-bg` en hex résolu)

| Section | `data-bg` | `data-text` |
|---|---|---|
| Hero, PortfolioReel | `#F4EDE6` | `#18120D` |
| ScrollVideo (désactivé), AboutTeaser, ContactCTA, Footer | `#18120D` | `#F4EDE6` |
| Services | `#F4EDE6` | `#18120D` |
| Testimonials | `#EDE5DC` | `#18120D` |

### Pattern GSAP standard

```tsx
'use client';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { gsap, ScrollTrigger } from '@/lib/gsap';  // ← TOUJOURS depuis @/lib/gsap

export function MySection() {
  const ref     = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();       // ← TOUJOURS

  useEffect(() => {
    if (reduced || !ref.current) return;   // ← guard obligatoire
    const ctx = gsap.context(() => {
      // tout le code GSAP ici, sélecteurs scoped à ref
    }, ref);
    return () => ctx.revert();             // ← cleanup obligatoire
  }, [reduced]);

  return <section ref={ref}>...</section>;
}
```

### Ajouter un nouveau projet

1. Ajouter une entrée dans `src/data/projects.ts`
2. Créer `public/projects/{slug}/cover.jpg` (1600×1200, < 200KB)
3. Optionnel : `public/projects/{slug}/reel.mp4` pour la vidéo autoplay
4. `featured: true` pour qu'il apparaisse dans le PortfolioReel (max 3-4 recommandé)
5. `generateStaticParams` en génère automatiquement le path SSG

---

## Ce qui reste à faire

### Bloquant (site non présentable sans ça)

- [ ] **Vraies images** — remplacer les placeholders dans `public/projects/*/cover.jpg` et `public/images/hero-thumb-{1,2}.jpg`
- [ ] **Vidéo ScrollVideo** — déposer `public/video/scroll-hero.mp4` (+ `.webm` + `-poster.jpg`) — section commentée pour l'instant
- [ ] **Vrai contenu** — remplacer les textes fictifs dans `data/projects.ts`, `data/services.ts`, et les copies hardcodées dans les sections (ex. "Web Agency — Paris", "From strategy to screen…", les valeurs dans contact/page.tsx)

### Fonctionnel

- [ ] **Formulaire contact** — brancher une API réelle (Resend recommandé : `RESEND_API_KEY` dans `.env.local`, créer `app/api/contact/route.ts`)
- [ ] **Lock scroll body** au ouverture du menu mobile (`document.body.style.overflow`) dans `site-nav.tsx`
- [ ] **Filtres /work** — la page liste tous les projets sans filtre. Le footer lie vers `/work?filter=web` etc. mais le filtre n'est pas implémenté dans `app/work/page.tsx`

### Améliorations

- [ ] **PortfolioReel multi-projets** — actuellement affiche seulement `featuredProjects[0]`. À reconstruire pour swiper entre les 3 featured (billboard vertical ou autre) une fois le design validé sur le premier projet.
- [ ] **Case study enrichi** — `app/work/[slug]/page.tsx` affiche cover + meta + texte. Ajouter galerie d'images, métriques, quote client selon le contenu réel. Prévoir un champ `images: string[]` dans le type `Project`
- [ ] **SEO complet** — ajouter `openGraph`, `twitter`, `canonical` dans les `generateMetadata` de chaque page
- [ ] **Favicon** — remplacer `src/app/favicon.ico` par le logo TCM
- [ ] **`inline-media.tsx`** — le composant existe mais la hero l'implémente en direct. Unifier si plusieurs endroits utilisent des images inline dans du texte
- [ ] **`Button` UI** — le composant existe mais n'est pas utilisé. Soit l'adopter partout (refactor des inline styles), soit le supprimer pour éviter la confusion

---

## Checklist avant tout merge

- [ ] `npm run build` passe sans erreur TypeScript
- [ ] Aucune valeur design hardcodée hors `globals.css` (exceptions légitimes : `#18120D`/`#F4EDE6` dans nav blend-mode et entrance curtain, `#fff` sur boutons orange)
- [ ] `data-bg` en hex résolu, pas en `var()`
- [ ] Toutes les animations vérifient `useReducedMotion()`
- [ ] Chaque `gsap.context()` a `ctx.revert()` dans son cleanup
- [ ] Images : `alt` descriptif (ou `alt=""` si décoratif) + `loading="lazy"` ou `priority`
- [ ] Nouveaux composants animés : `'use client'` + import GSAP depuis `@/lib/gsap`
