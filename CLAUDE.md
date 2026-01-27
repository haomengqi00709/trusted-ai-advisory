# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Trusted AI Advisory Inc. corporate website - a bilingual (EN/FR) React single-page application for an AI governance consulting firm targeting Canada's public sector. Features AI-powered consultation using Google Gemini.

**Repository:** https://github.com/haomengqi00709/trusted-ai-advisory

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build to dist/
npm run preview      # Preview production build
```

## Environment Setup

Create `.env.local` with your Gemini API key:
```
GEMINI_API_KEY=your_key_here
```

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS (via CDN)
- **Fonts:** Inter (body), Space Grotesk (display)
- **AI Integration:** Google Gemini (`@google/genai`)
- **Markdown:** react-markdown (for legal pages)
- **Deployment:** Vercel

## Project Structure

```
/
├── App.tsx                    # Root component, manages language & modal state
├── index.tsx                  # React mount point
├── index.html                 # HTML template with Tailwind CDN
├── components/
│   ├── Header.tsx             # Navigation with demos dropdown & video modal
│   ├── Hero.tsx               # Landing section with 3 expandable pillars
│   ├── Values.tsx             # Core Tenets - 3 cards with ROI & scenario modals
│   ├── Services.tsx           # Service Dimensions - 4 services with blueprint modals
│   ├── FeaturedProject.tsx    # Technical Proofs - iframe demo with strategy cards
│   ├── Footer.tsx             # Contact info & legal links
│   ├── InquiryModal.tsx       # Multi-step intake form with AI summary
│   ├── AdvisoryBot.tsx        # AI chat interface (Gemini-powered)
│   └── LegalModal.tsx         # Privacy/Terms/Compliance modal with tabs
├── legal/
│   ├── privacy-en.md          # English Privacy Policy
│   ├── privacy-fr.md          # French Privacy Policy
│   ├── terms-en.md            # English Terms of Service
│   ├── terms-fr.md            # French Terms of Service
│   ├── compliance-en.md       # English Compliance
│   └── compliance-fr.md       # French Compliance
├── services/
│   └── geminiService.ts       # Gemini API integration
├── types.ts                   # TypeScript type definitions
├── vite.config.ts             # Vite configuration with path aliases
└── tsconfig.json              # TypeScript configuration
```

## Key Components

### Header.tsx
- Fixed navigation bar with logo, nav links, language toggle
- Demos dropdown with 3 demos (Pocket Trade Commissioner, PPT Translator, SpeechTrack AI)
- Each demo has Launch (external link) and Watch Demo (YouTube modal) options
- YouTube videos render via portal to escape fixed header positioning

### Hero.tsx
- Three expandable pillars: Policy-Aligned, Security-Conscious, Human-Centered
- Click to expand/collapse with animated descriptions
- CTA buttons: Try Demo (scrolls to FeaturedProject) and Inquire Now

### Values.tsx (Core Tenets)
- Three service pillars with hover animations
- Each card contains:
  - Tag, title, benefit description
  - 3 ROI bullet points (animated on hover)
  - "View Scenario" button → modal with Before/After comparison
- Custom SVG icons with hover animations

### Services.tsx (Service Dimensions)
- Four services: Workflow Discovery, Effort Audit, Secure Prototype, Literacy Calibration
- "View Blueprint" button opens modal with:
  - Full description
  - 4-step process timeline with phases and durations

### FeaturedProject.tsx (Technical Proofs)
- Left panel: 4 expandable strategy cards (hover to expand)
- Right panel: Live iframe embed of demo app
- Lazy-loads iframe via IntersectionObserver (fixes scroll position issue)

### LegalModal.tsx
- Tabbed modal for Privacy Policy, Terms of Service, Compliance
- Loads markdown files and renders with react-markdown
- ESC key and backdrop click to close

### InquiryModal.tsx
- Multi-step intake form (organization type, challenge, timeline, contact)
- Generates AI-powered strategic brief via Gemini on submission

## Internationalization

- Language state (`'en' | 'fr'`) managed in App.tsx
- Each component has internal translation objects:
  ```tsx
  const t = {
    en: { title: "English Title", ... },
    fr: { title: "French Title", ... }
  }[lang];
  ```
- Legal pages use separate markdown files per language

## AI Integration

**Gemini Service** (`services/geminiService.ts`):
- Model: `gemini-2.0-flash`
- Two functions:
  - `getAdvisoryResponse()` - Policy consultation chat
  - `generateInquirySummary()` - Strategic brief from intake form

**API Key:** Exposed via Vite's `define` config as `process.env.API_KEY`

## Design System

- **Primary Color:** `#0066FF` (blue)
- **Text:** Black with opacity variations (`text-black/60`, `text-black/40`)
- **Background:** White, neutral-50 for subtle contrast
- **Typography:**
  - Headers: `font-display` (Space Grotesk), uppercase, tracking-tighter
  - Body: `font-sans` (Inter)
  - Labels: 10-11px, uppercase, wide letter-spacing
- **Borders:** `border-black/10` for subtle dividers
- **Animations:** Tailwind transitions, custom CSS animations for hover effects

## Common Patterns

### Modals
- Fixed positioning with backdrop blur
- ESC key handler via useEffect
- Body scroll lock when open
- Portal rendering for z-index issues (Header video modal)

### Scroll Navigation
```tsx
const scrollToSection = (e, id) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};
```

### Lazy Loading (FeaturedProject iframe)
```tsx
const [loadIframe, setLoadIframe] = useState(false);
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setLoadIframe(true);
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );
  // observe section ref
}, []);
```

## Deployment

Hosted on Vercel. Auto-deploys from `main` branch.

```bash
# Push changes
git add -A && git commit -m "message" && git push

# Vercel auto-deploys on push
```

## Path Alias

`@/` maps to project root (configured in vite.config.ts and tsconfig.json)
