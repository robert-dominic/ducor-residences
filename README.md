# Ducor Residences

Ducor Residences is a luxury guest house demo website built to showcase a polished hospitality web experience for businesses in Monrovia, Liberia. The project is intentionally designed to feel premium, restrained, and conversion-focused while staying lightweight enough to serve as a freelance sales demo.

The site presents a fictional property named after the historic Ducor hill and includes:

- a cinematic landing page with motion-driven storytelling
- room listing and room detail flows
- amenities and policy pages
- a masonry gallery with fullscreen lightbox
- a booking flow with validation and live pricing
- a contact page with form, info cards, and map embed

## Project Overview

This repository is a front-end demo only. It does not use a backend, external CMS, or booking API. All content is sourced from local JSON files and the forms are simulated client-side to keep the project easy to run, modify, and present.

The implementation focuses on:

- Next.js App Router conventions
- a custom hospitality design system
- mobile-first responsive layouts
- slow, refined Framer Motion transitions
- reusable UI primitives styled to match the brand

## Tech Stack

- Next.js 16.2
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui primitives
- Framer Motion
- React Hook Form
- Zod
- React Day Picker
- yet-another-react-lightbox
- Lucide React
- Phosphor Icons

## Folder Structure

```text
app/
  amenities/
  booking/
  contact/
  gallery/
  rooms/
  layout.tsx
  page.tsx
  template.tsx

components/
  amenities/
  booking/
  contact/
  gallery/
  home/
  room-detail/
  rooms/
  shared/
  ui/

data/
  amenities.json
  gallery.json
  policies.json
  rooms.json
  testimonials.json

lib/
  utils.ts

types/
  index.ts
```

## Running Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Open the app

Visit [http://localhost:3000](http://localhost:3000).

### 4. Production build

```bash
npm run build
npm run start
```

## Environment Setup

This project currently does not require any environment variables.

If you extend it with a CMS, booking provider, analytics, or transactional email service, create a local `.env.local` file and keep secrets out of version control.

Example future variables:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BOOKING_PROVIDER_API_KEY=your-key
```

## Development Notes

- Internal navigation uses `next/link`
- Images use `next/image`
- Route-level loading states are implemented for non-home pages
- Page transitions use the App Router `template.tsx`
- Gallery and booking interactions are client-side only
- Remote placeholder images are loaded from `images.unsplash.com`

## Credits

- Design and implementation: Ducor Residences demo build
- Placeholder photography: [Unsplash](https://unsplash.com/)
- UI primitives: [shadcn/ui](https://ui.shadcn.com/)
- Icons: [Lucide](https://lucide.dev/) and [Phosphor Icons](https://phosphoricons.com/)
- Framework: [Next.js](https://nextjs.org/)
