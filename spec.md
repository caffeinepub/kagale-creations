# Kagale Creations

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- Full agency website for Kagale Creations with the following pages/sections:
  1. **Sticky glass navbar** with logo, nav links, and CTA button. Scroll progress bar.
  2. **Hero section** — full-screen with animated headline ("We Build Digital Experiences That Grow Your Business"), subtext listing services, animated CTA buttons (View Our Work, Contact Us), particle background, and cinematic video-style overlay.
  3. **Services section** — 4 animated cards: Website Development, Ecommerce Development, Custom Web Applications, Videography & Brand Shoots. Each with animated icon, glowing hover effects.
  4. **Portfolio section** — dynamic grid of project cards (Business Websites, Ecommerce, Portfolio, Startup). Each card with preview image, description, live link placeholder, and hover animation.
  5. **Videography section** — YouTube/Vimeo embed placeholders with hover play animation for brand videos, product shoots, cinematic reels.
  6. **Gallery section** — masonry grid layout with lightbox viewer, hover zoom animation showing brand shoots and website screenshots.
  7. **Website Catalogue section** — cards for Restaurant, Clothing Brand, Real Estate, Ecommerce Store, Personal Portfolio. Each with preview image, description, and "Get This Website" CTA.
  8. **Why Choose Us section** — animated stats (50+ Websites, 20+ Clients, Fast Delivery, Modern Design) with counting number animation.
  9. **Contact section** — form (name, email, phone, message), WhatsApp button, Call button, Google Map embed placeholder.
  10. **Floating WhatsApp button** on all pages.
  11. **Page loading animation**, cursor glow effect, smooth scroll, parallax effects, GSAP-style animations via Framer Motion.

- Backend stores contact form submissions.

### Modify
- None.

### Remove
- None.

## Implementation Plan
1. Write spec.md (this file).
2. Select no special Caffeine components (contact form uses backend directly).
3. Generate Motoko backend to store contact form submissions.
4. Generate hero background and service/portfolio/catalogue images.
5. Build full React frontend with:
   - Dark futuristic glassmorphism theme using OKLCH color tokens
   - Framer Motion for all animations (hero text, scroll reveals, counters, hover effects)
   - React Three Fiber for particle/3D hero background
   - Sticky glass navbar with scroll progress
   - All 9 sections + floating WhatsApp button
   - Lightbox for gallery
   - Responsive mobile layout
   - Deterministic data-ocid markers on all interactive elements
