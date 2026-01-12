const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const SITEMAP_URL = 'https://www.bcp411.com/sitemap.xml';
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'projects');

// Ensure public/projects directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Helper function to fetch URL content
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    client.get(url, options, (res) => {
      // Handle redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }

      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ data, statusCode: res.statusCode }));
      res.on('error', reject);
    }).on('error', reject);
  });
}

// Helper function to download and save image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);

    client.get(url, (response) => {
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(filepath, () => {});
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Extract image URLs from sitemap XML
function extractImagesFromSitemap(xml) {
  const urlBlocks = xml.split('<url>').slice(1); // Skip first empty split
  const pages = [];

  for (const block of urlBlocks) {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    if (!locMatch) continue;

    const pageUrl = locMatch[1];
    const images = [];

    // Extract all image:loc tags - need to use exec in a loop for matchAll compatibility
    const imageRegex = /<image:loc>([^<]+)<\/image:loc>/g;
    let match;
    while ((match = imageRegex.exec(block)) !== null) {
      const imageUrl = match[1];
      // Accept all image URLs (don't filter too strictly)
      if (imageUrl && imageUrl.startsWith('http')) {
        images.push(imageUrl);
      }
    }

    if (images.length > 0) {
      pages.push({ url: pageUrl, images });
    }
  }

  return pages;
}

// Create a valid folder name from URL
function getFolderName(url) {
  try {
    const urlPath = new URL(url).pathname;
    const parts = urlPath.split('/').filter(p => p);
    const projectName = parts[parts.length - 1] || 'home';
    return projectName.replace(/[^a-z0-9-_]/gi, '-').toLowerCase();
  } catch {
    return 'unknown';
  }
}

// Get file extension from URL
function getExtension(url) {
  try {
    const pathname = new URL(url).pathname;
    const match = pathname.match(/\.(jpg|jpeg|png|gif|webp|JPG|JPEG|PNG|GIF|WEBP)$/i);
    return match ? match[0].toLowerCase() : '.jpg';
  } catch {
    return '.jpg';
  }
}

// Main function
async function main() {
  try {
    console.log('📥 Fetching sitemap...');
    const { data: sitemapXml } = await fetchUrl(SITEMAP_URL);

    console.log('📄 Parsing sitemap...');
    const pages = extractImagesFromSitemap(sitemapXml);

    console.log(`Found ${pages.length} pages with images\n`);

    let totalImages = 0;
    let downloadedImages = 0;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const folderName = getFolderName(page.url);
      const projectDir = path.join(PUBLIC_DIR, folderName);

      console.log(`\n[${i + 1}/${pages.length}] Processing: ${page.url}`);
      console.log(`Folder: ${folderName}`);
      console.log(`Found ${page.images.length} images`);

      totalImages += page.images.length;

      // Create project directory
      if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
      }

      // Remove duplicates
      const uniqueImages = [...new Set(page.images)];

      // Download images
      for (let j = 0; j < uniqueImages.length; j++) {
        const imgUrl = uniqueImages[j];
        const extension = getExtension(imgUrl);
        const filename = `image-${j + 1}${extension}`;
        const filepath = path.join(projectDir, filename);

        // Skip if already exists
        if (fs.existsSync(filepath)) {
          console.log(`⊘ Already exists: ${filename}`);
          continue;
        }

        try {
          await downloadImage(imgUrl, filepath);
          downloadedImages++;
        } catch (err) {
          console.log(`✗ Failed: ${filename}`);
          console.log(`  Error: ${err.message}`);
        }

        // Add a small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      console.log(`✓ Completed: ${folderName} (${uniqueImages.length} images)`);

      // Add delay between pages
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ All done!');
    console.log(`📊 Summary:`);
    console.log(`   - Pages processed: ${pages.length}`);
    console.log(`   - Total images found: ${totalImages}`);
    console.log(`   - Images downloaded: ${downloadedImages}`);
    console.log(`   - Images saved to: ${PUBLIC_DIR}`);
    console.log('='.repeat(60));

  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

main();
