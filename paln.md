# Ducor Residences — Project Plan

## What This Is

A luxury guest house demo website built to win freelance clients in Monrovia, Liberia. The site is presented to real guest house and hospitality businesses as a live example of what they can get for $100 (excluding domain and hosting). The demo must look and feel expensive — that's the whole pitch.

The fictional business is **Ducor Residences**, named after the historic Ducor hill in Monrovia. The tagline is: *"Where Monrovia's story meets modern comfort."*

---

## Tech Stack

- **Framework:** Next.js 16.2 (App Router, Turbopack default)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with custom design tokens + shadcn/ui
- **Component Library:** shadcn/ui — use for: Buttons, Cards, Inputs, Dialogs, Tabs, Badges, Separators. Always extend with custom styles, never use shadcn defaults as-is
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Images:** `next/image` exclusively — never `<img>`
- **Links:** `next/link` exclusively — never `<a>` for internal routes
- **Icons:** Lucide React (ships with shadcn/ui)
- **Lightbox:** `yet-another-react-lightbox` (Gallery page)
- **Data:** Local JSON files in `/data` — no backend, no API calls

> Note: Next.js 16 renamed `middleware.ts` → `proxy.ts`. Use `proxy.ts` for any request interception. Turbopack runs by default — no flags needed in `package.json` scripts.

---

## Design Philosophy

This site should feel **confident and restrained** — not decorated. A few principles to follow throughout:

- **Borders:** Sharp or `rounded-sm` at most. No `rounded-xl` or `rounded-full` on cards or containers
- **Shadows:** Only where elevation must be communicated — sticky booking panel, active navbar. No `shadow-md` scattered across cards
- **Spacing:** Generous whitespace does more than decoration. Let sections breathe
- **Consistency:** Every page should feel like it belongs to the same family — same type scale, same spacing rhythm, same color usage

---

## Design System

### Fonts
Add to `layout.tsx` via `next/font/google`:
- **Cormorant Garamond** — all headings (weights: 400, 600, 700)
- **Inter** — body text, UI, buttons (weights: 400, 500, 600)

### Type Scale
| Element | Size | Font | Weight |
|---|---|---|---|
| H1 | `text-5xl` desktop / `text-4xl` mobile | Cormorant Garamond | 600 |
| H2 | `text-4xl` | Cormorant Garamond | 600 |
| H3 | `text-2xl` | Cormorant Garamond | 500 |
| Body | `text-base` | Inter | 400 |
| Caption | `text-sm` | Inter | 400, muted |

### Color Tokens — `tailwind.config.ts`
```
primary:     #1a1a1a   — headings, primary text
secondary:   #8B7355   — warm gold-brown, accents, borders
accent:      #C9A96E   — lighter gold, CTAs, highlights
background:  #FAFAF8   — warm white, page base
surface:     #F5F3EF   — cards, section backgrounds
muted:       #6B6B6B   — secondary text
```

### Animation Principles
Every section should feel intentional, not flashy. The standard pattern:

- **Page load:** Staggered fade-up on hero elements (title → subtitle → buttons), each with a slight delay
- **Scroll reveals:** `whileInView` with `initial={{ opacity: 0, y: 30 }}` → `animate={{ opacity: 1, y: 0 }}`, `viewport={{ once: true }}`
- **Cards:** Subtle scale + shadow lift on hover (`whileHover={{ scale: 1.02 }}`)
- **Navbar:** Smooth background transition from transparent to `#1a1a1a` on scroll
- **Page transitions:** Fade in on mount using `AnimatePresence`
- **CTAs/Buttons:** Gentle shimmer or underline draw on hover using CSS or Framer
- **Image overlays:** Slow zoom on hero background image using `motion` with `scale` keyframe

The goal is elegance — nothing should feel bouncy, sudden, or cheap. Timing should generally sit between `0.4s–0.7s` with `ease: [0.22, 1, 0.36, 1]` (custom ease-out).

---

## Folder Structure

```
/app
  layout.tsx                ← fonts, global providers, metadata
  page.tsx                  ← Home
  /rooms/page.tsx           ← Rooms listing
  /rooms/[slug]/page.tsx    ← Room detail
  /amenities/page.tsx
  /gallery/page.tsx
  /booking/page.tsx
  /contact/page.tsx

/components
  /shared
    Navbar.tsx
    Footer.tsx
    PageHero.tsx
    CTABanner.tsx
    RoomCard.tsx
    SectionHeading.tsx
  /home
    HeroSection.tsx
    HighlightsGrid.tsx
    AboutSnippet.tsx
    FeaturedRooms.tsx
    Testimonials.tsx
  /rooms
    RoomGrid.tsx
    FilterBar.tsx
  /room-detail
    ImageGallery.tsx
    RoomInfo.tsx
    AmenitiesList.tsx
    BookingPanel.tsx
    SimilarRooms.tsx
  /amenities
    FeatureGrid.tsx
    PoliciesSection.tsx
  /gallery
    GalleryGrid.tsx
    FilterTabs.tsx
  /booking
    BookingForm.tsx
    PriceSummary.tsx
    ConfirmationScreen.tsx
  /contact
    ContactForm.tsx
    InfoCards.tsx
    MapEmbed.tsx

/data
  rooms.json
  amenities.json
  testimonials.json
  gallery.json
  policies.json

/types
  index.ts

/lib
  utils.ts                  ← cn(), formatPrice(), calcNights()

/public
  /images
    /rooms
    /gallery
    /hero
```

Use `"use client"` only where needed — forms, scroll listeners, carousels. Keep all pages as server components by default.

---

## Data & Content

### Rooms
Pricing reflects the Monrovia luxury market. Rooms are named after local landmarks and geography:

| Slug | Name | Type | Price |
|---|---|---|---|
| `mesurado-room` | The Mesurado Room | Single | $85/night |
| `capitol-view-double` | The Capitol View Double | Double | $120/night |
| `ducor-executive-suite` | The Ducor Executive Suite | Suite | $175/night |
| `providence-penthouse` | The Providence Penthouse | Penthouse | $250/night |

Mark the Suite and Penthouse as `"featured": true` — these appear on the homepage.

### Testimonials
Use 3 entries. Mix nationalities — one Liberian, one diaspora (US), one regional African traveler. Ratings: all 5 stars. Keep quotes short and believable, not over-the-top.

### Amenities
Include: Restaurant, Rooftop Bar, Swimming Pool, Conference Room, Airport Shuttle, Free WiFi, 24hr Reception, Room Service. Use Lucide icons throughout.

### Policies
Check-in: 2:00 PM / Check-out: 12:00 PM. Standard quiet hours, no-smoking indoors, pet policy at discretion.

---

## TypeScript Interfaces — `/types/index.ts`

```ts
export interface Room {
  id: string
  slug: string
  name: string
  type: "Single" | "Double" | "Suite" | "Penthouse"
  price: number
  capacity: number
  size: string
  description: string
  featured: boolean
  images: string[]
  amenities: string[]
}

export interface Testimonial {
  id: string
  name: string
  rating: number
  quote: string
  country: string
}

export interface Amenity {
  id: string
  title: string
  icon: string
  description: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: "Rooms" | "Dining" | "Exterior" | "Events"
}
```

---

## Pages

### Home `/`
The most important page. This is what a potential client sees first.

- **Navbar** — scroll-aware visibility: visible and transparent at the very top of the page. Once the user scrolls down, the navbar hides (`y: "-100%"`). When the user scrolls back down even slightly, it reappears (`y: 0`) with a solid `#1a1a1a` background — because scrolling down signals they may need navigation. Not floating, not a pill — flush full-width at the top edge. Implemented with a scroll direction listener tracking `lastScrollY` vs `currentScrollY`. Animated with Framer Motion `motion.nav`.
- **Hero** — full viewport height, single high-quality background image with a **Ken Burns effect** (slow CSS `scale(1.0)` → `scale(1.08)` over 8–10s, `ease-in-out`, pure CSS keyframes — no JS). Dark overlay on top. Headline and tagline centered, staggered fade-up on load. Two buttons: *Book a Stay* (accent gold) and *Explore Rooms* (ghost/outline)
- **Highlights** — 4 icons/stats in a row: "12 Luxury Rooms", "Rooftop Dining", "City Views", "Free Airport Shuttle"
- **About** — 2-col: image left, text right. Short story about Ducor Residences, its location, its connection to Monrovia's history
- **Featured Rooms** — 3-col card grid, pulls rooms where `featured: true`
- **Testimonials** — 3-col grid or horizontal scroll, pulled from `testimonials.json`
- **CTA Banner** — full-width dark background, centered: *"Ready for an elevated stay in Monrovia?"* + Book Now button
- **Footer**

### Rooms `/rooms`
- Short `PageHero` with title
- `FilterBar` — pill buttons: All / Single / Double / Suite / Penthouse
- `RoomGrid` — 3-col desktop, 1-col mobile, filters rooms by selected type

### Room Detail `/rooms/[slug]`
- `ImageGallery` — large main image + 4 thumbnails
- 2-col below: left side has `RoomInfo` + `AmenitiesList`, right side has a **sticky** `BookingPanel`
- `SimilarRooms` at the bottom — excludes current slug, shows 3 others

### Amenities `/amenities`
- `PageHero`
- `FeatureGrid` — 3-col cards with Lucide icons and short descriptions
- `PoliciesSection` — 2-col: check-in/out info left, house rules right

### Gallery `/gallery`
- `FilterTabs` — All / Rooms / Dining / Exterior / Events
- Masonry CSS grid on desktop
- Click any image → opens `yet-another-react-lightbox` in fullscreen view
- Inside the lightbox: swipe left/right to navigate (native touch, no extra config), keyboard arrows on desktop, Zoom plugin enabled
- Set `closeOnPullDown: true` so mobile users can swipe down to dismiss — feels native and premium
- Style lightbox background to `#1a1a1a` to stay consistent with the site palette
- **No image downloads** — disable right-click save and long-press on mobile inside the lightbox. Images belong to the business owner. Feels more exclusive and protects their content

### Booking `/booking`
- 2-col: left = `BookingForm` (React Hook Form + Zod validation), right = sticky `PriceSummary`
- On valid submit → `ConfirmationScreen` replaces the form with a thank-you state
- No real payment processing — this is a demo

### Contact `/contact`
- 2-col: left = `ContactForm`, right = stacked `InfoCards` (address, phone, email, hours)
- Full-width `MapEmbed` below (embed a Google Maps iframe centered on Monrovia)

---

## Skeleton Loading

Applies to all pages **except** the Home page (`/`). The Home page loads instantly with no skeletons — it's the first impression and must feel immediate.

**Where skeletons appear:**
- `/rooms` — RoomCard skeletons (3-col grid) while room data resolves
- `/rooms/[slug]` — ImageGallery skeleton + RoomInfo block skeleton on load
- `/amenities` — FeatureGrid card skeletons
- `/gallery` — Masonry grid of image placeholder blocks
- `/booking` — Form field skeletons on initial load
- `/contact` — InfoCards skeleton

**How to build them:**
- Use shadcn/ui's `Skeleton` component (`import { Skeleton } from "@/components/ui/skeleton"`)
- Each skeleton should match the exact shape and size of the real component it replaces — same height, same grid layout, same border radius
- Animate with the default shadcn pulse (`animate-pulse`) — do not add custom animations, keep it subtle
- Skeleton color should use `surface` (`#F5F3EF`) as the base so it blends with the page background naturally
- Wrap data-dependent components in a loading state check: if loading → render skeleton, else → render real component

---

## Build Order

Build in this sequence to avoid blockers:

1. Project setup — install deps, configure Tailwind tokens, fonts, `lib/utils.ts`
2. Data files — all JSON + `types/index.ts`
3. Shared components — Navbar, Footer, PageHero, SectionHeading, CTABanner, RoomCard
4. Home page — section by section, top to bottom
5. Rooms listing page
6. Room detail page
7. Amenities page
8. Gallery page
9. Booking page
10. Contact page
11. Polish pass — review all animations, test mobile layouts, check transitions feel smooth

---

## Key Rules for the AI Building This

- Never use `<img>` — always `next/image`
- Never use `<a>` for internal links — always `next/link`
- Keep pages as server components; only add `"use client"` for interactive components
- All data comes from `/data/*.json` — no fetch calls, no API
- Use `cn()` from `lib/utils.ts` for all conditional Tailwind classes
- Animations must feel **refined and slow**, not bouncy. Default easing: `[0.22, 1, 0.36, 1]`
- Placeholder images can use `https://images.unsplash.com` — search for luxury hotel, Monrovia, West Africa
- Mobile-first responsive design on every component
- Navbar scroll logic: track `lastScrollY` vs `currentScrollY` in a `useEffect`. Scrolling **down** → `y: 0` (show, user may need navigation). Scrolling **up** → `y: "-100%"` (hide, user is reading). At page top (scrollY < 10) → always visible and transparent. Past 80px → background solid `#1a1a1a`. Never floating or pill-shaped — always flush, full-width. Animate with Framer Motion `motion.nav`
- Use `proxy.ts` instead of `middleware.ts` — Next.js 16 renamed the file and the exported function
- shadcn/ui components must always be restyled to match the Ducor design tokens — never ship with default shadcn gray/slate palette

---

## Future Scope (Post-Demo Upsell)

These features are **out of scope** for the $100 demo but are natural upsell conversations once a client is onboard:

- **Admin Dashboard** — let the owner manage rooms, pricing, gallery images, and bookings without touching code. Built with Next.js + Sanity CMS or a lightweight database
- **Real Booking System** — connect to a payment gateway (Stripe or local Liberian options), send confirmation emails, manage availability calendar
- **SEO & Analytics** — Google Search Console setup, sitemap, meta tags per page, Google Analytics
- **Multi-language** — French/local language support for regional guests
- **Blog/News section** — for promotions, local events, driving organic traffic

When pitching, mention v2 casually — plant the seed without overselling it.