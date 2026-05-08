# CJ ONE Design System

The CJ ONE B2B Design System (v1.1.1). Built for the back‑office and partner / admin web tools used by CJ ONE — the unified Korean loyalty / membership program covering CJ‑group brands (Olive Young, CJ The Market, Tous Les Jours, VIPS, N Seoul Tower, The Place / Dining, Mobile POP, OnStyle, Olipepe, Megacoffee, etc.) and partner brands (Lotte Hotels & Resorts, SuperSOL, Photoism, Riahn, Style On Air, Bori Bori, N Burger, Heo Dak, Culture Land).

This system covers the **PC (desktop) B2B and Admin** surfaces — internal partner tools, merchandising consoles, ops dashboards. The mobile / consumer member app is a sibling system.

## Sources
- Figma file: **[PC] B2B Design System v1.1.1.fig** (mounted as virtual filesystem during build)
  - 43 pages, 72 top‑level frames covering Color, Typography, Radius, Shadow, Layout, Logo, Icon and ~30 component groups (Buttons, Badges, Chips, Calendar, Dialogs, Dropdown, GNB / SNB, Lists, Notifications, Snackbar, Tables, Tabs, TextFields, Tooltips, Pagination, Segmented Controls, etc.).
- Pretendard typeface — provided by user as 9 .ttf weights, included in `fonts/`.

## Index
| Path | What's there |
| --- | --- |
| `colors_and_type.css` | All foundation tokens — color, type, radius, shadow, spacing — and semantic type classes (`.cj-h1`, `.cj-body`, …). |
| `fonts/` | Pretendard 100 / 200 / 300 / 400 / 500 / 600 / 700 / 800 / 900. |
| `assets/logos/` | CJ ONE radial symbol, CJ ONE Business + Admin wordmark vectors. |
| `assets/icons/` | Brand icon SVGs extracted from Figma (Home, Alarm, Gift, Best, Benefit, Like, Barcode, …). |
| `preview/` | Static HTML cards rendered into the **Design System** tab — one per token group / component cluster. |
| `ui_kits/cjone-b2b/` | Hi‑fi CJ ONE B2B Admin recreation: GNB, SNB, page layout, table, buttons, modals, login. |
| `SKILL.md` | Skill manifest — usable as a Claude Code Skill (`/skills`) for designing in‑brand. |

---

## Content fundamentals

The product copy is **Korean‑first, formal honorific (‑습니다 / ‑하세요)**, written for ops / partner staff, not consumers. Sentences are declarative, dense and short. English titles often head a section (e.g. `Component Spec`) with a Korean subtitle below explaining purpose. Punctuation uses `·` (middle dot) for list separators inside sentences, and Korean quotation marks `「 」` are rare — most text is unquoted.

**Tone:** professional, precise, neutral. No casualness, no emoji, no exclamation marks. Verbs lean instructional ("‑합니다", "‑입니다") rather than friendly ("‑해요").

**Voice:** speaks **about** the user ("사용자", "운영자") rather than to them. Uses second‑person rarely; first‑person never.

**Casing:** English UI labels are Title Case (`Component Spec`, `Foundation`, `Component Group Title`). Korean retains natural spacing — no forced kerning.

**Examples (verbatim from the Figma):**
- `컴포넌트 정의·속성·사용 규칙을 명확히 하여 모든 직군이 동일한 이해를 바탕으로 화면 목적에 맞게 사용하고, 임의의 스타일 변경을 금지합니다.`
- `CJ ONE에 노출되는 자사 브랜드, 제휴사 로고 모음입니다.`
- `콘텐츠 영역 혹은 화면의 하단에 배치하여 사용자가 주요 작업을 실행할 수 있도록 하는데 사용합니다.`

Numerals are Arabic; units are placed without space (`16px`, `40px`). When an English term is established (`Foundation`, `Token`, `Component`), it is left in English inside Korean prose.

---

## Visual foundations

**Palette.** Cool, low‑saturation neutrals as the canvas; one signature **electric pink `#ED27CF`** as the only brand accent on white surfaces. Dark surfaces use a near‑black indigo `#1E192A` (navy) — never pure black. Status colors are functional (success green, warning orange, error red `#FF0037`, info blue `#2142FF`). The pink is bold; everything else is restrained — a deliberate "one loud color, everything else quiet" system.

**Brand gradients** (`--grad-cjone-light` / `‑dark`) sweep blue `#617CFF` → violet `#8652FF` → pink `#ED27CF`. Reserved for hero / cover / key marketing surfaces — not used in product UI chrome.

**Typography.** **Pretendard** at every weight 100–900. Display sizes (24+) use letter‑spacing `-0.015em` for compactness; body sizes have natural tracking. Korean line‑heights are generous (`26px` on 16, `34px` on 24) to keep hangul comfortable. The scale is restrained: 12 / 13 / 14 / 15 / 16 / 18 / 20 / 24 / 25 / 32 / 36 / 40. Weight 500 (Medium) is body default, 700 (Bold) is heading default — there is almost no use of 600.

**Spacing & layout.** 8‑pt grid with the addition of 4 and 12 for tight UI rows. The B2B canvas pads at 120px (page) and 60px (card content) on the largest desktop frames; product UI cards use 24–40px padding. Cards use a 20px outer radius, 8px on inputs and buttons, 6px on chips.

**Backgrounds.** Page background is `#EDF0F5` (cool gray). Cards are pure white with a 1px `rgba(28,28,67,0.10)` inner border and a faint long‑offset shadow (`0 4px 72px 0 rgba(208,208,240,0.10)`) — the shadow is felt, not seen. No textures, no patterns, no full‑bleed photography in the chrome. Hero illustrations are SVG geometry only.

**Animation.** Subtle. Hover transitions on color / opacity at 120–160ms ease‑out. No bounces, no parallax, no entrance animations on dashboards. Modals fade + slide up 8px.

**Hover state.** Filled buttons darken the fill ~6% (the `*State2` variants in Figma). Text / link hover adds an underline. Card / row hover swaps `--surface` → `--surface-hover` (`#F5F6FA`).

**Press state.** Filled buttons darken further to brand `#C71BAF`. No transform / scale. Disabled state desaturates to `--surface-disabled` `#EDF0F5` with `--fg-disabled` `#BFC5D2` text.

**Borders.** 1px hairlines in `#D8DCE5` (default) or `#E9E9E9` (subtle on cards). Focus ring is a 2px `#ED27CF` border (no separate outline halo).

**Shadows.** Four levels — `--shadow-card` (default), `--shadow-soft`, `--shadow-pop` (dropdowns), `--shadow-modal`. All are bluish (`rgba(28,28,67,*)` / `rgba(208,208,240,*)`) — never gray, never warm.

**Capsules vs gradients.** Status cues use **subtle fill** capsules (`#FFE5EA` for error etc.) — never gradient pills. The brand gradient is reserved for product covers only.

**Layout rules.** Top GNB is 64px tall, fixed, white with a 1px bottom border. SNB (side nav) is 240px, `#F5F6FA` background. Tables fill width with a 1px outer border, zebra rows on `#F5F6FA`. Modal max width 480 (alert) / 640 (default) / 960 (large), centered, dim layer `rgba(0,0,0,0.5)`.

**Transparency / blur.** Used only for the dim layer behind modals and on disabled states. No glassmorphism.

**Imagery vibe.** Cool, neutral, white‑background product photography in the consumer surfaces; in B2B / Admin, imagery is virtually absent. Where logos appear (partner brand list), each sits inside a 1px dashed `#9747FF` placeholder rectangle in the spec sheets — that is a Figma authoring convention, not a product style.

**Corner radii.** 0 / 4 / 6 / 8 / 12 / 16 / 20 / 28 / pill. Buttons and inputs: 8. Chips: 6. Cards: 20. Modal: 20. Pill is reserved for tags and avatar rings.

**Cards.** White, radius 20, `--shadow-card`, 1px `rgba(28,28,67,0.10)` border. Headers use `.cj-h4` (24/34 bold) with 60px content padding on large layouts.

---

## Iconography

CJ ONE uses a **custom hand‑drawn icon set** authored in Figma. Style:
- **Filled, rounded, dual‑weight** — most icons are a solid silhouette with a single `Subtract` mask (i.e. drawn as one compound path, not stroked outlines).
- 24×24 nominal grid; stroke‑equivalent weight ~2px; corners rounded.
- Single‑color: usually `currentColor` so the same icon adapts to dark/light surfaces. Brand‑pink `#ED27CF` only on active / selected states.
- No emoji anywhere in the system.
- No Unicode glyphs as icons. (`·` middle dot is used as a *text* separator only.)
- Brand logos (partner brands) are isolated SVG paths in `assets/logos/` — never recolored.

The Figma exposes named icons under `/Icon/external/`: Home, AlramOn / AlramOff, Gift, Best, Best2, Benefit, Like, Barcode, Search, Point, Location, Info, Success, Error, Sample, Shoe (3D demo). These are copied verbatim into `assets/icons/`.

For icons not present in the Figma but needed in product surfaces (chevrons, close, plus, three‑dot menu, etc.), this design system substitutes **[Lucide](https://lucide.dev)** at default 1.5px stroke weight, restyled to match — Lucide's geometric, slightly rounded silhouettes pair cleanly with the CJ ONE custom set. ⚠️ **Substitution flag:** if Lucide drift becomes visible, request the production icon set.

Logos (`assets/logos/`):
- `cjone-symbol.svg` — the 16‑wedge radial sun mark, pink. Reconstructed from the Figma vector definition.
- `cjone-business.svg` / `cjone-admin.svg` — wordmark vectors for the two B2B sub‑brands.
