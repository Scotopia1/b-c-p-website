# Terrene Website

A modern, animation-rich website for an interior design and architecture studio, built with Next.js 15, React 19, and GSAP.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Documentation

Comprehensive documentation is available for this project:

### New to the Project?
Start here: **[DOCS_INDEX.md](./DOCS_INDEX.md)** - Complete documentation guide

### Quick Links

| Document | Purpose | When to Use |
|----------|---------|-------------|
| [DOCUMENTATION.md](./DOCUMENTATION.md) | Project overview, tech stack, structure | Understanding the project |
| [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) | Component API reference | Looking up component props/usage |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System architecture & design | Understanding how everything works |
| [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) | Development handbook | Daily development tasks |
| [DOCS_INDEX.md](./DOCS_INDEX.md) | Documentation index & navigation | Finding the right documentation |

## Tech Stack

- **Framework:** Next.js 15.4.6 (App Router)
- **UI:** React 19.1.0
- **Animations:** GSAP 3.13.0 (ScrollTrigger, SplitText, CustomEase)
- **Smooth Scroll:** Lenis 1.3.8
- **Transitions:** next-view-transitions 0.3.4
- **Icons:** react-icons 5.5.0

## Project Structure

```
src/
├── app/              # Next.js pages (App Router)
├── components/       # Reusable components
├── hooks/           # Custom React hooks
└── client-layout.js # Client-side layout wrapper

public/              # Static assets (images, icons)
```

## Key Features

- Smooth scrolling with Lenis
- Advanced GSAP animations
- Page transitions with View Transitions API
- Responsive design (mobile & desktop)
- Optimized image loading
- SEO-friendly architecture

## Development

### Environment Setup
See [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) for detailed setup instructions.

### Common Tasks
- Adding a page: [DEVELOPMENT_GUIDE.md - Adding a New Page](./DEVELOPMENT_GUIDE.md#adding-a-new-page)
- Creating a component: [DEVELOPMENT_GUIDE.md - Creating a New Component](./DEVELOPMENT_GUIDE.md#creating-a-new-component)
- Working with animations: [DEVELOPMENT_GUIDE.md - Animation Guidelines](./DEVELOPMENT_GUIDE.md#animation-guidelines)

## Learn More

### About This Project
- Built for BCP Partnership
- Interior design and architecture showcase
- Focus on visual storytelling and smooth interactions

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [GSAP Documentation](https://greensock.com/docs/)
- [Lenis Documentation](https://github.com/studio-freight/lenis)

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

For deployment instructions, see [DEVELOPMENT_GUIDE.md - Deployment Checklist](./DEVELOPMENT_GUIDE.md#deployment-checklist).

---

**Version:** 0.1.0
**Last Updated:** January 2026

For complete documentation, start with [DOCS_INDEX.md](./DOCS_INDEX.md).
