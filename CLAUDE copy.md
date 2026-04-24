# The Craft Machine — Portfolio Site

## Project Overview

**WHY**: Showcase The Craft Machine's web design expertise to convert visitors into leads.  
**WHAT**: Portfolio website displaying past client projects, agency identity, and client reviews.  
**HOW**: Follow `@docs/design-system.md` for all UI/design decisions and `@docs/architecture.md` for all tech/structure decisions. Read both before starting any task.

---

## Reference Docs

| File | Covers |
|---|---|
| `@docs/design-system.md` | Tokens, components, animation, motion — single source of truth |
| `@docs/architecture.md` | Stack, file structure, commands, conventions |

---

## Site Structure

```
/                  → Hero + featured projects (pinned scroll) + CTA
/projects          → Full project grid
/projects/[slug]   → Individual case study
/about             → Agency story + team
/#testimonials     → Client reviews (anchor on homepage)
/contact           → Contact form
```

---

## Content Entities

**Project card** — client name, industry, short description, thumbnail/video, category tag, case study link.  
**Case study** — context, challenge, solution, visuals, results/metrics, client quote.  
**Testimonial** — client name, role, company, quote, optional photo.

---

## IMPORTANT Rules

- **YOU MUST** read `@docs/design-system.md` before writing any CSS or component
- **YOU MUST** read `@docs/architecture.md` before creating files or choosing libraries
- Never hardcode any design value — all tokens are in `@docs/design-system.md`
- Never write copy like "Unlock the power of…" — be specific to The Craft Machine

---

## Quality Checklist

- [ ] No hardcoded design values — all from `@docs/design-system.md`
- [ ] All animations respect `prefers-reduced-motion`
- [ ] All images: `alt` + `loading="lazy"` + `width`/`height`
- [ ] Mobile verified at 375px, dark mode verified
- [ ] No console errors
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95
