# Terrene Website - Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Key Components](#key-components)
5. [Routing & Navigation](#routing--navigation)
6. [Animation System](#animation-system)
7. [Styling Architecture](#styling-architecture)
8. [Development Guide](#development-guide)
9. [Deployment](#deployment)

---

## Project Overview

**Project Name:** Terrene
**Type:** Website
**Framework:** Next.js 15.4.6
**Purpose:** BCP Partnership Website - Interior design and architecture studio showcase

Terrene is a modern, animation-rich website for an interior design and architecture studio. The site features smooth scrolling, page transitions, and sophisticated GSAP animations to create an immersive user experience showcasing spatial design work.

---

## Technology Stack

### Core Framework
- **Next.js 15.4.6** - React framework with App Router
- **React 19.1.0** - UI library
- **React DOM 19.1.0** - DOM-specific methods

### Animation & Effects
- **GSAP 3.13.0** - Core animation library
  - ScrollTrigger - Scroll-based animations
  - CustomEase - Custom easing functions
  - SplitText - Text splitting for animations
- **@gsap/react 2.1.2** - React hooks for GSAP
- **split-type 0.3.4** - Advanced text splitting utilities

### Smooth Scrolling & Transitions
- **Lenis 1.3.8** - Smooth scrolling library
- **next-view-transitions 0.3.4** - Page transition animations

### UI Components
- **react-icons 5.5.0** - Icon library

### Configuration
- **jsconfig.json** - Path aliases configuration (@/ → ./src/*)

---

## Project Structure

```
website/
├── public/                      # Static assets
│   ├── archive/                # Archived images
│   ├── client-reviews/         # Client testimonial images
│   ├── clients/                # Client logo images
│   ├── contact/                # Contact page images
│   ├── featured-projects/      # Project showcase images
│   ├── gallery-callout/        # Gallery teaser images
│   ├── home/                   # Homepage hero & CTA images
│   ├── how-we-work/            # Process section images
│   ├── logos/                  # Brand logos
│   ├── sample-space/           # Sample installation images
│   ├── spaces/                 # Space showcase images
│   ├── spotlight/              # Featured content images
│   └── studio/                 # Studio page images
│
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── blueprints/         # Gallery/blueprint page
│   │   ├── connect/            # Contact page
│   │   ├── sample-space/       # Single installation showcase
│   │   ├── spaces/             # Multiple spaces showcase
│   │   ├── studio/             # About/studio page
│   │   ├── favicon.ico         # Site favicon
│   │   ├── icon.png            # App icon
│   │   ├── globals.css         # Global styles
│   │   ├── index.css           # Homepage styles
│   │   ├── preloader.css       # Loading animation styles
│   │   ├── layout.js           # Root layout component
│   │   └── page.js             # Homepage component
│   │
│   ├── components/             # Reusable components
│   │   ├── AnimatedButton/     # Call-to-action button with animations
│   │   ├── ClientReviews/      # Testimonial carousel
│   │   ├── ConditionalFooter/  # Footer with conditional rendering
│   │   ├── Copy/               # Text animation wrapper
│   │   ├── CTAWindow/          # Call-to-action section
│   │   ├── FeaturedProjects/   # Project showcase grid
│   │   ├── Footer/             # Site footer
│   │   ├── Gallery/            # Image gallery component
│   │   ├── HowWeWork/          # Process/methodology section
│   │   ├── MenuBtn/            # Hamburger menu button
│   │   ├── Nav/                # Navigation menu overlay
│   │   ├── Spotlight/          # Featured content highlight
│   │   └── TopBar/             # Fixed top navigation bar
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── useViewTransition.js # Page transition hook
│   │
│   └── client-layout.js        # Client-side layout wrapper
│
├── node_modules/               # Dependencies
├── .gitignore                  # Git ignore rules
├── jsconfig.json               # JavaScript configuration
├── next.config.mjs             # Next.js configuration
├── package.json                # Project dependencies
├── package-lock.json           # Dependency lock file
├── pnpm-lock.yaml             # PNPM lock file
└── README.md                   # Getting started guide
```

---

## Key Components

### Layout Components

#### `src/app/layout.js`
**Purpose:** Root layout wrapper for the entire application
**Key Features:**
- Sets up global metadata (title, description)
- Imports global CSS
- Wraps application in ClientLayout
- Includes TopBar on all pages

**Usage:**
```javascript
export const metadata = {
  title: "Terrene | MWT by Codegrid",
  description: "Monthly Website Template by Codegrid | August 2025",
};
```

#### `src/client-layout.js`
**Purpose:** Client-side layout configuration for smooth scrolling and transitions
**Key Features:**
- Configures Lenis smooth scrolling with device-specific settings
- Wraps application in ViewTransitions provider
- Responsive scroll configuration (mobile vs desktop)

**Scroll Settings:**
- Desktop: 1.2s duration, lerp 0.1
- Mobile: 0.8s duration, lerp 0.09, touch-optimized

---

### Navigation Components

#### `src/components/Nav/Nav.jsx`
**Purpose:** Full-screen overlay navigation menu
**Location:** `src/components/Nav/Nav.jsx`

**Key Features:**
- Animated menu overlay with circular reveal
- SplitText line-by-line text animations
- Page transition integration
- Prevents scrolling when open
- Smooth navigation with view transitions

**Navigation Links:**
- Index (/)
- Studio (/studio)
- Our Spaces (/spaces)
- One Installation (/sample-space)
- Blueprints (/blueprints)
- Connect (/connect)

**Animation Flow:**
1. Menu button clicked → circular clip-path reveal
2. Text lines animate in with stagger
3. Link clicked → text animates out → page transition
4. Circular clip-path closes

#### `src/components/TopBar/TopBar.jsx`
**Purpose:** Fixed top navigation bar
**Features:**
- Logo/branding display
- Fixed positioning
- Minimal, clean design

#### `src/components/MenuBtn/MenuBtn.jsx`
**Purpose:** Hamburger menu toggle button
**Features:**
- Animated hamburger icon
- Open/close state animations
- Integrated with Nav component

---

### Content Components

#### `src/components/FeaturedProjects/FeaturedProjects.jsx`
**Purpose:** Showcase grid of design projects
**Location:** `src/components/FeaturedProjects/`

**Data Source:** `featured-projects-content.js`
**Features:**
- Project cards with images
- Hover animations
- Lazy loading for images
- Responsive grid layout

#### `src/components/ClientReviews/ClientReviews.jsx`
**Purpose:** Client testimonial carousel/slider
**Location:** `src/components/ClientReviews/`

**Data Source:** `client-reviews-content.js`
**Features:**
- Rotating testimonials
- Client information display
- Smooth transitions between reviews

#### `src/components/Gallery/Gallery.jsx`
**Purpose:** Image gallery component
**Location:** `src/components/Gallery/`

**Data Source:** `items.js`
**Features:**
- Grid-based image layout
- Lightbox functionality
- Category filtering
- Masonry-style arrangement

#### `src/components/CTAWindow/CTAWindow.jsx`
**Purpose:** Call-to-action section with background image
**Props:**
- `img` - Background image path
- `header` - Section title
- `callout` - Tagline
- `description` - Descriptive text

**Usage:**
```jsx
<CTAWindow
  img="/home/home-cta-window.jpg"
  header="Terrene"
  callout="Spaces that breathe with time"
  description="Our approach is guided by rhythm, proportion, and light..."
/>
```

#### `src/components/Copy/Copy.jsx`
**Purpose:** Animated text wrapper component
**Props:**
- `children` - Text content to animate
- `animateOnScroll` - Whether to trigger on scroll (default: true)
- `delay` - Animation delay in seconds

**Features:**
- Scroll-triggered text animations
- Customizable delay
- GSAP-powered effects

#### `src/components/AnimatedButton/AnimatedButton.jsx`
**Purpose:** Interactive button with hover animations
**Props:**
- `label` - Button text
- `route` - Navigation destination
- `animateOnScroll` - Scroll animation toggle
- `delay` - Animation delay

**Features:**
- Hover state animations
- View transition integration
- Scroll-based entrance animations

---

### Utility Components

#### `src/components/ConditionalFooter/ConditionalFooter.jsx`
**Purpose:** Footer with conditional rendering logic
**Features:**
- Shows/hides based on page context
- Route-aware rendering

#### `src/components/Footer/Footer.jsx`
**Purpose:** Site footer
**Features:**
- Contact information
- Social links
- Copyright information

#### `src/components/HowWeWork/HowWeWork.jsx`
**Purpose:** Process/methodology showcase section
**Features:**
- Step-by-step process visualization
- Animated content reveal

#### `src/components/Spotlight/Spotlight.jsx`
**Purpose:** Featured content highlight component
**Features:**
- Hero-style content display
- Background images with parallax

---

## Routing & Navigation

### App Router Structure

The project uses Next.js 15's App Router with file-based routing:

| Route | File | Purpose |
|-------|------|---------|
| `/` | `src/app/page.js` | Homepage with hero, stats, featured projects |
| `/studio` | `src/app/studio/page.jsx` | About the studio/team |
| `/spaces` | `src/app/spaces/page.jsx` | Multiple space showcases |
| `/sample-space` | `src/app/sample-space/page.jsx` | Single installation deep-dive |
| `/blueprints` | `src/app/blueprints/page.jsx` | Project gallery/blueprints |
| `/connect` | `src/app/connect/page.jsx` | Contact page |

### Navigation System

**View Transitions:**
Custom hook `useViewTransition` provides smooth page transitions:

```javascript
// src/hooks/useViewTransition.js
const { navigateWithTransition } = useViewTransition();

// Usage
navigateWithTransition('/studio');
```

**Transition Animation:**
- Old page: Fades out + scales down (2s)
- New page: Circular reveal from center (2s)
- Easing: `cubic-bezier(0.87, 0, 0.13, 1)`

---

## Animation System

### GSAP Configuration

**Registered Plugins:**
- ScrollTrigger - Scroll-based animations
- CustomEase - Custom easing curves
- SplitText - Text line/character splitting

**Custom Easing:**
```javascript
CustomEase.create("hop", "0.9, 0, 0.1, 1");
// Used throughout for smooth, bouncy animations
```

### Homepage Preloader Animation

**Location:** `src/app/page.js`
**Duration:** ~10 seconds
**Flow:**
1. **Counter animation** (0-5s)
   - Numbers animate in digit by digit
   - 5 separate counts displayed
   - Staggered timing

2. **Logo reveal** (5-7s)
   - "Terrene" slides in
   - Transforms to "Balance"
   - Divider line scales vertically

3. **Page reveal** (7-10s)
   - Overlay blocks clip upward
   - Hero image scales to normal size
   - Page becomes interactive

**Key Variables:**
```javascript
let isInitialLoad = true; // Ensures preloader only shows once
const [loaderAnimating, setLoaderAnimating] = useState(false);
```

### Scroll-Triggered Animations

**Copy Component Pattern:**
```javascript
<Copy animateOnScroll={true} delay={0.1}>
  <h1>Your text here</h1>
</Copy>
```

**What-We-Do Tags Animation:**
```javascript
ScrollTrigger.create({
  trigger: tagsRef.current,
  start: "top 90%",
  once: true,
  animation: gsap.to(tags, {
    opacity: 1,
    x: 0,
    duration: 0.8,
    stagger: 0.1,
  })
});
```

### Navigation Menu Animations

**Open Animation:**
- Menu: Circle clip-path from 0% to 100% (2s)
- Text lines: Slide up from 120% to 0% (staggered)
- Delay: 0.35s + 0.1s per element

**Close Animation:**
- Text lines: Slide up to -120% (staggered, faster)
- Menu: Circle clip-path from 100% to 0% (1s)
- Delay: 0.75s before menu closes

---

## Styling Architecture

### CSS Organization

**Global Styles:**
- `src/app/globals.css` - Reset, typography, utilities
- `src/app/index.css` - Homepage-specific styles
- `src/app/preloader.css` - Preloader animations

**Component Styles:**
Each component has a co-located CSS file:
```
Component/
├── Component.jsx
└── Component.css
```

**Page Styles:**
Each page route can have associated CSS:
```
spaces/
├── page.jsx
└── spaces.css
```

### Responsive Design

**Breakpoints:**
- Mobile: ≤ 1000px
- Desktop: > 1000px

**Mobile Considerations:**
- Different Lenis scroll settings
- Touch-optimized scroll multipliers
- Adjusted animation timings

---

## Development Guide

### Prerequisites
- Node.js (LTS version recommended)
- npm, yarn, pnpm, or bun package manager

### Getting Started

1. **Install dependencies:**
```bash
npm install
# or
pnpm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Open browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

4. **Start editing:**
- Homepage: `src/app/page.js`
- Components: `src/components/`
- Styles: Co-located `.css` files

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

### Path Aliases

The project uses `@/` alias for cleaner imports:

```javascript
// Instead of:
import Nav from '../../components/Nav/Nav';

// Use:
import Nav from '@/components/Nav/Nav';
```

**Configuration:** `jsconfig.json`
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Adding New Pages

1. Create page directory in `src/app/`:
```bash
mkdir src/app/new-page
```

2. Add page component:
```javascript
// src/app/new-page/page.jsx
export default function NewPage() {
  return <div>New Page Content</div>;
}
```

3. (Optional) Add page styles:
```css
/* src/app/new-page/new-page.css */
.new-page-container {
  /* styles */
}
```

4. Add navigation link in `Nav.jsx`:
```jsx
<div className="link">
  <a href="/new-page" onClick={(e) => handleLinkClick(e, "/new-page")}>
    <h2>New Page</h2>
  </a>
</div>
```

### Adding New Components

1. Create component directory:
```bash
mkdir src/components/NewComponent
```

2. Create component files:
```javascript
// src/components/NewComponent/NewComponent.jsx
import './NewComponent.css';

export default function NewComponent() {
  return <div className="new-component">Content</div>;
}
```

```css
/* src/components/NewComponent/NewComponent.css */
.new-component {
  /* styles */
}
```

3. Import and use:
```javascript
import NewComponent from '@/components/NewComponent/NewComponent';
```

### Working with GSAP Animations

**Basic Pattern:**
```javascript
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Component() {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.to(ref.current, {
      opacity: 1,
      duration: 1
    });
  }, { scope: ref });

  return <div ref={ref}>Content</div>;
}
```

**Scroll-Triggered:**
```javascript
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: element,
  start: "top 80%",
  animation: gsap.to(element, { y: 0 })
});
```

### Content Management

**Featured Projects:**
Edit `src/components/FeaturedProjects/featured-projects-content.js`

**Client Reviews:**
Edit `src/components/ClientReviews/client-reviews-content.js`

**Gallery Items:**
Edit `src/components/Gallery/items.js`

---

## Deployment

### Production Build

```bash
npm run build
```

This creates an optimized production build in `.next/` directory.

### Vercel Deployment (Recommended)

1. Push code to GitHub repository
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically

**Configuration:**
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`

### Environment Variables

No environment variables currently configured. Add `.env.local` for any future needs:

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Static Export (Optional)

For static hosting, update `next.config.mjs`:

```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
};
```

Then run:
```bash
npm run build
```

This creates static files in `out/` directory.

---

## Additional Resources

### Next.js Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [Next.js Learn](https://nextjs.org/learn)

### GSAP Resources
- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP React Guide](https://greensock.com/react/)

### Lenis Smooth Scroll
- [Lenis GitHub](https://github.com/studio-freight/lenis)
- [Lenis Documentation](https://github.com/studio-freight/lenis#usage)

---

## Project Metadata

**Project Name:** Terrene
**Version:** 0.1.0
**Framework:** Next.js 15.4.6
**Purpose:** BCP Partnership Website
**Last Updated:** January 2026

---

*This documentation was generated for the Terrene website project. For questions or updates, please refer to the development team.*
