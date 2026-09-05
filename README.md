# ONFACMEN

A dark, motion-driven landing page for **ONFACMEN** — a thrift & streetwear store in Sunny Enclave, Kharar, Punjab. *Where you can find affordable stuff & trendy articles.*

The site is a single, immersive scroll experience: an animated wordmark, a scroll-driven 3D garment that the camera dives into, pinned text reveals, a horizontally-scrolling product rail, and a live map to the store.

## Tech stack

- **[Next.js 16](https://nextjs.org)** (App Router, Turbopack) + **React 19**
- **[Tailwind CSS 4](https://tailwindcss.com)** for styling
- **[GSAP](https://gsap.com)** (ScrollTrigger + SplitText) for scroll choreography and section pinning
- **[Framer Motion](https://www.framer.com/motion/)** for the pointer-reactive product cards
- **[Lenis](https://github.com/darkroomengineering/lenis)** for smooth inertial scrolling
- **[Three.js](https://threejs.org) + [React Three Fiber](https://r3f.docs.pmnd.rs) + [Drei](https://github.com/pmndrs/drei)** for the desktop 3D hero
- **TypeScript**

## Sections

1. **Hero** — animated `ONFACMEN` wordmark with a scroll-driven 3D shirt (desktop); an image fallback on mobile and for reduced-motion.
2. **Ticker** — accent marquee strip.
3. **Story** — pinned, word-by-word scroll reveal with store stats.
4. **Collection** — horizontally-scrolling rail of the week's drop.
5. **Why** — the four reasons the racks keep emptying.
6. **Social strip** — dual marquee of lifestyle photography.
7. **Location** — store details with a dark-themed Google Maps embed.
8. **Footer CTA** — big call-to-action with WhatsApp, Instagram and directions.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Scripts

| Command         | Description                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| `npm run dev`   | Start the dev server (Turbopack).                                           |
| `npm run build` | Production build. Uses a separate `.next-build` dir so it doesn't clobber the dev server's chunks. |
| `npm run start` | Serve the production build.                                                 |
| `npm run lint`  | Run ESLint.                                                                 |

## Notes

- **Images** are served from Unsplash (free licence only) via a custom loader in `src/lib/unsplash-loader.ts`, with generated blur placeholders in `src/data/images.ts`. Swap these for real ONFACMEN product photography when it's shot.
- **Store details** (address, hours, phone, socials, product list) live in `src/lib/site.ts` — edit there to keep content in one place.
- The build script (`scripts/with-build-dir.mjs`) exists so `next dev` and `next build` can run at the same time on Windows without fighting over `.next`.

## Store

**ONFACMEN** · 3, Jandpur Rd, opposite Jalvayu Tower, Sector 125, Sunny Enclave, Kharar, Punjab 140301 · Open daily 11:00 AM – 10:00 PM
