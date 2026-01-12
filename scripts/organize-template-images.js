const fs = require('fs');
const path = require('path');

// Mapping of source images to template sections
const imageMapping = {
  // Home section images
  home: [
    { src: 'public/projects/adu-home-renovation-norwood/1.JPG', dest: 'public/home/hero.jpg', desc: 'Hero - ADU living room' },
    { src: 'public/projects/kitchen-remodel-norwood/1.png', dest: 'public/home/home-cta-window.jpg', desc: 'CTA window - Kitchen' }
  ],

  // Gallery callout section (4 images in grid)
  galleryCallout: [
    { src: 'public/projects/kitchen-remodel-norwood/1.png', dest: 'public/gallery-callout/gallery-callout-1.jpg', desc: 'Kitchen 1' },
    { src: 'public/projects/bathroom-remodel-norwood/4.png', dest: 'public/gallery-callout/gallery-callout-2.jpg', desc: 'Bathroom' },
    { src: 'public/projects/custom-deck-norwood/2.png', dest: 'public/gallery-callout/gallery-callout-3.jpg', desc: 'Deck' },
    { src: 'public/projects/finished-basement-somerville/1.png', dest: 'public/gallery-callout/gallery-callout-4.jpg', desc: 'Basement' }
  ],

  // Spotlight section (10 images for carousel)
  spotlight: [
    { src: 'public/projects/kitchen-remodel-norwood/1.png', dest: 'public/spotlight/spotlight-img-1.jpg', desc: 'Kitchen Norwood' },
    { src: 'public/projects/adu-home-renovation-norwood/1.JPG', dest: 'public/spotlight/spotlight-img-2.jpg', desc: 'ADU' },
    { src: 'public/projects/custom-deck-norwood/2.png', dest: 'public/spotlight/spotlight-img-3.jpg', desc: 'Deck' },
    { src: 'public/projects/finished-basement-somerville/1.png', dest: 'public/spotlight/spotlight-img-4.jpg', desc: 'Basement Somerville' },
    { src: 'public/projects/handicap-bathroom-walpole/1.png', dest: 'public/spotlight/spotlight-img-5.jpg', desc: 'Handicap Bath' },
    { src: 'public/projects/bathroom-remodel-norwood/4.png', dest: 'public/spotlight/spotlight-img-6.jpg', desc: 'Bathroom' },
    { src: 'public/projects/front-entrance-canton/1.jpg', dest: 'public/spotlight/spotlight-img-7.jpg', desc: 'Front Entrance' },
    { src: 'public/projects/kitchen-remodel-newton/1.png', dest: 'public/spotlight/spotlight-img-8.jpg', desc: 'Kitchen Newton' },
    { src: 'public/projects/finished-attic-dedham/1.png', dest: 'public/spotlight/spotlight-img-9.jpg', desc: 'Attic' },
    { src: 'public/projects/bay-window-norwood/1.png', dest: 'public/spotlight/spotlight-img-10.jpg', desc: 'Bay Window' }
  ],

  // How We Work section (4 process images)
  howWeWork: [
    { src: 'public/about/about-2.JPG', dest: 'public/how-we-work/process-1.jpg', desc: 'Team at site' },
    { src: 'public/about/about-5.png', dest: 'public/how-we-work/process-2.jpg', desc: 'Equipment' },
    { src: 'public/about/about-3.jpg', dest: 'public/how-we-work/process-3.jpg', desc: 'Team construction' },
    { src: 'public/about/about-4.JPG', dest: 'public/how-we-work/process-4.jpg', desc: 'Team with headphones' }
  ],

  // Studio/About section
  studio: [
    { src: 'public/about/about-1.JPEG', dest: 'public/studio/about-hero.png', desc: 'Kaby and Diamond' },
    { src: 'public/projects/kitchen-remodel-norwood/1.png', dest: 'public/studio/about-cta-window.jpg', desc: 'Kitchen work' }
  ],

  // Contact section
  contact: [
    { src: 'public/about/about-6.jpg', dest: 'public/contact/contact-img.jpg', desc: 'Family photo' }
  ]
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyImage(src, dest) {
  const srcPath = path.join(__dirname, '..', src);
  const destPath = path.join(__dirname, '..', dest);

  // Ensure destination directory exists
  ensureDir(path.dirname(destPath));

  try {
    fs.copyFileSync(srcPath, destPath);
    return true;
  } catch (err) {
    console.error(`Failed to copy ${src} to ${dest}: ${err.message}`);
    return false;
  }
}

async function organizeImages() {
  console.log('Organizing template images...\n');

  let stats = {
    total: 0,
    copied: 0,
    failed: 0
  };

  for (const [section, images] of Object.entries(imageMapping)) {
    console.log(`\n=== ${section.toUpperCase()} ===`);

    for (const img of images) {
      stats.total++;
      console.log(`  ${img.desc}`);

      const success = copyImage(img.src, img.dest);
      if (success) {
        console.log(`  ✓ Copied to ${img.dest}`);
        stats.copied++;
      } else {
        console.log(`  ✗ Failed to copy`);
        stats.failed++;
      }
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Total operations: ${stats.total}`);
  console.log(`Successful: ${stats.copied}`);
  console.log(`Failed: ${stats.failed}`);

  // Create image reference document
  const referenceDoc = `# BCP Website Image Reference

## Downloaded Images Summary

### Homepage Images (15)
- **Logo:** public/home/logo-1.png
- **Hero:** public/home/hero-1.png → public/home/hero.jpg (replaced)
- **Services:** public/services/services-1-6.png
- **About:** public/about/about-1-6 (family/team photos)
- **Contact:** public/contact/contact-1.png

### Project Images (38 images across ${Object.keys(require('./download-project-images.js')).length} projects)
- **Kitchen Remodels:** Norwood (13), Newton (2), Somerville (1)
- **Bathrooms:** Norwood (7), Walpole (1 handicap accessible)
- **Basements:** Somerville (3), Dedham (1)
- **Decks:** Norwood (3)
- **Other:** ADU (1), Front entrance (1), Attic (1), Bay window (1), Door (1), Addition (2)

## Template Section Mapping

### Home Page
- Hero image: \`/home/hero.jpg\` (ADU living room)
- CTA window: \`/home/home-cta-window.jpg\` (Kitchen)

### Gallery Callout
- Grid 1: \`/gallery-callout/gallery-callout-1.jpg\` (Kitchen)
- Grid 2: \`/gallery-callout/gallery-callout-2.jpg\` (Bathroom)
- Grid 3: \`/gallery-callout/gallery-callout-3.jpg\` (Deck)
- Grid 4: \`/gallery-callout/gallery-callout-4.jpg\` (Basement)

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

\`\`\`
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
\`\`\`

## Next Steps
1. Update services-data.js with correct image paths
2. Update projects-data.js with correct image paths
3. Update featured-projects-content.js with real image paths
4. Verify all image references in components
`;

  const refPath = path.join(__dirname, 'IMAGE_REFERENCE.md');
  fs.writeFileSync(refPath, referenceDoc);
  console.log(`\nImage reference saved to: ${refPath}`);
}

organizeImages().catch(console.error);
