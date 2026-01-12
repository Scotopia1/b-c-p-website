const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Project pages to scrape
const projectPages = [
  { slug: '/gallery-1', name: 'kitchen-remodel-norwood', category: 'kitchen' },
  { slug: '/new-page-1', name: 'adu-home-renovation-norwood', category: 'adu' },
  { slug: '/new-page', name: 'custom-deck-norwood-1', category: 'deck' },
  { slug: '/finished-basement-somerville-ma', name: 'finished-basement-somerville', category: 'basement' },
  { slug: '/handicap-accessible-bathroom-walpole-ma', name: 'handicap-bathroom-walpole', category: 'bathroom' },
  { slug: '/bathroom-remodel-norwood-ma', name: 'bathroom-remodel-norwood-1', category: 'bathroom' },
  { slug: '/front-entrance-canton-ma', name: 'front-entrance-canton', category: 'addition' },
  { slug: '/custom-deck-norwoodma', name: 'custom-deck-norwood-2', category: 'deck' },
  { slug: '/kitchen-remodel-newton-ma', name: 'kitchen-remodel-newton', category: 'kitchen' },
  { slug: '/finished-basement-dedham-ma', name: 'finished-basement-dedham', category: 'basement' },
  { slug: '/new-page-2', name: 'bathroom-remodel-dedham', category: 'bathroom' },
  { slug: '/finished-attic-dedham-ma', name: 'finished-attic-dedham', category: 'basement' },
  { slug: '/custom-deck-walpole-ma', name: 'custom-deck-walpole', category: 'deck' },
  { slug: '/finished-basement-westwood-ma', name: 'finished-basement-westwood', category: 'basement' },
  { slug: '/kitchen-remodel-town', name: 'kitchen-remodel-somerville', category: 'kitchen' },
  { slug: '/bathroom-remodel-norwood-ma-2', name: 'bathroom-remodel-norwood-2', category: 'bathroom' },
  { slug: '/bay-window-installation-norwood-ma', name: 'bay-window-norwood', category: 'addition' },
  { slug: '/bathroom-remodel-newton-ma', name: 'bathroom-remodel-newton-1', category: 'bathroom' },
  { slug: '/bathroom-remodel-newton-ma-1', name: 'bathroom-remodel-newton-2', category: 'bathroom' },
  { slug: '/attic-bathroom-remodel-mansfield-ma', name: 'attic-bathroom-mansfield', category: 'bathroom' },
  { slug: '/interior-double-door-installation-norwood-ma', name: 'double-door-norwood', category: 'addition' }
];

// Homepage images with their categories
const homepageImages = {
  hero: [
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/edd04c7c-4332-4fa6-8ed1-f4fcb3963033/PHOTO-2025-07-19-12-29-43.png'
  ],
  services: [
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/0d9acdd5-e66e-4a3a-9af8-7317ba9399fa/PHOTO-2025-07-19-18-39-09.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/6f6e9282-44ba-4005-af52-e6bc051bb2ed/make-the-walls-a-little-bit-lighter-and-_lv5hb11nQ66ujGC9i2GyhA_2dvr03UdR8OKkPCmjZVpkQ.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/dcbd9fb5-3e22-46e1-a47c-58ad2a0b6262/furnish-this-basement-with-high-class-lu_PffCjuhbQXakUjmHa_owLQ_BT1tJaBeTB-oFP12Gf0eqg.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/65a9b578-7e9d-485d-ac57-4687828abeea/there-is-a-person-who-is-point-in-the-le_avkX2Mm3RPyx_Pf4weDPVw_cmqwtxnpTbmzeP9Fe37zXQ+%281%29.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/e4ba2ea8-5597-47b8-a09b-3c06c88fec39/make-this-photo-website-ready-edit-it-to_NYHZ-MYPToGWPFPEsmJ4pg_nNoBMBM3TtaZdQ5JpqBNsQ.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/acbcb058-9695-4d63-b424-3890f79af325/make-this-deck-website-ready-cover-up-th_zRBN2PItRY6g5IBOOCaSLA_FkfUmbfcTQSP5hy4eMDyYQ.png'
  ],
  about: [
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/73997520-67f6-441f-ad26-bcd92a6c406c/View+recent+photos.JPEG',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/d3517e01-8f24-4d83-8372-0a0c16357673/PHOTO-2025-03-11-15-14-03+%281%29.JPG',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/65639253-5c1e-4024-b05c-9ba838d1424c/View+recent+photos+%281%29.jpg',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/59d949f5-c3d4-4700-a9d1-728fac7f332a/PHOTO-2025-03-15-11-59-38.JPG',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/4f85ce23-e3bb-4b4b-aae2-3ef7c558389f/PHOTO-2025-03-11-15-14-03.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/a26bfab2-9a24-484e-884d-b84e657b289d/IMG_0927.jpg'
  ],
  contact: [
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/495f12ab-e676-4c56-8a46-dd0c8bab9ef9/PHOTO-2025-07-19-18-39-09+%281%29.png'
  ],
  logo: [
    '//images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/5dbe41f3-28c3-4647-a25f-44199332d80c/BCP+Final+Logo.png'
  ]
};

// Ensure directories exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Download image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    // Handle protocol-relative URLs
    if (url.startsWith('//')) {
      url = 'https:' + url;
    }

    const protocol = url.startsWith('https') ? https : http;

    const file = fs.createWriteStream(filepath);
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded: ${filepath}`);
          resolve();
        });
      } else {
        fs.unlink(filepath, () => {});
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Fetch HTML from URL
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => data += chunk);
      response.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Extract images from HTML
function extractImages(html) {
  const dom = new JSDOM(html);
  const images = [];

  // Get all img tags
  const imgTags = dom.window.document.querySelectorAll('img');
  imgTags.forEach(img => {
    const src = img.getAttribute('src') || img.getAttribute('data-src');
    if (src && src.includes('squarespace-cdn.com')) {
      images.push(src);
    }
  });

  // Get background images from inline styles
  const elementsWithBg = dom.window.document.querySelectorAll('[style*="background-image"]');
  elementsWithBg.forEach(el => {
    const style = el.getAttribute('style');
    const match = style.match(/url\(['"]?(.*?)['"]?\)/);
    if (match && match[1].includes('squarespace-cdn.com')) {
      images.push(match[1]);
    }
  });

  return [...new Set(images)]; // Remove duplicates
}

// Main function
async function scrapeAndDownload() {
  console.log('Starting BCP image scraping...\n');

  const imageMap = {
    projects: {},
    homepage: {},
    stats: {
      total: 0,
      failed: 0,
      downloaded: 0
    }
  };

  // Create base directories
  const baseDir = path.join(__dirname, '..', 'public');
  ensureDir(path.join(baseDir, 'projects'));
  ensureDir(path.join(baseDir, 'home'));
  ensureDir(path.join(baseDir, 'about'));
  ensureDir(path.join(baseDir, 'services'));
  ensureDir(path.join(baseDir, 'contact'));

  // Download homepage images
  console.log('=== Downloading Homepage Images ===\n');
  for (const [category, urls] of Object.entries(homepageImages)) {
    console.log(`Category: ${category}`);
    ensureDir(path.join(baseDir, category === 'services' ? 'services' : category === 'about' ? 'about' : category === 'contact' ? 'contact' : 'home'));

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const ext = url.split('.').pop().split('?')[0] || 'jpg';
      const filename = `${category}-${i + 1}.${ext}`;
      const folderName = category === 'services' ? 'services' : category === 'about' ? 'about' : category === 'contact' ? 'contact' : 'home';
      const filepath = path.join(baseDir, folderName, filename);

      try {
        await downloadImage(url, filepath);
        imageMap.homepage[`${category}-${i + 1}`] = { url, path: `/${folderName}/${filename}` };
        imageMap.stats.total++;
        imageMap.stats.downloaded++;
      } catch (err) {
        console.error(`✗ Failed: ${filename} - ${err.message}`);
        imageMap.stats.failed++;
      }
    }
    console.log('');
  }

  // Download project images
  console.log('\n=== Downloading Project Images ===\n');
  for (const project of projectPages) {
    console.log(`Project: ${project.name}`);
    const projectDir = path.join(baseDir, 'projects', project.name);
    ensureDir(projectDir);

    try {
      const html = await fetchHTML(`https://bcp411.com${project.slug}`);
      const images = extractImages(html);

      console.log(`  Found ${images.length} images`);

      imageMap.projects[project.name] = {
        category: project.category,
        images: []
      };

      for (let i = 0; i < images.length; i++) {
        const url = images[i];
        const ext = url.split('.').pop().split('?')[0] || 'jpg';
        const filename = `${i + 1}.${ext}`;
        const filepath = path.join(projectDir, filename);

        try {
          await downloadImage(url, filepath);
          imageMap.projects[project.name].images.push({
            url,
            path: `/projects/${project.name}/${filename}`
          });
          imageMap.stats.total++;
          imageMap.stats.downloaded++;
        } catch (err) {
          console.error(`  ✗ Failed: ${filename} - ${err.message}`);
          imageMap.stats.failed++;
        }
      }
    } catch (err) {
      console.error(`  ✗ Failed to fetch project page: ${err.message}`);
    }
    console.log('');
  }

  // Save image map
  const mapPath = path.join(__dirname, 'image-map.json');
  fs.writeFileSync(mapPath, JSON.stringify(imageMap, null, 2));

  console.log('\n=== Summary ===');
  console.log(`Total images: ${imageMap.stats.total}`);
  console.log(`Downloaded: ${imageMap.stats.downloaded}`);
  console.log(`Failed: ${imageMap.stats.failed}`);
  console.log(`\nImage map saved to: ${mapPath}`);
}

// Run the script
scrapeAndDownload().catch(console.error);
