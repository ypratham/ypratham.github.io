# Design System

Minimalist, grid-based portfolio inspired by [anishshobithps.com](https://anishshobithps.com). Monospace-first, dashed borders, SVG cross marks at grid intersections, and a teal/green highlight accent.

---

## Theme & Colors

All colors use the **OKLCH** color space for perceptual uniformity. Theme switching is handled by `next-themes` with `attribute="class"` and `defaultTheme="dark"`.

### Light Theme

| Token              | Value                  | Usage                     |
| ------------------ | ---------------------- | ------------------------- |
| `--background`     | `oklch(0.98 0 0)`      | Page background           |
| `--foreground`     | `oklch(0.12 0 0)`      | Primary text              |
| `--card`           | `oklch(0.96 0 0)`      | Card backgrounds          |
| `--muted`          | `oklch(0.93 0 0)`      | Muted backgrounds         |
| `--muted-foreground` | `oklch(0.5 0 0)`     | Secondary text, labels    |
| `--border`         | `oklch(0.88 0 0)`      | Dashed borders            |
| `--highlight`      | `oklch(0.55 0.2 155)`  | Green accent (links, CTA) |
| `--section-divider`| `oklch(0.85 0 0)`      | Section top borders       |
| `--cross-color`    | `oklch(0.75 0 0)`      | Grid cross marks          |

### Dark Theme

| Token              | Value                  | Usage                     |
| ------------------ | ---------------------- | ------------------------- |
| `--background`     | `oklch(0.1 0 0)`       | Page background           |
| `--foreground`     | `oklch(0.93 0 0)`      | Primary text              |
| `--card`           | `oklch(0.13 0 0)`      | Card backgrounds          |
| `--muted`          | `oklch(0.18 0 0)`      | Muted backgrounds         |
| `--muted-foreground` | `oklch(0.55 0 0)`    | Secondary text, labels    |
| `--border`         | `oklch(0.22 0 0)`      | Dashed borders            |
| `--highlight`      | `oklch(0.8 0.18 155)`  | Green accent (brighter)   |
| `--section-divider`| `oklch(0.25 0 0)`      | Section top borders       |
| `--cross-color`    | `oklch(0.35 0 0)`      | Grid cross marks          |

### Border Radius

- `--radius`: `0.625rem` (10px base)
- `sm`: 6px, `md`: 8px, `lg`: 10px, `xl`: 14px

---

## Typography

**Font:** Geist Mono (monospace) via `next/font/google`.

| Role           | Classes                                         |
| -------------- | ----------------------------------------------- |
| Hero title     | `text-4xl md:text-6xl font-bold tracking-tight` |
| Section title  | `text-3xl md:text-4xl font-bold`                |
| Card title     | `font-bold` (base size)                         |
| Body text      | `text-lg` or `text-sm`, `leading-relaxed`       |
| Section labels | `text-xs uppercase tracking-[0.2em] text-muted-foreground` |
| Metadata       | `text-xs text-muted-foreground font-mono`       |

---

## Layout

### Container

All sections use the same container pattern:

```
max-w-5xl mx-auto px-6
```

- Max width: 1280px
- Horizontal padding: 24px
- Vertically centered with `mx-auto`

### Section Spacing

- Hero: `pt-24 pb-16`
- Sections (via `GridSection`): `py-16`
- Between sections: 1px dashed divider (`--section-divider`)

### Grid Patterns

| Pattern            | Columns                     | Usage                    |
| ------------------ | --------------------------- | ------------------------ |
| Skills ecosystem   | `grid-cols-2 md:grid-cols-4`| Home top skills          |
| Projects           | `grid-cols-1 md:grid-cols-2`| Project cards            |
| Skill categories   | `grid-cols-1 md:grid-cols-3`| Experience skills        |
| Stats              | `grid-cols-2 md:grid-cols-4`| Stats bar                |
| Experience list    | Single column               | Stacked entries          |

Internal grid cells use `border-dashed border-border` on right/bottom edges to create the grid lines, with conditional logic to hide trailing borders.

---

## Components

### GridBox

Dashed-border container with SVG cross marks at all four corners.

```tsx
<GridBox className="optional">
  {children}
</GridBox>
```

**Cross mark implementation:** SVG `+` icons (size-5, `stroke-muted-foreground/40`) positioned with `translate-x-[calc(50%-0.5px)]` / `translate-y-[calc(50%-0.5px)]` for pixel-perfect alignment on borders. Uses `z-30`, `pointer-events-none`, `aria-hidden`.

### GridSection

Section wrapper with consistent spacing and a dashed top divider.

```tsx
<GridSection>
  <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-10">
    SECTION LABEL
  </p>
  <GridBox>{content}</GridBox>
</GridSection>
```

### Header

- Sticky: `sticky top-0 z-50`
- Background: `bg-background/80 backdrop-blur-md`
- Bottom border: `border-b border-dashed border-border`
- Height: `h-14`
- Logo: bold monospace, `hover:text-highlight`
- Nav: hidden on mobile (`hidden sm:flex`), shown on `sm+`
- Theme toggle: pill-shaped container with Sun/Moon/Monitor buttons
- Mobile hamburger: full-screen overlay with dashed-border links
- Spotify notch: shown on `md+` screens

### SpotifyNowPlaying

Displays current/last-played Spotify track in the header.

- Pill shape: `border border-dashed border-border rounded-full`
- Album art: `size-4 rounded-sm`
- Equalizer: 3 animated bars (`bg-highlight`, varying heights 2-10px)
- Polls `/api/spotify` every 30 seconds
- Hidden on mobile (`hidden md:flex`)
- Max width: `max-w-[200px]` with truncated title

### SkillIcon

Theme-aware skill icons from `skillicons.dev`.

```tsx
<SkillIcon icon="nextjs" name="Next.js" size={40} />
```

URL: `https://skillicons.dev/icons?i={icon}&theme={light|dark}`

Reads `resolvedTheme` from `next-themes` to switch icon theme.

### Highlighted Text

Inline accent spans used for emphasis:

```tsx
<span className="text-highlight bg-highlight/10 px-1">
  highlighted text
</span>
```

---

## shadcn/ui Components

Preset: `b2D0xymTj` (radix-luma style). Built on `class-variance-authority`, `clsx`, and `tailwind-merge`.

### Badge

Variants: `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`

Common usage: `variant="outline"` with `className="text-[10px] font-normal rounded-sm"` for tech tags.

### Button

Variants: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`

Sizes: `xs` (h-6), `sm` (h-8), `default` (h-9), `lg` (h-10), `icon` variants

Common usage: `variant="outline" size="sm"` with `asChild` for links. Icon placement via `data-icon="inline-start"` or `data-icon="inline-end"`.

---

## Responsive Strategy

Mobile-first with two key breakpoints:

| Breakpoint | Changes                                              |
| ---------- | ---------------------------------------------------- |
| `sm`       | Nav links visible, hamburger hidden                  |
| `md`       | Grid columns expand (1→2, 2→4), Spotify notch shown |

### Mobile Menu

- Trigger: hamburger icon (`Menu`/`X` toggle), `sm:hidden`
- Overlay: `fixed inset-0 top-14 z-40 bg-background/95 backdrop-blur-md`
- Links: `text-lg font-mono py-3` with dashed bottom borders
- Body scroll locked when open
- Auto-closes on route change

---

## Animations

### Spotify Equalizer

```css
@keyframes equalizer {
  0%   { height: 2px; }
  100% { height: 10px; }
}
```

3 bars with staggered timing (0.8s, 0.6s, 0.7s) and delays (0s, 0.2s, 0.4s). `ease-in-out infinite alternate`.

### Transitions

All interactive elements use `transition-colors` for hover states.

---

## Dashed Border Convention

Dashed borders are the primary visual motif:

- **Section dividers:** `border-top: 1px dashed var(--section-divider)` via `.section-divider` class
- **Grid containers:** `border border-dashed border-border` on GridBox
- **Internal grid lines:** `border-r` and `border-b` with `border-dashed border-border` on grid cells
- **Header/Footer:** `border-b` / `border-t` dashed borders
- **Mobile menu items:** `border-b border-dashed border-border`

---

## Page Structure

### Home (`/`)

1. **Hero** — Photo, name, role, bio with highlighted text, CTA buttons (Contact, Resume)
2. **Ecosystem** — Top 8 skills by level in 4-col grid with icons
3. **Projects Preview** — 4 featured projects in 2-col grid, "View all" link
4. **Experience Preview** — All jobs listed, "View full experience" link
5. **Contact** — CTA section with email button

### Projects (`/projects`)

Full project listing in 2-col grid. Each card shows title, description, tech badges, role, duration, and links (GitHub/View).

### Experience (`/experience`)

1. **Work History** — Jobs with `grid-cols-[180px_1fr]` layout (date/location | role/description)
2. **Technical Skills** — 3-col category breakdown with `SkillIcon` components
3. **Stats** — 4-col stats bar (Years, Projects, Companies, Impressions)

### Achievements (`/achievements`)

Certificates grouped by category (Workshops, Hackathons, Courses) in 2-col grids. Summary stats at bottom.

---

## Tech Stack

| Dependency               | Version  | Purpose                    |
| ------------------------ | -------- | -------------------------- |
| `next`                   | 16.0.8   | Framework (App Router)     |
| `react`                  | 19.2.1   | UI library                 |
| `next-themes`            | 0.4.6    | Light/dark/system theming  |
| `lucide-react`           | 0.556.0  | Icons                      |
| `class-variance-authority` | 0.7.1  | Component variants         |
| `tailwind-merge`         | 3.5.0    | Class merging              |
| `tailwindcss`            | 4.x      | CSS framework (PostCSS)    |
| `radix-ui`               | 1.4.3    | Headless UI primitives     |
| `tw-animate-css`         | 1.4.0    | Animation utilities        |

---

## Design Decisions

1. **Monospace only** — Geist Mono everywhere. No sans-serif. Reinforces the developer/technical aesthetic.
2. **Dashed borders over solid** — Every border is dashed. Creates a blueprint/wireframe feel without looking unfinished.
3. **SVG cross marks** — Grid intersections use SVG `+` marks with `calc(50%-0.5px)` translations for sub-pixel alignment on borders. Not text characters.
4. **OKLCH colors** — Perceptually uniform color space for consistent contrast ratios across light/dark themes.
5. **Green highlight accent** — Single accent color (hue 155) used sparingly for emphasis. Adjusted per theme for visibility.
6. **No cards or shadows** — Content lives inside dashed grid cells. No elevation, no gradients, no rounded card containers.
7. **Section labels** — All uppercase, `tracking-[0.2em]`, `text-xs`, `text-muted-foreground`. Consistent labeling pattern across all pages.
8. **skillicons.dev for tech icons** — External SVG icons that respond to theme changes. No local icon assets needed.
9. **Spotify integration** — Shows personality. Polls every 30s, falls back to last played, hidden on mobile to save space.
10. **Mobile hamburger** — Full-screen overlay matching the dashed-border aesthetic. Locks body scroll. Auto-closes on navigation.
