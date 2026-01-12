const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// All discovered project images from BCP website
const projectImages = {
  'kitchen-remodel-norwood': [
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/107dd495-21fb-4ac9-a767-802328ff51ec/put-an-electrical-outlet-in-that-black-h_XSAWw9woT6KK0d6luSxlIg_Vw2mIPXYT_CZpXUCcT9d1A.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/b6379087-b98c-4adc-b67b-0a78b53cfba4/put-an-electrical-outlet-in-that-black-h_XSAWw9woT6KK0d6luSxlIg_Vw2mIPXYT_CZpXUCcT9d1A.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/7ef29259-4bb8-4478-82aa-d92d8279d55b/PNpEQyGASMCJlRQcs3opmQ.webp',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/c2c4a116-7701-4f21-9053-01c22221291e/remove-every-accesory-and-unblur-this-ph_PpwJsBfMRFef0JCVc9ao5w_91wMQC1AS1GOEaDWWTw7Jw.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/72f5c3d8-0635-4a32-92f2-978578087101/-lCRtAc2S6yYiuaX0JBy6w.webp',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/0041a1db-9d2d-4210-9ada-4f1e17d7f989/EvrAmfFLSUaU-lLRRLClzw.webp',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/29577a4c-4f7e-420f-af74-8eab6789c084/unblur-this-photo-for-my-website-change-_XG4v3D5uR1mZD3ETCie7EA_nxW_6IMKREKzXwZL_JBaDg.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/69aad432-adc7-4e35-915a-267500863681/unblur-this-photo-for-my-website-change-_3Z0I_wmlSYyPW9lr2Nqrgw_TlCwFms5Seq6mMenhuZGvA.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/9c2a8d4d-d292-420f-bf8e-525408570a5f/unblur-this-photo-change-nothing-else_V_OBetseRI-FRD6px7Sz8A_eOHZyE3uROGy-If5kyZ9xw.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/0761bb77-e392-426f-acb6-8520e73394c2/Screenshot+2026-01-07+180705.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/2419bc93-06e3-4855-ad06-4ca0050b057c/Screenshot+2026-01-07+181407.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/1767827484914-G967M2QY8BX8HSOFPGC6/Screenshot%2B2026-01-07%2B180900.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/1daa0d63-e720-4a9f-baa7-0a067325ddbb/internal_upload_LwkbhHhKSGy50n9w4D4nwA.png'
  ],
  'adu-home-renovation-norwood': [
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/dc7457cd-c86f-4370-948f-26555c2122b2/PHOTO-2025-07-19-12-29-43.JPG'
  ],
  'custom-deck-norwood': [
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/bc6a10cf-9138-4586-a532-aa76c7bb3076/change-the-color-of-the-siding-to-a-very_7Y-ZFd5cQoqOHKAeuc0OAw_VUKl3YIoSdijiaB1hs3Ljw.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/acbcb058-9695-4d63-b424-3890f79af325/make-this-deck-website-ready-cover-up-th_zRBN2PItRY6g5IBOOCaSLA_FkfUmbfcTQSP5hy4eMDyYQ.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/6c226308-14f1-482b-b81a-03bfed912c0f/remove-the-umbrella-on-the-right-and-add_za2mfvfETbSvV050BOGIBw_MIz0W_CwREyaUnntQkiu1Q.png'
  ],
  'finished-basement-somerville': [
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/14c6e714-4463-47be-8057-1c3a6a83ac8b/this-picture-is-blurry-foggy-remove-all-_0GqiFOW7TauYYPJ4Tm6YLg_yJSsEOgmSWWMxCy05yTu5Q.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/dcbd9fb5-3e22-46e1-a47c-58ad2a0b6262/furnish-this-basement-with-high-class-lu_PffCjuhbQXakUjmHa_owLQ_BT1tJaBeTB-oFP12Gf0eqg.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/bdea88e5-a1f0-4488-98b1-5aeef61a5ef6/remove-the-lamp-and-change-white-lights-_Ts1zBaXHRvavv4YfcWYJpQ_i13CJzVnT3-nrZS3-SMr7Q.png'
  ],
  'handicap-bathroom-walpole': [
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/7a9fec22-1fe7-48f1-be5f-eca734cf3f00/Handicap+bathroom+walpole.png'
  ],
  'bathroom-remodel-norwood': [
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/51e28485-e88f-4516-8f7c-f558de054c8d/add-a-nice-towel_X7q_qo_nRxy8wnD4HCGs2w_Y68MObfSSR6csqDqZ4ymsQ.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/1a1fbe1e-5817-4ca0-9596-c8fe42800a56/chnage-the-faucet-to-match-this-faucet_wtJ-GeWJQuuesiE-BrjUkA_1-x4-aM8T_elR4XnHNcvtw.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/f2d16a5e-1bf2-4197-a9df-650a55526de0/keep-everything-the-same-but-change-the-_bUn78harT_WmAiALGm13nQ_aDP3MFt4ThCUTJWaG72ghQ.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/6f6e9282-44ba-4005-af52-e6bc051bb2ed/make-the-walls-a-little-bit-lighter-and-_lv5hb11nQ66ujGC9i2GyhA_2dvr03UdR8OKkPCmjZVpkQ.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/f13af015-586c-4239-87dd-e15341356a32/make-this-picture-not-blurry-and-make-it_hu8UHOYGTlKeSRiT9S7Btg_7z5zd86JS8KKiSSyjCqEqw.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/8a3a1285-9217-45d3-a71f-e5795c7e024f/add-color-complimenting-toiletries-and-a_B8KoIXg8TbWJQ_cRr_7cDQ_QfHDv70eSCOSbXADDXbd6A.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/c49e528a-fad9-4266-8ca8-aa263cb0be90/make-this-picture-not-blurry-and-add-sim_i2rppvcqQtOkfDUySQigfQ_SBlufKoCSzKoFX_K4bAAiQ.png'
  ],
  'front-entrance-canton': [
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/9e061217-74c8-41b5-8c37-d87ff3152102/porch%2Boverhang%2Bafter.jpg'
  ],
  'kitchen-remodel-newton': [
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/ed9bd3b6-03db-4d2e-9c02-0062710f2a67/this-picture-is-blurry-foggy-make-it-loo_URSPYabqTjKG9UFiygVtNA_ehHy_qcRWqJyONs-IZIZA.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/65a9b578-7e9d-485d-ac57-4687828abeea/there-is-a-person-who-is-point-in-the-le_avkX2Mm3RPyx_Pf4weDPVw_cmqwtxnpTbmzeP9Fe37zXQ+%281%29.png'
  ],
  'finished-basement-dedham': [
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/e6f85f4c-e192-4efd-94a3-7ace1843c081/remove-the-lamps-from-the-ceiling-change_jvdHPH1QTm6zmwyWjD639w_lOlXCZoKTtGeDk9BkLZR8A.png'
  ],
  'finished-attic-dedham': [
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/6984bd09-752b-4af0-bf55-8244a1bfb9b1/make-the-picture-quality-look-good-add-s_YPxxeETiR3Ki7x__qbMf-g_SODbLBxUQruHn3f13hmvQg.png'
  ],
  'kitchen-remodel-somerville': [
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/0dad9ec3-b590-474b-b131-e8fef26fbc28/make-the-three-hanging-side-by-side-and-_Q0BUrRkjQZ-4zY6huYHYlw_3B333Y4fSNSFRWJGemiZxA.png'
  ],
  'bay-window-norwood': [
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/f1103e44-b359-4733-871f-4618753773c5/make-this-picture-not-blurry-and-make-it_cpC8pG2kRyW718uytRqlDw_PeJaHfV-RyGHlKeEBr25bQ.png'
  ],
  'double-door-norwood': [
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/15e9f32c-b6a1-48f3-b4f7-848bf6e9a076/make-this-picture-more-clear_hZrKomFpQSqJ3Ajt_bQNWA_JrGan6yaSrKsJeVrGVIy7w.png'
  ],
  'addition-norwood': [
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/e4ba2ea8-5597-47b8-a09b-3c06c88fec39/make-this-photo-website-ready-edit-it-to_NYHZ-MYPToGWPFPEsmJ4pg_nNoBMBM3TtaZdQ5JpqBNsQ.png',
    'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/0d9acdd5-e66e-4a3a-9af8-7317ba9399fa/PHOTO-2025-07-19-18-39-09.png'
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
          console.log(`  ✓ Downloaded: ${path.basename(filepath)}`);
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

// Main function
async function downloadProjectImages() {
  console.log('Downloading project images...\n');

  const baseDir = path.join(__dirname, '..', 'public', 'projects');
  ensureDir(baseDir);

  let stats = {
    total: 0,
    downloaded: 0,
    failed: 0
  };

  for (const [projectName, imageUrls] of Object.entries(projectImages)) {
    console.log(`\nProject: ${projectName}`);
    console.log(`  ${imageUrls.length} images to download`);

    const projectDir = path.join(baseDir, projectName);
    ensureDir(projectDir);

    for (let i = 0; i < imageUrls.length; i++) {
      const url = imageUrls[i];
      const ext = url.split('.').pop().split('?')[0].split('%')[0] || 'jpg';
      const filename = `${i + 1}.${ext}`;
      const filepath = path.join(projectDir, filename);

      try {
        await downloadImage(url, filepath);
        stats.downloaded++;
        stats.total++;
      } catch (err) {
        console.error(`  ✗ Failed: ${filename} - ${err.message}`);
        stats.failed++;
        stats.total++;
      }
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Total images: ${stats.total}`);
  console.log(`Downloaded: ${stats.downloaded}`);
  console.log(`Failed: ${stats.failed}`);
}

// Run the script
downloadProjectImages().catch(console.error);
