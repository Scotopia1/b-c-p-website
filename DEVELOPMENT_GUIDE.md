# Development Guide - Terrene Website

A comprehensive guide for developers working on the Terrene website project.

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Code Patterns & Best Practices](#code-patterns--best-practices)
4. [Animation Guidelines](#animation-guidelines)
5. [Styling Guidelines](#styling-guidelines)
6. [Common Tasks](#common-tasks)
7. [Troubleshooting](#troubleshooting)
8. [Testing](#testing)
9. [Deployment Checklist](#deployment-checklist)

---

## Getting Started

### Environment Setup

1. **Prerequisites:**
```bash
Node.js: v18+ (LTS recommended)
Package Manager: npm, pnpm, or yarn
Code Editor: VS Code recommended
```

2. **Clone and Install:**
```bash
cd website
npm install
```

3. **Development Server:**
```bash
npm run dev
# Opens at http://localhost:3000
```

4. **Verify Setup:**
- Homepage loads with preloader
- Navigation menu opens/closes
- Smooth scrolling works
- Page transitions smooth

### Recommended VS Code Extensions

```
- ES7+ React/Redux/React-Native snippets
- ESLint
- Prettier - Code formatter
- CSS Peek
- Auto Rename Tag
- Path Intellisense
- GSAP Snippets (community)
```

### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.css": "css"
  }
}
```

---

## Development Workflow

### Branch Strategy

```
main
├─ feature/new-page
├─ feature/component-name
├─ fix/bug-description
└─ refactor/area-name
```

### Commit Message Convention

```
feat: Add new gallery component
fix: Resolve menu animation bug
style: Update homepage hero spacing
refactor: Optimize GSAP animations
docs: Update component documentation
```

### Development Cycle

```
1. Create feature branch
   git checkout -b feature/new-component

2. Develop locally
   npm run dev

3. Test changes
   - Visual testing
   - Cross-browser check
   - Mobile responsiveness
   - Animation smoothness

4. Build test
   npm run build
   npm start

5. Commit changes
   git add .
   git commit -m "feat: description"

6. Push and PR
   git push origin feature/new-component
```

---

## Code Patterns & Best Practices

### Component Structure Pattern

**Standard Component Template:**

```javascript
"use client";
import './ComponentName.css';
import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function ComponentName({ prop1, prop2 }) {
  // 1. State declarations
  const [state, setState] = useState(initialValue);

  // 2. Ref declarations
  const containerRef = useRef(null);
  const elementRef = useRef(null);

  // 3. Hooks (useEffect, custom hooks)
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  // 4. GSAP animations
  useGSAP(() => {
    gsap.to(elementRef.current, {
      // animation properties
    });
  }, { scope: containerRef });

  // 5. Event handlers
  const handleClick = () => {
    // handler logic
  };

  // 6. Helper functions
  const helperFunction = () => {
    // helper logic
  };

  // 7. Return JSX
  return (
    <div className="component-name" ref={containerRef}>
      <div ref={elementRef}>Content</div>
    </div>
  );
}
```

### Client vs Server Components

**Use Server Components for:**
```javascript
// No interactivity needed
// Static content
// Layout components without state

export default function Layout({ children }) {
  return <div>{children}</div>;
}
```

**Use Client Components for:**
```javascript
"use client";
// Requires useState, useEffect, or event handlers
// GSAP animations
// Interactive elements

export default function Interactive() {
  const [state, setState] = useState(false);
  return <button onClick={() => setState(!state)}>Toggle</button>;
}
```

### Import Organization

```javascript
// 1. React imports
import { useState, useEffect, useRef } from 'react';

// 2. Next.js imports
import { useRouter } from 'next/navigation';

// 3. Third-party libraries
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 4. Internal components
import Nav from '@/components/Nav/Nav';
import Copy from '@/components/Copy/Copy';

// 5. Hooks
import { useViewTransition } from '@/hooks/useViewTransition';

// 6. Styles
import './Component.css';
```

### State Management Patterns

**Local State (useState):**
```javascript
// Simple component state
const [isOpen, setIsOpen] = useState(false);
const [count, setCount] = useState(0);

// Complex state object
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});
```

**Derived State:**
```javascript
// Don't create unnecessary state
const [items, setItems] = useState([...]);

// Good - Derive from existing state
const itemCount = items.length;
const hasItems = items.length > 0;

// Bad - Redundant state
const [itemCount, setItemCount] = useState(0);
```

**State Updates:**
```javascript
// Functional updates for state based on previous state
setCount(prevCount => prevCount + 1);

// Object state updates
setFormData(prev => ({
  ...prev,
  name: 'New Name'
}));
```

### Event Handler Patterns

**Basic Handler:**
```javascript
const handleClick = () => {
  console.log('Clicked');
};

<button onClick={handleClick}>Click</button>
```

**Handler with Parameters:**
```javascript
const handleClick = (id) => {
  console.log('Clicked:', id);
};

<button onClick={() => handleClick(item.id)}>Click</button>
```

**Preventing Default:**
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  // form logic
};

<form onSubmit={handleSubmit}>...</form>
```

**Navigation Handler:**
```javascript
const handleLinkClick = (e, href) => {
  e.preventDefault();
  navigateWithTransition(href);
};

<a href="/page" onClick={(e) => handleLinkClick(e, '/page')}>Link</a>
```

---

## Animation Guidelines

### GSAP Best Practices

**1. Always Use useGSAP Hook:**
```javascript
// Good
import { useGSAP } from '@gsap/react';

useGSAP(() => {
  gsap.to(element, { x: 100 });
}, { scope: containerRef });

// Bad - Manual cleanup needed
useEffect(() => {
  gsap.to(element, { x: 100 });
}, []);
```

**2. Scope Animations:**
```javascript
const containerRef = useRef(null);

useGSAP(() => {
  // Queries scoped to container
  const items = gsap.utils.selector(containerRef);
  gsap.to(items('.item'), { opacity: 1 });
}, { scope: containerRef });
```

**3. GPU-Accelerated Properties:**
```javascript
// Good - GPU accelerated
gsap.to(element, {
  x: 100,
  y: 50,
  scale: 1.2,
  rotation: 45,
  opacity: 0.5
});

// Avoid - Causes repaints
gsap.to(element, {
  width: '100px',
  height: '50px',
  top: '10px',
  left: '20px'
});
```

**4. Timeline for Sequences:**
```javascript
const tl = gsap.timeline({
  defaults: { ease: 'power3.out', duration: 1 }
});

tl.to('.element1', { y: 0 })
  .to('.element2', { opacity: 1 }, '<0.2')  // 0.2s overlap
  .to('.element3', { scale: 1 }, '>0.5');   // 0.5s after previous
```

**5. Stagger for Multiple Elements:**
```javascript
gsap.to('.items', {
  y: 0,
  opacity: 1,
  stagger: 0.1,  // 0.1s between each
  duration: 0.8
});
```

### ScrollTrigger Patterns

**Basic Scroll Animation:**
```javascript
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: element,
  start: "top 80%",      // When top of element hits 80% of viewport
  end: "bottom 20%",     // When bottom hits 20% of viewport
  once: true,            // Only trigger once
  animation: gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 1
  })
});
```

**Common Start/End Values:**
```javascript
start: "top top"        // Element top hits viewport top
start: "top center"     // Element top hits viewport center
start: "top 80%"        // Element top hits 80% down viewport
start: "center center"  // Element center hits viewport center
```

**Scroll-Linked Animation:**
```javascript
gsap.to(element, {
  scrollTrigger: {
    trigger: container,
    start: "top top",
    end: "bottom top",
    scrub: true,         // Link to scroll position
    pin: true,           // Pin element during scroll
  },
  x: 400
});
```

**Cleanup:**
```javascript
// Automatic with useGSAP
useGSAP(() => {
  ScrollTrigger.create({...});
}, { scope: ref });

// Manual cleanup if needed
useEffect(() => {
  const trigger = ScrollTrigger.create({...});

  return () => trigger.kill();
}, []);
```

### Custom Easing

**Use Project Easing:**
```javascript
// "hop" easing is available globally
gsap.to(element, {
  y: 0,
  ease: 'hop',
  duration: 1
});
```

**Other Recommended Easings:**
```javascript
ease: 'power3.out'      // Smooth deceleration
ease: 'power2.inOut'    // Smooth in and out
ease: 'back.out(1.7)'   // Overshoot effect
ease: 'elastic.out'     // Spring effect
```

### Animation Performance Tips

**1. Batch DOM Updates:**
```javascript
gsap.set([el1, el2, el3], { opacity: 0 });
```

**2. Use will-change (CSS):**
```css
.animated-element {
  will-change: transform, opacity;
}
```

**3. Avoid Layout Thrashing:**
```javascript
// Bad - Reads and writes alternating
elements.forEach(el => {
  const height = el.offsetHeight;  // Read
  el.style.top = height + 'px';    // Write
});

// Good - Batch reads, then writes
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => {
  el.style.top = heights[i] + 'px';
});
```

---

## Styling Guidelines

### CSS Organization

**Component Styles:**
```css
/* Component.css */

/* 1. Container/Root */
.component-name {
  /* layout properties */
}

/* 2. Child elements */
.component-name .child {
  /* child styles */
}

/* 3. Modifiers */
.component-name.is-active {
  /* active state */
}

/* 4. Responsive */
@media (max-width: 1000px) {
  .component-name {
    /* mobile styles */
  }
}
```

### Naming Conventions

**BEM-Inspired:**
```css
.component-name { }              /* Block */
.component-name__element { }     /* Element */
.component-name--modifier { }    /* Modifier */
.component-name.is-active { }    /* State */
```

**Example:**
```css
.nav { }
.nav__link { }
.nav__link--active { }
.nav.is-open { }
```

### Responsive Design

**Mobile-First Approach:**
```css
/* Base styles (mobile) */
.element {
  font-size: 14px;
  padding: 10px;
}

/* Desktop */
@media (min-width: 1001px) {
  .element {
    font-size: 16px;
    padding: 20px;
  }
}
```

**Breakpoints:**
```css
/* Mobile */
@media (max-width: 1000px) { }

/* Desktop */
@media (min-width: 1001px) { }

/* Large Desktop */
@media (min-width: 1440px) { }
```

### CSS Variables (Optional)

```css
:root {
  --color-primary: #000;
  --color-secondary: #fff;
  --spacing-sm: 10px;
  --spacing-md: 20px;
  --spacing-lg: 40px;
}

.component {
  color: var(--color-primary);
  padding: var(--spacing-md);
}
```

---

## Common Tasks

### Adding a New Page

**1. Create Page Directory:**
```bash
mkdir src/app/new-page
```

**2. Create Page Component:**
```javascript
// src/app/new-page/page.jsx
"use client";
import './new-page.css';
import Nav from '@/components/Nav/Nav';
import ConditionalFooter from '@/components/ConditionalFooter/ConditionalFooter';

export default function NewPage() {
  return (
    <>
      <Nav />
      <section className="new-page">
        <div className="container">
          <h1>New Page Title</h1>
        </div>
      </section>
      <ConditionalFooter />
    </>
  );
}
```

**3. Create Page Styles:**
```css
/* src/app/new-page/new-page.css */
.new-page {
  padding: 100px 0;
}
```

**4. Add to Navigation:**
```javascript
// src/components/Nav/Nav.jsx
<div className="link">
  <a href="/new-page" onClick={(e) => handleLinkClick(e, "/new-page")}>
    <h2>New Page</h2>
  </a>
</div>
```

### Creating a New Component

**1. Create Component Files:**
```bash
mkdir src/components/NewComponent
touch src/components/NewComponent/NewComponent.jsx
touch src/components/NewComponent/NewComponent.css
```

**2. Component Template:**
```javascript
// NewComponent.jsx
"use client";
import './NewComponent.css';

export default function NewComponent({ prop1, prop2 }) {
  return (
    <div className="new-component">
      <h2>{prop1}</h2>
      <p>{prop2}</p>
    </div>
  );
}
```

**3. Component Styles:**
```css
/* NewComponent.css */
.new-component {
  padding: 20px;
}

.new-component h2 {
  margin-bottom: 10px;
}
```

**4. Use Component:**
```javascript
import NewComponent from '@/components/NewComponent/NewComponent';

<NewComponent prop1="Title" prop2="Description" />
```

### Adding Scroll Animations

**1. Import GSAP:**
```javascript
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

**2. Create Ref:**
```javascript
const sectionRef = useRef(null);
```

**3. Setup Animation:**
```javascript
useGSAP(() => {
  const elements = sectionRef.current.querySelectorAll('.animate');

  gsap.set(elements, { opacity: 0, y: 50 });

  ScrollTrigger.create({
    trigger: sectionRef.current,
    start: "top 80%",
    once: true,
    animation: gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    })
  });
}, { scope: sectionRef });
```

**4. Add Ref to JSX:**
```javascript
<section ref={sectionRef}>
  <div className="animate">Element 1</div>
  <div className="animate">Element 2</div>
</section>
```

### Updating Content Data

**Featured Projects:**
```javascript
// src/components/FeaturedProjects/featured-projects-content.js
export const projects = [
  {
    id: 1,
    title: "New Project",
    category: "Residential",
    image: "/featured-projects/new-project.jpg",
    description: "Project description"
  },
  // Add new projects here
];
```

**Client Reviews:**
```javascript
// src/components/ClientReviews/client-reviews-content.js
export const reviews = [
  {
    id: 1,
    name: "Client Name",
    company: "Company",
    review: "Review text...",
    image: "/client-reviews/client.jpg"
  },
  // Add new reviews here
];
```

### Adding Images

**1. Place in Public Folder:**
```
public/
└─ category-name/
   └─ image-name.jpg
```

**2. Reference in Code:**
```javascript
<img src="/category-name/image-name.jpg" alt="Description" />
```

**3. Next.js Image Component (Recommended):**
```javascript
import Image from 'next/image';

<Image
  src="/category-name/image-name.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={false}  // true for above-fold images
/>
```

---

## Troubleshooting

### Common Issues

**1. "Use client" Error:**
```
Error: useState can only be used in Client Components
```
**Solution:** Add `"use client";` at top of file

**2. GSAP Animation Not Working:**
```javascript
// Check:
1. Is component client component? ("use client")
2. Is element ref properly set?
3. Is useGSAP imported and used?
4. Are dependencies correct?
```

**3. Smooth Scroll Not Working:**
```javascript
// Check:
1. Is Lenis provider wrapping content?
2. Are scroll events being prevented elsewhere?
3. Is menu open (Lenis stops when menu open)?
```

**4. Page Transition Not Smooth:**
```javascript
// Check:
1. Is useViewTransition hook being used?
2. Is ViewTransitions provider in ClientLayout?
3. Browser support for View Transitions API?
```

**5. Import Path Not Found:**
```javascript
// Check jsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

// Use @/ prefix for src imports
import Nav from '@/components/Nav/Nav';
```

### Debug Mode

**GSAP Debug:**
```javascript
gsap.to(element, {
  x: 100,
  onStart: () => console.log('Animation started'),
  onUpdate: () => console.log('Animation updating'),
  onComplete: () => console.log('Animation complete')
});
```

**ScrollTrigger Markers:**
```javascript
ScrollTrigger.create({
  trigger: element,
  markers: true,  // Shows start/end markers
  // ...
});
```

**Lenis Debug:**
```javascript
<ReactLenis root options={{ ...scrollSettings, debug: true }}>
  {children}
</ReactLenis>
```

---

## Testing

### Visual Testing Checklist

**Homepage:**
- [ ] Preloader plays only on first visit
- [ ] Hero section animates in correctly
- [ ] Stats reveal on scroll
- [ ] Tags animate in viewport
- [ ] Featured projects display
- [ ] Client reviews carousel works
- [ ] Gallery callout images load
- [ ] CTA window displays
- [ ] Footer renders

**Navigation:**
- [ ] Menu opens smoothly
- [ ] Menu closes smoothly
- [ ] Links navigate correctly
- [ ] Page transitions smooth
- [ ] Back button works

**Responsive:**
- [ ] Mobile menu works (≤1000px)
- [ ] Desktop menu works (>1000px)
- [ ] Images responsive
- [ ] Text scales appropriately
- [ ] Touch scrolling smooth (mobile)

### Browser Testing

**Minimum Support:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Test Points:**
- Page load time
- Animation smoothness
- Scroll performance
- Image loading
- Font rendering

### Performance Testing

**Lighthouse Audit:**
```bash
npm run build
npm start
# Run Lighthouse in Chrome DevTools
```

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

---

## Deployment Checklist

### Pre-Deploy

- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Animations smooth (60fps)
- [ ] Images optimized
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Cross-browser tested
- [ ] Lighthouse audit passed

### Build Process

```bash
# 1. Clean install
rm -rf node_modules
npm install

# 2. Run build
npm run build

# 3. Test production build locally
npm start

# 4. Verify at http://localhost:3000
```

### Environment Variables (if needed)

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

### Vercel Deployment

**1. Connect Repository:**
- Import project in Vercel dashboard
- Connect GitHub repository

**2. Configure:**
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**3. Deploy:**
- Push to main branch
- Automatic deployment triggers
- Preview deployments for PRs

### Post-Deploy Verification

- [ ] Live site loads
- [ ] All pages accessible
- [ ] Images load correctly
- [ ] Animations work
- [ ] Forms submit (if applicable)
- [ ] Analytics tracking (if configured)

---

## Code Quality

### ESLint Configuration

```javascript
// .eslintrc.json
{
  "extends": "next/core-web-vitals",
  "rules": {
    "no-console": "warn",
    "react/prop-types": "off",
    "no-unused-vars": "warn"
  }
}
```

### Prettier Configuration

```javascript
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### Git Ignore Additions

```
# .gitignore
.next/
node_modules/
.env*.local
.DS_Store
*.log
```

---

## Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [GSAP Docs](https://greensock.com/docs/)
- [Lenis](https://github.com/studio-freight/lenis)

### Community Resources
- [GSAP Forum](https://greensock.com/forums/)
- [Next.js GitHub](https://github.com/vercel/next.js)
- [Stack Overflow](https://stackoverflow.com/)

### Learning Resources
- [GSAP Getting Started](https://greensock.com/get-started/)
- [Next.js Learn](https://nextjs.org/learn)
- [React Beta Docs](https://react.dev/learn)

---

*Development Guide last updated: January 2026*
