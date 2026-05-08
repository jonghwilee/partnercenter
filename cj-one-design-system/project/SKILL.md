---
name: cjone-design
description: Use this skill to generate well-branded interfaces and assets for CJ ONE (and the CJ ONE Business / Admin B2B surfaces), either for production or throwaway prototypes / mocks / etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key files:
- `README.md` — brand context, content fundamentals, visual foundations, iconography.
- `colors_and_type.css` — drop-in CSS variables (`--pink-400`, `--fg-primary`, `--shadow-card`, …) and semantic type classes (`.cj-h1`, `.cj-body`, …). Always link this from any HTML you generate.
- `fonts/` — Pretendard 100–900 .ttf files. Already wired into `colors_and_type.css`.
- `assets/logos/` — CJ ONE radial symbol + Business / Admin wordmarks.
- `assets/icons/` — custom filled-silhouette icons (Home, Alarm, Gift, Best, Benefit, Like, Barcode, …).
- `ui_kits/cjone-b2b/` — reference React recreation of the B2B Admin console (login, dashboard, settlement table, drawer, modal, snackbar). Lift components from here.
- `preview/` — token / component cards showing every foundation and component cluster at a glance.

Hard rules:
- One signature accent: brand pink `#ED27CF`. Use sparingly — primary CTA, focus ring, active tab.
- Page background is cool gray `#EDF0F5`; cards are pure white with a 20px radius and the `--shadow-card` long-offset shadow.
- Dark surfaces are navy `#1E192A`, never pure black.
- Typography is Pretendard. Display sizes ≥24 use `letter-spacing: -0.015em`. Body weight is 500, heading weight is 700.
- Korean copy is formal honorific (`-합니다`, `-입니다`); English labels are Title Case. No emoji, no exclamation marks.
- Iconography is filled silhouette, 24×24 nominal grid. Substitute Lucide where the custom set is missing — flag the substitution.
- Brand gradient (blue → violet → pink) is reserved for hero / cover only — do not use it on product UI chrome.
