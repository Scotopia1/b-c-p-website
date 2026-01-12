# Component Reference Guide

Quick reference for all components in the Terrene website project.

---

## Core Layout Components

### `layout.js` (Root Layout)
**Location:** `src/app/layout.js`
**Type:** Server Component

```javascript
export const metadata = {
  title: "Terrene | MWT by Codegrid",
  description: "Monthly Website Template by Codegrid | August 2025",
};

export default function RootLayout({ children })
```

**Purpose:** Root application wrapper
**Children:** Wraps entire app
**Key Features:**
- Global metadata
- ClientLayout integration
- TopBar inclusion

---

### `ClientLayout`
**Location:** `src/client-layout.js`
**Type:** Client Component

```javascript
export default function ClientLayout({ children })
```

**Props:**
- `children` - React nodes to wrap

**Features:**
- Lenis smooth scroll configuration
- ViewTransitions provider
- Responsive scroll settings
- Mobile detection (≤1000px)

**Configuration:**
```javascript
// Desktop scroll settings
{
  duration: 1.2,
  lerp: 0.1,
  smoothWheel: true,
  smoothTouch: false
}

// Mobile scroll settings
{
  duration: 0.8,
  lerp: 0.09,
  smoothWheel: true,
  smoothTouch: true,
  touchMultiplier: 1.5
}
```

---

## Navigation Components

### `Nav`
**Location:** `src/components/Nav/Nav.jsx`
**Type:** Client Component

```javascript
const Nav = () => { ... }
export default Nav;
```

**Props:** None

**State:**
- `isAnimating` - Animation in progress
- `isOpen` - Menu open state
- `isNavigating` - Page navigation in progress

**Features:**
- Full-screen overlay menu
- Circular clip-path reveal animation
- SplitText line animations
- Page transition integration
- Scroll lock when open

**Routes:**
- `/` - Index
- `/studio` - Studio
- `/spaces` - Our Spaces
- `/sample-space` - One Installation
- `/blueprints` - Blueprints
- `/connect` - Connect

**Animations:**
- Open: 2s circular reveal + staggered text
- Close: 1s reverse with 0.75s delay

**CSS:** `src/components/Nav/Nav.css`

---

### `TopBar`
**Location:** `src/components/TopBar/TopBar.jsx`
**Type:** Client Component

```javascript
export default function TopBar()
```

**Purpose:** Fixed top navigation bar
**Features:**
- Logo/branding display
- Fixed positioning
- Minimal design

**CSS:** `src/components/TopBar/TopBar.css`

---

### `MenuBtn`
**Location:** `src/components/MenuBtn/MenuBtn.jsx`
**Type:** Client Component

```javascript
export default function MenuBtn({ isOpen, toggleMenu })
```

**Props:**
- `isOpen` (boolean) - Menu state
- `toggleMenu` (function) - Toggle callback

**Features:**
- Animated hamburger icon
- Open/close transitions
- Accessibility support

**CSS:** `src/components/MenuBtn/MenuBtn.css`

---

## Content Components

### `FeaturedProjects`
**Location:** `src/components/FeaturedProjects/FeaturedProjects.jsx`
**Type:** Client Component

```javascript
export default function FeaturedProjects()
```

**Props:** None

**Data Source:** `src/components/FeaturedProjects/featured-projects-content.js`

**Features:**
- Project grid display
- Hover animations
- Responsive layout
- Image lazy loading

**Data Structure:**
```javascript
export const projects = [
  {
    id: 1,
    title: "Project Name",
    category: "Category",
    image: "/path/to/image.jpg",
    description: "Description text"
  },
  // ...
];
```

**CSS:** `src/components/FeaturedProjects/FeaturedProjects.css`

---

### `ClientReviews`
**Location:** `src/components/ClientReviews/ClientReviews.jsx`
**Type:** Client Component

```javascript
export default function ClientReviews()
```

**Props:** None

**Data Source:** `src/components/ClientReviews/client-reviews-content.js`

**Features:**
- Testimonial carousel
- Auto-rotation
- Client information display
- Smooth transitions

**Data Structure:**
```javascript
export const reviews = [
  {
    id: 1,
    name: "Client Name",
    company: "Company Name",
    review: "Review text...",
    image: "/path/to/image.jpg"
  },
  // ...
];
```

**CSS:** `src/components/ClientReviews/ClientReviews.css`

---

### `Gallery`
**Location:** `src/components/Gallery/Gallery.jsx`
**Type:** Client Component

```javascript
export default function Gallery()
```

**Props:** None (or configurable)

**Data Source:** `src/components/Gallery/items.js`

**Features:**
- Masonry grid layout
- Lightbox functionality
- Category filtering
- Responsive images

**Data Structure:**
```javascript
export const items = [
  {
    id: 1,
    src: "/path/to/image.jpg",
    alt: "Description",
    category: "Category"
  },
  // ...
];
```

**CSS:** `src/components/Gallery/Gallery.css`

---

### `CTAWindow`
**Location:** `src/components/CTAWindow/CTAWindow.jsx`
**Type:** Client Component

```javascript
export default function CTAWindow({ img, header, callout, description })
```

**Props:**
- `img` (string, required) - Background image path
- `header` (string, required) - Section title
- `callout` (string, required) - Tagline/callout text
- `description` (string, required) - Description content

**Example Usage:**
```jsx
<CTAWindow
  img="/home/home-cta-window.jpg"
  header="Terrene"
  callout="Spaces that breathe with time"
  description="Our approach is guided by rhythm, proportion, and light, allowing every environment to grow more meaningful as it is lived in."
/>
```

**Features:**
- Full-width background image
- Overlay content
- Scroll animations
- Responsive design

**CSS:** `src/components/CTAWindow/CTAWindow.css`

---

### `HowWeWork`
**Location:** `src/components/HowWeWork/HowWeWork.jsx`
**Type:** Client Component

```javascript
export default function HowWeWork()
```

**Props:** None (or configurable)

**Features:**
- Process step visualization
- Scroll-triggered animations
- Icon/illustration support
- Responsive layout

**CSS:** `src/components/HowWeWork/HowWeWork.css`

---

### `Spotlight`
**Location:** `src/components/Spotlight/Spotlight.jsx`
**Type:** Client Component

```javascript
export default function Spotlight({ ... })
```

**Features:**
- Hero-style content display
- Background image with parallax
- Content overlay
- Scroll effects

**CSS:** `src/components/Spotlight/Spotlight.css`

---

## Utility Components

### `Copy`
**Location:** `src/components/Copy/Copy.jsx`
**Type:** Client Component

```javascript
export default function Copy({ children, animateOnScroll = true, delay = 0 })
```

**Props:**
- `children` (ReactNode, required) - Content to animate
- `animateOnScroll` (boolean, optional, default: `true`) - Enable scroll trigger
- `delay` (number, optional, default: `0`) - Animation delay in seconds

**Example Usage:**
```jsx
<Copy animateOnScroll={false} delay={0.85}>
  <h1>Spaces that feel rooted, human, and quietly bold</h1>
</Copy>

<Copy delay={0.1}>
  <p>Your paragraph text</p>
</Copy>
```

**Features:**
- Text entrance animations
- Scroll-triggered or immediate
- Customizable delay
- GSAP-powered

**CSS:** `src/components/Copy/Copy.css`

---

### `AnimatedButton`
**Location:** `src/components/AnimatedButton/AnimatedButton.jsx`
**Type:** Client Component

```javascript
export default function AnimatedButton({
  label,
  route,
  animateOnScroll = true,
  delay = 0
})
```

**Props:**
- `label` (string, required) - Button text
- `route` (string, required) - Navigation destination
- `animateOnScroll` (boolean, optional, default: `true`) - Scroll trigger
- `delay` (number, optional, default: `0`) - Animation delay in seconds

**Example Usage:**
```jsx
<AnimatedButton
  label="Discover More"
  route="/studio"
  animateOnScroll={false}
  delay={1.15}
/>

<AnimatedButton
  label="Explore Gallery"
  route="/blueprints"
/>
```

**Features:**
- Hover animations
- View transition integration
- Scroll-triggered entrance
- Custom delays

**CSS:** `src/components/AnimatedButton/AnimatedButton.css`

---

### `Footer`
**Location:** `src/components/Footer/Footer.jsx`
**Type:** Client Component

```javascript
export default function Footer()
```

**Props:** None

**Features:**
- Contact information
- Social media links
- Copyright notice
- Multi-column layout

**CSS:** `src/components/Footer/Footer.css`

---

### `ConditionalFooter`
**Location:** `src/components/ConditionalFooter/ConditionalFooter.jsx`
**Type:** Client Component

```javascript
export default function ConditionalFooter()
```

**Props:** None

**Purpose:** Conditionally render Footer based on route/context

**Features:**
- Route detection
- Conditional rendering logic
- Footer component wrapper

**CSS:** None (uses Footer styles)

---

## Custom Hooks

### `useViewTransition`
**Location:** `src/hooks/useViewTransition.js`
**Type:** Custom Hook

```javascript
export const useViewTransition = () => {
  return { navigateWithTransition, router };
}
```

**Returns:**
- `navigateWithTransition(href, options)` - Navigation function with transitions
- `router` - Next.js transition router instance

**Example Usage:**
```javascript
import { useViewTransition } from '@/hooks/useViewTransition';

function Component() {
  const { navigateWithTransition } = useViewTransition();

  const handleClick = (e) => {
    e.preventDefault();
    navigateWithTransition('/studio');
  };

  return <a onClick={handleClick}>Go to Studio</a>;
}
```

**Transition Animation:**
- **Old page:** Fade out + scale down (0.5x)
- **New page:** Circular reveal from center
- **Duration:** 2000ms
- **Easing:** `cubic-bezier(0.87, 0, 0.13, 1)`

**Parameters:**
- `href` (string) - Destination path
- `options` (object) - Additional router options

---

## Page Components

### Homepage (`/`)
**Location:** `src/app/page.js`
**Type:** Client Component

**Sections:**
1. Preloader (first visit only)
2. Hero with background image
3. Hero stats (4 statistics)
4. What We Do section
5. Featured Projects
6. Client Reviews
7. Gallery Callout
8. CTA Window
9. Conditional Footer

**Key Features:**
- Preloader animation (~10s)
- Lenis scroll integration
- GSAP animations throughout
- Scroll-triggered tag animations

---

### Studio Page (`/studio`)
**Location:** `src/app/studio/page.jsx`
**Type:** Client Component

**Purpose:** About the studio/team page

**CSS:** `src/app/studio/studio.css`

---

### Spaces Page (`/spaces`)
**Location:** `src/app/spaces/page.jsx`
**Type:** Client Component

**Data:** `src/app/spaces/spaces.js`

**Purpose:** Multiple space showcases

**CSS:** `src/app/spaces/spaces.css`

---

### Sample Space Page (`/sample-space`)
**Location:** `src/app/sample-space/page.jsx`
**Type:** Client Component

**Purpose:** Deep-dive into single installation

**CSS:** `src/app/sample-space/sample-space.css`

---

### Blueprints Page (`/blueprints`)
**Location:** `src/app/blueprints/page.jsx`
**Type:** Client Component

**Purpose:** Project gallery/blueprint showcase

---

### Connect Page (`/connect`)
**Location:** `src/app/connect/page.jsx`
**Type:** Client Component

**Purpose:** Contact page

**CSS:** `src/app/connect/contact.css`

---

## Animation Utilities

### GSAP Setup
**Location:** Throughout components
**Plugins Used:**
- ScrollTrigger
- CustomEase
- SplitText

**Custom Ease:**
```javascript
gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");
```

**Common Pattern:**
```javascript
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

useGSAP(() => {
  gsap.to(element, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out"
  });
}, { scope: containerRef });
```

### ScrollTrigger Pattern
```javascript
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: element,
  start: "top 80%",
  once: true,
  animation: gsap.to(element, {
    opacity: 1,
    x: 0,
    duration: 0.8,
    stagger: 0.1
  })
});
```

---

## Content Data Files

### Featured Projects Data
**Location:** `src/components/FeaturedProjects/featured-projects-content.js`

**Structure:**
```javascript
export const featuredProjects = [
  {
    id: number,
    title: string,
    category: string,
    image: string,
    description?: string,
    link?: string
  }
];
```

---

### Client Reviews Data
**Location:** `src/components/ClientReviews/client-reviews-content.js`

**Structure:**
```javascript
export const clientReviews = [
  {
    id: number,
    name: string,
    company: string,
    role?: string,
    review: string,
    image?: string,
    rating?: number
  }
];
```

---

### Gallery Items Data
**Location:** `src/components/Gallery/items.js`

**Structure:**
```javascript
export const galleryItems = [
  {
    id: number,
    src: string,
    alt: string,
    category?: string,
    width?: number,
    height?: number
  }
];
```

---

### Spaces Data
**Location:** `src/app/spaces/spaces.js`

**Structure:**
```javascript
export const spaces = [
  {
    id: number,
    title: string,
    description: string,
    images: string[],
    details?: object
  }
];
```

---

## Styling Guidelines

### CSS File Locations
- **Global:** `src/app/globals.css`
- **Page-specific:** `src/app/[page]/[page].css`
- **Component-specific:** `src/components/[Component]/[Component].css`

### Common Classes
```css
.container          /* Max-width container */
.hero               /* Hero section */
.section            /* Generic section */
.copy-wrapper       /* Copy component wrapper */
.fade-in            /* Fade-in animation */
.slide-up           /* Slide-up animation */
```

### Responsive Breakpoints
```css
/* Mobile */
@media (max-width: 1000px) { }

/* Desktop */
@media (min-width: 1001px) { }
```

---

## Quick Reference: Component Import Paths

```javascript
// Layout
import ClientLayout from '@/client-layout';

// Navigation
import Nav from '@/components/Nav/Nav';
import TopBar from '@/components/TopBar/TopBar';
import MenuBtn from '@/components/MenuBtn/MenuBtn';

// Content
import FeaturedProjects from '@/components/FeaturedProjects/FeaturedProjects';
import ClientReviews from '@/components/ClientReviews/ClientReviews';
import Gallery from '@/components/Gallery/Gallery';
import CTAWindow from '@/components/CTAWindow/CTAWindow';
import HowWeWork from '@/components/HowWeWork/HowWeWork';
import Spotlight from '@/components/Spotlight/Spotlight';

// Utilities
import Copy from '@/components/Copy/Copy';
import AnimatedButton from '@/components/AnimatedButton/AnimatedButton';
import Footer from '@/components/Footer/Footer';
import ConditionalFooter from '@/components/ConditionalFooter/ConditionalFooter';

// Hooks
import { useViewTransition } from '@/hooks/useViewTransition';
```

---

## Common Tasks

### Add New Navigation Link
**File:** `src/components/Nav/Nav.jsx`

```jsx
<div className="link">
  <a href="/new-page" onClick={(e) => handleLinkClick(e, "/new-page")}>
    <h2>New Page Title</h2>
  </a>
</div>
```

### Add New Featured Project
**File:** `src/components/FeaturedProjects/featured-projects-content.js`

```javascript
{
  id: nextId,
  title: "Project Title",
  category: "Category",
  image: "/featured-projects/project-image.jpg",
  description: "Description text"
}
```

### Add New Client Review
**File:** `src/components/ClientReviews/client-reviews-content.js`

```javascript
{
  id: nextId,
  name: "Client Name",
  company: "Company Name",
  review: "Review text here...",
  image: "/client-reviews/client-photo.jpg"
}
```

### Create Animated Section
```jsx
<section className="custom-section">
  <div className="container">
    <Copy delay={0.1}>
      <h2>Section Title</h2>
    </Copy>
    <Copy delay={0.2}>
      <p>Section description...</p>
    </Copy>
    <AnimatedButton
      label="Learn More"
      route="/destination"
      delay={0.3}
    />
  </div>
</section>
```

---

*Component Reference last updated: January 2026*
