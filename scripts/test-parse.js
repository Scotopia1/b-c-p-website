const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function test() {
  const xml = await fetchUrl('https://www.bcp411.com/sitemap.xml');

  console.log('XML Length:', xml.length);

  const urlBlocks = xml.split('<url>');
  console.log('Total <url> blocks:', urlBlocks.length);

  // Test first url block
  if (urlBlocks[1]) {
    const firstBlock = urlBlocks[1];
    console.log('\nFirst block preview:', firstBlock.substring(0, 200));

    const locMatch = firstBlock.match(/<loc>([^<]+)<\/loc>/);
    console.log('LOC match:', locMatch ? locMatch[1] : 'NO MATCH');

    const imageRegex = /<image:loc>([^<]+)<\/image:loc>/g;
    let match;
    let count = 0;
    while ((match = imageRegex.exec(firstBlock)) !== null) {
      count++;
      if (count <= 2) {
        console.log('Image', count, ':', match[1].substring(0, 80) + '...');
      }
    }
    console.log('Total images in first block:', count);
  }
}

test().catch(console.error);
