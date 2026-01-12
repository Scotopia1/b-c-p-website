# Terrene Website - Architecture & Technical Design

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Application Flow](#application-flow)
3. [Component Hierarchy](#component-hierarchy)
4. [Data Flow](#data-flow)
5. [Animation Pipeline](#animation-pipeline)
6. [Routing Architecture](#routing-architecture)
7. [Performance Optimizations](#performance-optimizations)
8. [Technical Decisions](#technical-decisions)

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Next.js App Router (v15)                 │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │          RootLayout (Server)                    │  │  │
│  │  │  ┌───────────────────────────────────────────┐  │  │  │
│  │  │  │    ClientLayout (Client)                  │  │  │  │
│  │  │  │  ┌─────────────────────────────────────┐  │  │  │  │
│  │  │  │  │  ViewTransitions Provider          │  │  │  │  │
│  │  │  │  │  ┌───────────────────────────────┐  │  │  │  │  │
│  │  │  │  │  │  ReactLenis (Smooth Scroll)  │  │  │  │  │  │
│  │  │  │  │  │  ┌─────────────────────────┐  │  │  │  │  │  │
│  │  │  │  │  │  │    TopBar (Fixed)      │  │  │  │  │  │  │
│  │  │  │  │  │  └─────────────────────────┘  │  │  │  │  │  │
│  │  │  │  │  │  ┌─────────────────────────┐  │  │  │  │  │  │
│  │  │  │  │  │  │    Page Content        │  │  │  │  │  │  │
│  │  │  │  │  │  │  - Nav (Overlay)       │  │  │  │  │  │  │
│  │  │  │  │  │  │  - Page Sections       │  │  │  │  │  │  │
│  │  │  │  │  │  │  - Components          │  │  │  │  │  │  │
│  │  │  │  │  │  └─────────────────────────┘  │  │  │  │  │  │
│  │  │  │  │  └───────────────────────────────┘  │  │  │  │  │
│  │  │  │  └─────────────────────────────────────┘  │  │  │  │
│  │  │  └───────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Technology Layers

```
┌──────────────────────────────────────────────────────────┐
│                    Presentation Layer                     │
│  - React Components (JSX)                                 │
│  - CSS Modules & Global Styles                            │
│  - GSAP Animations                                        │
└──────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────┐
│                  Application Layer                        │
│  - Next.js App Router                                     │
│  - React 19 Hooks & Context                               │
│  - Custom Hooks (useViewTransition)                       │
└──────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────┐
│                   Animation Layer                         │
│  - GSAP Core                                              │
│  - ScrollTrigger Plugin                                   │
│  - SplitText Plugin                                       │
│  - CustomEase Plugin                                      │
└──────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────┐
│                  Navigation Layer                         │
│  - next-view-transitions                                  │
│  - Lenis Smooth Scroll                                    │
│  - Next.js Router                                         │
└──────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────┐
│                      Data Layer                           │
│  - Static Content Files (.js data exports)                │
│  - Public Assets (Images, Icons)                          │
└──────────────────────────────────────────────────────────┘
```

---

## Application Flow

### Initial Page Load Flow

```
1. Browser Request
   ↓
2. Next.js Server Rendering
   ↓
3. HTML + CSS Delivered
   ↓
4. JavaScript Hydration
   ↓
5. Client Components Initialize
   ├─→ ClientLayout sets up Lenis
   ├─→ ViewTransitions provider ready
   ├─→ TopBar renders
   └─→ Page content renders
   ↓
6. GSAP Animations Initialize
   ├─→ Preloader (homepage only, first visit)
   ├─→ ScrollTrigger setup
   └─→ Component animations
   ↓
7. User Interaction Ready
```

### Homepage Preloader Flow

```
User arrives on homepage (first visit)
   ↓
isInitialLoad = true
   ↓
showPreloader state = true
   ↓
Lenis scroll STOPPED
   ↓
┌─────────────────────────────────┐
│  Preloader Animation Sequence   │
│  (Duration: ~10 seconds)         │
│                                  │
│  0-5s:  Counter Animation        │
│         - 5 digit counters       │
│         - Staggered reveals      │
│                                  │
│  5-7s:  Logo Transition          │
│         - "Terrene" → "Balance"  │
│         - Divider animation      │
│                                  │
│  7-10s: Page Reveal              │
│         - Block clip-paths       │
│         - Hero image scale       │
│         - Content fade-in        │
└─────────────────────────────────┘
   ↓
loaderAnimating = false
   ↓
Lenis scroll STARTED
   ↓
Page interactive
   ↓
isInitialLoad = false (on unmount)
```

### Navigation Flow

```
User clicks navigation link
   ↓
handleLinkClick(e, href)
   ├─→ e.preventDefault()
   ├─→ Check if same route (exit if true)
   └─→ Check if already navigating (exit if true)
   ↓
setIsNavigating(true)
   ↓
navigateWithTransition(href)
   ├─→ Old page: fade out + scale(0.5)
   └─→ New page: circular reveal
   ↓
Next.js router.push(href)
   ↓
Page transition (2s)
   ↓
New page loads
   ├─→ Components initialize
   ├─→ GSAP animations run
   └─→ Lenis scroll reset
   ↓
User on new page
```

### Menu Toggle Flow

```
User clicks MenuBtn
   ↓
toggleMenu() called
   ↓
Check guards:
├─→ isAnimating? → Exit
├─→ !isInitialized? → Exit
└─→ isNavigating? → Exit
   ↓
setIsOpen(!isOpen)
   ↓
┌─────────────────────┐    ┌─────────────────────┐
│   Opening Menu      │    │   Closing Menu      │
├─────────────────────┤    ├─────────────────────┤
│ Lenis STOP          │    │ Text lines → -120%  │
│ Body class added    │    │ (Staggered, 0-0.5s) │
│ Circle 0→100% (2s)  │    │                     │
│ Text lines → 0%     │    │ Circle 100→0% (1s)  │
│ (Staggered, 0.35s+) │    │ (Delay: 0.75s)      │
│ Menu interactive    │    │                     │
└─────────────────────┘    │ Lenis START         │
                           │ Body class removed  │
                           │ Menu non-interactive│
                           └─────────────────────┘
   ↓
isAnimating = false
```

### Scroll Animation Flow

```
Page scrolls
   ↓
Lenis smooth scroll active
   ↓
GSAP ScrollTrigger monitoring
   ↓
Element enters viewport (trigger point)
   ↓
ScrollTrigger fires
   ↓
Animation executes
   ├─→ Copy component: text reveals
   ├─→ Images: fade/scale in
   └─→ Tags: slide in with stagger
   ↓
Animation completes
   ↓
Element visible/interactive
```

---

## Component Hierarchy

### Complete Component Tree

```
RootLayout (Server Component)
├─ metadata
├─ ClientLayout (Client Component)
│  ├─ ViewTransitions Provider
│  │  └─ ReactLenis (Smooth Scroll)
│  │     ├─ TopBar
│  │     └─ {children} (Page Content)
│
└─ Page Components
   ├─ page.js (Homepage)
   │  ├─ Nav (Overlay)
   │  │  └─ MenuBtn
   │  ├─ Preloader (Conditional)
   │  ├─ Hero Section
   │  │  ├─ Copy × multiple
   │  │  └─ AnimatedButton
   │  ├─ Stats Section
   │  │  └─ Copy × 8
   │  ├─ What We Do Section
   │  │  ├─ Copy × 3
   │  │  └─ Tags (with ScrollTrigger)
   │  ├─ Featured Projects Container
   │  │  ├─ Copy × 2
   │  │  └─ FeaturedProjects
   │  ├─ Client Reviews Container
   │  │  └─ ClientReviews
   │  ├─ Gallery Callout Section
   │  │  ├─ Copy
   │  │  └─ AnimatedButton
   │  ├─ CTAWindow
   │  └─ ConditionalFooter
   │     └─ Footer
   │
   ├─ studio/page.jsx
   │  ├─ Nav
   │  ├─ Studio Content
   │  └─ ConditionalFooter
   │
   ├─ spaces/page.jsx
   │  ├─ Nav
   │  ├─ Spaces Content
   │  │  └─ Data from spaces.js
   │  └─ ConditionalFooter
   │
   ├─ sample-space/page.jsx
   │  ├─ Nav
   │  ├─ Sample Space Content
   │  └─ ConditionalFooter
   │
   ├─ blueprints/page.jsx
   │  ├─ Nav
   │  ├─ Gallery
   │  │  └─ Data from items.js
   │  └─ ConditionalFooter
   │
   └─ connect/page.jsx
      ├─ Nav
      ├─ Contact Form
      └─ ConditionalFooter
```

### Component Dependencies

```
Page Components
├─ Depend on:
│  ├─ Nav (navigation)
│  ├─ Copy (text animations)
│  ├─ AnimatedButton (CTAs)
│  ├─ ConditionalFooter (footer)
│  └─ Page-specific components
│
Nav Component
├─ Depends on:
│  ├─ MenuBtn (toggle)
│  ├─ useViewTransition (navigation)
│  ├─ useLenis (scroll control)
│  ├─ GSAP + SplitText (animations)
│  └─ useRouter (Next.js routing)
│
Copy Component
├─ Depends on:
│  ├─ GSAP (animations)
│  └─ ScrollTrigger (scroll triggers)
│
AnimatedButton Component
├─ Depends on:
│  ├─ GSAP (animations)
│  ├─ ScrollTrigger (scroll triggers)
│  └─ useViewTransition (navigation)
│
ClientLayout Component
├─ Depends on:
│  ├─ ReactLenis (smooth scroll)
│  ├─ ViewTransitions (page transitions)
│  └─ useState/useEffect (state management)
```

---

## Data Flow

### Static Content Flow

```
┌──────────────────────────────────────────────┐
│         Content Data Files                   │
│  - featured-projects-content.js              │
│  - client-reviews-content.js                 │
│  - items.js (gallery)                        │
│  - spaces.js                                 │
└──────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────┐
│         Import into Components               │
│  import { projects } from './content.js'     │
└──────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────┐
│         Map/Render in Component              │
│  projects.map(project => <Card {...} />)     │
└──────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────┐
│         Display in UI                        │
└──────────────────────────────────────────────┘
```

### State Management Flow

```
Component State (useState)
├─ isOpen (Nav menu)
├─ isAnimating (Animation guard)
├─ isNavigating (Navigation guard)
├─ showPreloader (Homepage only)
└─ loaderAnimating (Scroll lock)
   ↓
Props Flow Down
├─ isOpen → MenuBtn
└─ toggleMenu → MenuBtn
   ↓
Events Bubble Up
├─ onClick → toggleMenu()
└─ handleLinkClick → navigateWithTransition()
```

### Animation State Flow

```
GSAP Animations (Refs)
├─ useRef for DOM elements
│  ├─ menuRef
│  ├─ tagsRef
│  └─ splitTextRefs (array)
├─ useGSAP hook for animations
│  ├─ Scope: containerRef
│  └─ Dependencies: [triggers]
└─ ScrollTrigger state
   ├─ Triggers auto-managed
   └─ Cleanup on unmount
```

---

## Animation Pipeline

### GSAP Animation Lifecycle

```
Component Mount
   ↓
useLayoutEffect (for GSAP setup)
   ├─ Register plugins
   ├─ Create custom eases
   ├─ Initialize SplitText
   └─ Set initial states
   ↓
useGSAP hook
   ├─ Create animations
   ├─ Setup ScrollTriggers
   └─ Return cleanup function
   ↓
Render → User sees initial state
   ↓
Animation Execution
   ├─ Immediate (delay-based)
   └─ Scroll-triggered
   ↓
Animation Complete
   ↓
Component Unmount
   ├─ GSAP auto-cleanup (via useGSAP)
   └─ ScrollTrigger.kill()
```

### Animation Timing Strategy

```
Homepage Animation Cascade:

Preloader Complete
   ↓
Hero Section (Delays: 0.85s - 1.15s)
├─ Hero title: delay=0.85s
├─ Hero tagline: delay=1.0s
└─ Hero button: delay=1.15s
   ↓
Stats Section (Delays: 0.1s - 0.45s)
├─ Stat 1 count: delay=0.1s
├─ Stat 1 info: delay=0.15s
├─ Stat 2 count: delay=0.2s
├─ ...
└─ Stat 4 info: delay=0.45s
   ↓
What We Do Section
├─ Header: delay=0.1s
├─ Description: delay=0.15s
└─ Tags: ScrollTrigger (stagger=0.1s)
   ↓
Featured Projects
├─ Callout: delay=0.1s
└─ Header: delay=0.15s
   ↓
(Rest: Scroll-triggered)
```

### Custom Easing Functions

```javascript
// "hop" easing - Used throughout
CustomEase.create("hop", "0.9, 0, 0.1, 1");

// Bezier curve visualization:
// Start: Quick acceleration (0.9)
// End: Smooth deceleration (0.1, 1)
// Effect: Bouncy, energetic feel

// View transition easing
cubic-bezier(0.87, 0, 0.13, 1)
// Effect: Smooth in/out with emphasis on exit
```

---

## Routing Architecture

### App Router File Structure

```
src/app/
├─ layout.js              → Root layout (all pages)
├─ page.js                → Homepage (/)
├─ globals.css            → Global styles
├─ favicon.ico            → Site icon
│
├─ studio/
│  ├─ page.jsx            → /studio route
│  └─ studio.css          → Studio page styles
│
├─ spaces/
│  ├─ page.jsx            → /spaces route
│  ├─ spaces.css          → Spaces page styles
│  └─ spaces.js           → Spaces data
│
├─ sample-space/
│  ├─ page.jsx            → /sample-space route
│  └─ sample-space.css    → Sample space styles
│
├─ blueprints/
│  └─ page.jsx            → /blueprints route
│
└─ connect/
   ├─ page.jsx            → /connect route
   └─ contact.css         → Contact page styles
```

### Route Transitions

```
Old Route (Exit)
├─ View Transition API triggers
├─ ::view-transition-old pseudo-element
├─ Animation: opacity 1→0, scale 1→0.5
└─ Duration: 2000ms

New Route (Enter)
├─ ::view-transition-new pseudo-element
├─ Animation: clipPath circle 0%→75%
└─ Duration: 2000ms

Both run simultaneously
```

---

## Performance Optimizations

### Code Splitting

```
Next.js Automatic Code Splitting:
├─ Each page = separate bundle
├─ Shared components = common chunks
└─ Dynamic imports for large components

Bundle Strategy:
├─ page.js → Homepage bundle
├─ studio/page.jsx → Studio bundle
├─ Nav component → Shared chunk
└─ GSAP → Vendor chunk
```

### Image Optimization

```
Next.js Image Optimization:
├─ Automatic format conversion (WebP/AVIF)
├─ Responsive image sizing
├─ Lazy loading by default
└─ Blur placeholders

Public Assets:
├─ /public/home/ → Homepage images
├─ /public/featured-projects/ → Project images
├─ /public/client-reviews/ → Testimonial images
└─ All optimized on build
```

### Animation Performance

```
GSAP Performance Best Practices:
├─ Transform & opacity only (GPU-accelerated)
├─ will-change CSS hints
├─ Scoped animations (useGSAP scope)
├─ Auto-cleanup on unmount
└─ RequestAnimationFrame under the hood

Lenis Performance:
├─ Native smooth scroll
├─ RAF-based updates
├─ Device-specific configs
└─ Minimal repaints
```

### Scroll Performance

```
Lenis Configuration:
├─ lerp: 0.09-0.1 (smooth interpolation)
├─ duration: 0.8-1.2s (transition time)
├─ smoothWheel: true (desktop)
├─ smoothTouch: true/false (responsive)
└─ Prevents layout thrashing

ScrollTrigger Optimization:
├─ once: true (single-fire triggers)
├─ Minimal DOM queries
├─ Cached element references
└─ Auto-refresh on resize
```

---

## Technical Decisions

### Why Next.js 15 App Router?

**Benefits:**
- Server Components for better performance
- Improved routing with layouts
- Built-in image optimization
- Automatic code splitting
- SEO-friendly SSR

**Trade-offs:**
- Client components needed for interactivity
- Learning curve for App Router
- "use client" directive required

### Why GSAP over CSS Animations?

**GSAP Advantages:**
- More precise timing control
- Complex animation sequences
- ScrollTrigger integration
- Better browser compatibility
- Runtime animation manipulation

**CSS Animation Use Cases:**
- Simple hover states
- Static transitions
- Performance-critical animations

### Why Lenis over Native Scroll?

**Lenis Benefits:**
- Smooth, consistent scrolling
- Better user experience
- Mobile scroll feel on desktop
- Easy scroll control (stop/start)
- Integrates with GSAP

**Implementation:**
```javascript
// Responsive configuration
const scrollSettings = isMobile ? {...} : {...};
<ReactLenis root options={scrollSettings}>
```

### Why View Transitions?

**Advantages:**
- Smooth page changes
- Native browser API
- Better perceived performance
- Customizable animations
- SEO-friendly (full page loads)

**Fallback:**
- Graceful degradation to instant navigation
- Progressive enhancement approach

### Component Organization Strategy

**Co-location:**
```
Component/
├─ Component.jsx    (Logic)
├─ Component.css    (Styles)
└─ content.js       (Data, if applicable)
```

**Benefits:**
- Easy to find related files
- Better maintainability
- Clear component boundaries
- Simpler imports

### Static Data vs CMS

**Current Approach:** Static data files (.js exports)

**Rationale:**
- Simple content structure
- No backend needed
- Version control for content
- Fast build times
- Easy to update

**Future Migration Path:**
- Can swap to CMS later
- Same component structure
- Change data source only

---

## System Constraints

### Browser Support
- Modern browsers (ES6+)
- View Transitions API (progressive enhancement)
- CSS Grid & Flexbox required
- GSAP: IE11+ (if needed)

### Performance Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90

### Accessibility Considerations
- Keyboard navigation supported
- Focus management in menu
- Prefers-reduced-motion respected
- ARIA labels where needed

---

## Security Considerations

### Content Security
- No user-generated content
- Static asset serving
- No backend API calls
- XSS not a concern

### Dependencies
- Regular npm audit
- GSAP Club license (if applicable)
- Next.js security updates
- React security patches

---

*Architecture document last updated: January 2026*
