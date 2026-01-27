# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Trusted AI Advisory Inc. corporate website - a bilingual (EN/FR) React application with AI-powered consultation features using Google Gemini.

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

## Architecture

**Tech Stack:** React 19 + TypeScript + Vite 6 + Tailwind CSS (CDN)

**Entry Points:**
- `index.html` - HTML template with Tailwind CDN and custom fonts (Inter, Space Grotesk)
- `index.tsx` - React mount point
- `App.tsx` - Root component managing language state and inquiry modal

**Component Structure:**
- `components/` - UI components (Header, Hero, Values, Services, FeaturedProject, AdvisoryBot, InquiryModal, Footer)
- `services/geminiService.ts` - Google Gemini API integration with two functions:
  - `getAdvisoryResponse()` - AI policy consultation chat
  - `generateInquirySummary()` - Generates strategic briefs from intake form data

**State Management:** React hooks only (useState). Language state (`'en' | 'fr'`) lifted to App level and passed as props.

**Internationalization:** Manual translation objects within each component (no i18n library).

**AI Integration:**
- Uses `@google/genai` SDK with `gemini-3-flash-preview` model
- API key exposed via Vite's `define` config as `process.env.API_KEY`
- System prompts configure the AI as "Strategic Intake Synthesizer" with embedded company service context

**Path Alias:** `@/` maps to project root (configured in vite.config.ts and tsconfig.json)
