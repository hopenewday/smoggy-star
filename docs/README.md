# Sveltia Astro Theme Documentation

---

## Overview

A production-grade, mobile-first Astro.js (v4.x) theme with React, integrated with Sveltia-CMS, optimized for Cloudflare Pages, featuring advanced SEO, PWA, security, and personalization.

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone <repo-url>
cd <project>
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create `.env` with:

```
SVELTIA_CMS_URL=...
SVELTIA_CMS_TOKEN=...
PUBLIC_IMAGEKIT_URL=...
PUBLIC_CLOUDFLARE_URL=...
PUBLIC_KIT_API_URL=...
PUBLIC_KIT_API_KEY=...
FACEBOOK_APP_ID=...
SENTRY_DSN=...
GOOGLE_ANALYTICS_ID=...
```

4. **Build and run**

```bash
npm run build
npm run preview
```

5. **Deploy**

Upload `dist/` to Cloudflare Pages or push to connected repo.

---

## Theme Customization

- **Navigation:** Edit `Header.tsx` for mega-menu structure.
- **Personalization:** Adjust recommendation engine in `recommendationsSlice.ts`.
- **SEO:** Customize `SEO.tsx` and JSON-LD schemas.
- **Styling:** Modify `public/styles/global.css` and Tailwind config.
- **PWA:** Update `manifest.json` and `service-worker.js`.
- **Analytics:** Configure Google Analytics and Sentry in `.env`.
- **AMP:** Use `AMPArticle.tsx` for AMP-compliant pages.
- **Facebook SDK:** Set App ID in `facebook-sdk.js`.

---

## Architecture & Performance

- **Astro SSR with React + Preact aliasing**
- **GraphQL integration with Sveltia-CMS**
- **Redux for state management**
- **Workbox for advanced caching**
- **Lazy loading, code splitting, Brotli compression**
- **Responsive images with WebP, srcset, picture**
- **Strict CSP, WAF, CSRF protection**
- **Accessibility: WCAG 2.1 AA compliant**
- **Modular, extensible, and well-documented**

---

## Notes

- Inline comments explain each file's purpose and usage.
- Manual deployment recommended; no CI/CD included.
- Designed for maintainability by a single developer.