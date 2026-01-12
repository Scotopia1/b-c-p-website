# Terrene Website - Documentation Index

Welcome to the Terrene website documentation. This index will guide you to the right documentation based on your needs.

---

## Quick Navigation

### For New Developers
**Start here:** [DOCUMENTATION.md](./DOCUMENTATION.md)
- Project overview
- Technology stack
- Getting started guide
- Basic concepts

### For Component Development
**Reference:** [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md)
- Complete component API
- Props and usage examples
- Quick reference for all components
- Common patterns

### For System Understanding
**Deep Dive:** [ARCHITECTURE.md](./ARCHITECTURE.md)
- System architecture
- Application flow diagrams
- Component hierarchy
- Technical decisions and rationale

### For Daily Development
**Handbook:** [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
- Development workflow
- Code patterns and best practices
- Common tasks and solutions
- Troubleshooting guide

---

## Documentation Overview

### 1. DOCUMENTATION.md
**Main project documentation**

**Sections:**
- Project Overview
- Technology Stack
- Project Structure
- Key Components
- Routing & Navigation
- Animation System
- Styling Architecture
- Development Guide
- Deployment

**Best for:**
- Understanding what the project does
- Learning the tech stack
- Finding files and understanding structure
- Getting started with development

**Read time:** 20-30 minutes

---

### 2. COMPONENT_REFERENCE.md
**Complete component API reference**

**Sections:**
- Core Layout Components
- Navigation Components
- Content Components
- Utility Components
- Custom Hooks
- Page Components
- Animation Utilities
- Content Data Files
- Quick Reference Tables

**Best for:**
- Finding component props
- Understanding component usage
- Quick lookup while coding
- Copy-paste examples

**Read time:** 10-15 minutes (reference)

---

### 3. ARCHITECTURE.md
**Technical architecture and design**

**Sections:**
- Architecture Overview
- Application Flow Diagrams
- Component Hierarchy
- Data Flow
- Animation Pipeline
- Routing Architecture
- Performance Optimizations
- Technical Decisions

**Best for:**
- Understanding system design
- Learning how parts connect
- Performance optimization
- Making architectural decisions

**Read time:** 30-40 minutes

---

### 4. DEVELOPMENT_GUIDE.md
**Practical development handbook**

**Sections:**
- Getting Started
- Development Workflow
- Code Patterns & Best Practices
- Animation Guidelines
- Styling Guidelines
- Common Tasks
- Troubleshooting
- Testing
- Deployment Checklist

**Best for:**
- Daily development work
- Learning best practices
- Solving common problems
- Step-by-step task guides

**Read time:** 25-35 minutes

---

## Documentation by Role

### Frontend Developer (New to Project)
**Recommended Path:**
1. Start: [DOCUMENTATION.md](./DOCUMENTATION.md) - Project Overview → Technology Stack
2. Then: [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Getting Started → Development Workflow
3. Keep open: [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - For quick lookups
4. When needed: [ARCHITECTURE.md](./ARCHITECTURE.md) - For deeper understanding

### Designer/Frontend Implementer
**Recommended Path:**
1. Start: [DOCUMENTATION.md](./DOCUMENTATION.md) - Project Overview → Styling Architecture
2. Then: [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - Content Components
3. Reference: [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Styling Guidelines → Animation Guidelines

### Technical Lead/Architect
**Recommended Path:**
1. Start: [ARCHITECTURE.md](./ARCHITECTURE.md) - Full read
2. Then: [DOCUMENTATION.md](./DOCUMENTATION.md) - Technology Stack → Animation System
3. Reference: [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Code Patterns → Performance

### Content Manager
**Recommended Path:**
1. Start: [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Common Tasks → Updating Content Data
2. Reference: [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - Content Data Files

---

## Documentation by Task

### Setting Up Development Environment
**Path:**
1. [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Getting Started → Environment Setup
2. [DOCUMENTATION.md](./DOCUMENTATION.md) - Development Guide

### Adding a New Page
**Path:**
1. [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Common Tasks → Adding a New Page
2. [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - Page Components (for examples)
3. [ARCHITECTURE.md](./ARCHITECTURE.md) - Routing Architecture (for understanding)

### Creating a New Component
**Path:**
1. [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Code Patterns → Component Structure Pattern
2. [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - Find similar component for reference
3. [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Common Tasks → Creating a New Component

### Working with Animations
**Path:**
1. [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Animation Guidelines
2. [DOCUMENTATION.md](./DOCUMENTATION.md) - Animation System
3. [ARCHITECTURE.md](./ARCHITECTURE.md) - Animation Pipeline
4. [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - Animation Utilities

### Understanding Navigation
**Path:**
1. [DOCUMENTATION.md](./DOCUMENTATION.md) - Routing & Navigation
2. [ARCHITECTURE.md](./ARCHITECTURE.md) - Routing Architecture → Navigation Flow
3. [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - Navigation Components

### Troubleshooting Issues
**Path:**
1. [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Troubleshooting
2. [ARCHITECTURE.md](./ARCHITECTURE.md) - Application Flow (understand what's happening)
3. Search specific component in [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md)

### Optimizing Performance
**Path:**
1. [ARCHITECTURE.md](./ARCHITECTURE.md) - Performance Optimizations
2. [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Animation Guidelines → Performance Tips
3. [DOCUMENTATION.md](./DOCUMENTATION.md) - Animation System

### Deploying to Production
**Path:**
1. [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Deployment Checklist
2. [DOCUMENTATION.md](./DOCUMENTATION.md) - Deployment

---

## Quick Reference Tables

### File Locations Quick Reference

| What | Where | Documentation |
|------|-------|---------------|
| Homepage | `src/app/page.js` | [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - Page Components |
| Navigation | `src/components/Nav/Nav.jsx` | [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - Navigation Components |
| Layout | `src/app/layout.js` | [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - Core Layout |
| Smooth Scroll | `src/client-layout.js` | [DOCUMENTATION.md](./DOCUMENTATION.md) - Key Components |
| Transitions | `src/hooks/useViewTransition.js` | [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - Custom Hooks |
| Featured Projects Data | `src/components/FeaturedProjects/featured-projects-content.js` | [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - Content Data Files |
| Client Reviews Data | `src/components/ClientReviews/client-reviews-content.js` | [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - Content Data Files |
| Global Styles | `src/app/globals.css` | [DOCUMENTATION.md](./DOCUMENTATION.md) - Styling Architecture |
| Static Assets | `public/` | [DOCUMENTATION.md](./DOCUMENTATION.md) - Project Structure |

### Component Quick Reference

| Component | Props | Location | Documentation |
|-----------|-------|----------|---------------|
| Nav | None | `src/components/Nav/Nav.jsx` | [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md#nav) |
| Copy | `children`, `animateOnScroll`, `delay` | `src/components/Copy/Copy.jsx` | [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md#copy) |
| AnimatedButton | `label`, `route`, `animateOnScroll`, `delay` | `src/components/AnimatedButton/AnimatedButton.jsx` | [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md#animatedbutton) |
| CTAWindow | `img`, `header`, `callout`, `description` | `src/components/CTAWindow/CTAWindow.jsx` | [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md#ctawindow) |
| FeaturedProjects | None | `src/components/FeaturedProjects/FeaturedProjects.jsx` | [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md#featuredprojects) |
| ClientReviews | None | `src/components/ClientReviews/ClientReviews.jsx` | [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md#clientreviews) |

### Technology Quick Reference

| Technology | Version | Purpose | Documentation |
|------------|---------|---------|---------------|
| Next.js | 15.4.6 | React framework | [DOCUMENTATION.md](./DOCUMENTATION.md) - Technology Stack |
| React | 19.1.0 | UI library | [DOCUMENTATION.md](./DOCUMENTATION.md) - Technology Stack |
| GSAP | 3.13.0 | Animations | [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Animation Guidelines |
| Lenis | 1.3.8 | Smooth scroll | [DOCUMENTATION.md](./DOCUMENTATION.md) - Technology Stack |
| next-view-transitions | 0.3.4 | Page transitions | [ARCHITECTURE.md](./ARCHITECTURE.md) - Routing Architecture |

---

## Search Guide

### Finding Information

**By Keyword:**

| Looking for... | Check... |
|----------------|----------|
| "How do I..." | [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Common Tasks |
| "What is..." | [DOCUMENTATION.md](./DOCUMENTATION.md) - Project Overview |
| "Why was..." | [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical Decisions |
| Props for X component | [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - Search component name |
| Animation pattern | [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Animation Guidelines |
| File structure | [DOCUMENTATION.md](./DOCUMENTATION.md) - Project Structure |
| Error message | [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Troubleshooting |

---

## Documentation Maintenance

### Keeping Docs Up to Date

When making changes:

1. **New Component?**
   - Add to [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md)
   - Update [DOCUMENTATION.md](./DOCUMENTATION.md) if major component
   - Update [ARCHITECTURE.md](./ARCHITECTURE.md) component hierarchy

2. **New Page?**
   - Add to [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - Page Components
   - Update [DOCUMENTATION.md](./DOCUMENTATION.md) - Routing section
   - Update [ARCHITECTURE.md](./ARCHITECTURE.md) - Routing Architecture

3. **New Pattern/Best Practice?**
   - Add to [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Code Patterns
   - Update examples if needed

4. **Architecture Change?**
   - Update [ARCHITECTURE.md](./ARCHITECTURE.md)
   - Update [DOCUMENTATION.md](./DOCUMENTATION.md) if user-facing
   - Add migration guide if breaking

### Documentation Standards

- Keep examples concise and practical
- Use code blocks for all code
- Update "Last updated" dates
- Link between documents when referencing
- Keep diagrams up to date

---

## External Resources

### Official Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [GSAP Documentation](https://greensock.com/docs/)
- [Lenis GitHub](https://github.com/studio-freight/lenis)

### Community & Support
- [GSAP Forum](https://greensock.com/forums/)
- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [React Discord](https://discord.gg/react)

---

## Getting Help

### Where to Look First

1. **Error in console?**
   → [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Troubleshooting

2. **Component not working?**
   → [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - Check component API

3. **Animation issue?**
   → [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Animation Guidelines

4. **Don't know where file is?**
   → [DOCUMENTATION.md](./DOCUMENTATION.md) - Project Structure

5. **Need to understand flow?**
   → [ARCHITECTURE.md](./ARCHITECTURE.md) - Application Flow

6. **Want to add feature?**
   → [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Common Tasks

### Still Stuck?

1. Search all docs for keyword
2. Check similar components in codebase
3. Review GSAP/Next.js official docs
4. Ask development team

---

## Contribution Guidelines

### Improving Documentation

Found an issue or want to improve docs?

1. **Typos/Small Fixes:**
   - Edit file directly
   - Submit PR with clear description

2. **New Sections:**
   - Discuss with team first
   - Follow existing format
   - Add to relevant index sections

3. **Examples:**
   - Keep them practical
   - Test code before adding
   - Comment complex parts

---

## Version History

### Current Version
**Documentation Generated:** January 2026
**Project Version:** 0.1.0
**Framework:** Next.js 15.4.6

### Recent Updates
- Initial comprehensive documentation
- Component reference guide
- Architecture documentation
- Development handbook

---

## Document Stats

### Documentation Coverage

| Document | Pages | Sections | Code Examples | Diagrams |
|----------|-------|----------|---------------|----------|
| DOCUMENTATION.md | ~30 | 9 | 20+ | 0 |
| COMPONENT_REFERENCE.md | ~25 | 40+ | 50+ | 0 |
| ARCHITECTURE.md | ~35 | 8 | 30+ | 10+ |
| DEVELOPMENT_GUIDE.md | ~40 | 9 | 60+ | 0 |
| **Total** | **~130** | **66+** | **160+** | **10+** |

### Estimated Read Times
- Quick Start (DOCUMENTATION.md intro): 5 min
- Complete Overview: 30 min
- Full Documentation: 2-3 hours
- Reference Lookup: 30 sec - 2 min

---

*Documentation Index last updated: January 2026*

**Start your journey:**
- **New to project?** → [DOCUMENTATION.md](./DOCUMENTATION.md)
- **Need quick reference?** → [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md)
- **Want to understand system?** → [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Ready to code?** → [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
