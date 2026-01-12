# BCP Website Image Reference

## Downloaded Images Summary

### Homepage Images (15)
- **Logo:** public/home/logo-1.png
- **Hero:** public/home/hero-1.png → public/home/hero.jpg (replaced)
- **Services:** public/services/services-1-6.png
- **About:** public/about/about-1-6 (family/team photos)
- **Contact:** public/contact/contact-1.png

### Project Images (38 images across 0 projects)
- **Kitchen Remodels:** Norwood (13), Newton (2), Somerville (1)
- **Bathrooms:** Norwood (7), Walpole (1 handicap accessible)
- **Basements:** Somerville (3), Dedham (1)
- **Decks:** Norwood (3)
- **Other:** ADU (1), Front entrance (1), Attic (1), Bay window (1), Door (1), Addition (2)

## Template Section Mapping

### Home Page
- Hero image: `/home/hero.jpg` (ADU living room)
- CTA window: `/home/home-cta-window.jpg` (Kitchen)

### Gallery Callout
- Grid 1: `/gallery-callout/gallery-callout-1.jpg` (Kitchen)
- Grid 2: `/gallery-callout/gallery-callout-2.jpg` (Bathroom)
- Grid 3: `/gallery-callout/gallery-callout-3.jpg` (Deck)
- Grid 4: `/gallery-callout/gallery-callout-4.jpg` (Basement)

### Spotlight (About page carousel)
- 10 featured project images rotating

### How We Work (About page)
- 4 team/process images

### Studio/About
- Hero: Kaby and Diamond photo
- CTA: Kitchen project

### Services
- 6 service category images already downloaded

## Image Organization

```
public/
├── home/           # Homepage images (hero, cta, logo)
├── about/          # Team/family photos
├── services/       # Service category images
├── projects/       # Individual project folders
│   ├── kitchen-remodel-norwood/
│   ├── adu-home-renovation-norwood/
│   ├── custom-deck-norwood/
│   └── ... (14 more project folders)
├── gallery-callout/  # 4 grid images
├── spotlight/        # 10 carousel images
├── how-we-work/      # 4 process images
├── studio/           # About page images
└── contact/          # Contact page image
```

## Next Steps
1. Update services-data.js with correct image paths
2. Update projects-data.js with correct image paths
3. Update featured-projects-content.js with real image paths
4. Verify all image references in components
