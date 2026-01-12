const fs = require('fs');
const path = require('path');

// Mapping of old Squarespace URLs to new local paths
const urlReplacements = {
  // Kitchen Remodel - Norwood
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/107dd495-21fb-4ac9-a767-802328ff51ec/put-an-electrical-outlet-in-that-black-h_XSAWw9woT6KK0d6luSxlIg_Vw2mIPXYT_CZpXUCcT9d1A.png': '/projects/kitchen-remodel-norwood/1.png',

  // ADU & Complete Home Renovation - Norwood
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/dc7457cd-c86f-4370-948f-26555c2122b2/PHOTO-2025-07-19-12-29-43.JPG': '/projects/adu-home-renovation-norwood/1.JPG',

  // Custom Deck - Norwood (multiple decks, using different ones)
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/acbcb058-9695-4d63-b424-3890f79af325/make-this-deck-website-ready-cover-up-th_zRBN2PItRY6g5IBOOCaSLA_FkfUmbfcTQSP5hy4eMDyYQ.png': '/projects/custom-deck-norwood/2.png',
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/bc6a10cf-9138-4586-a532-aa76c7bb3076/change-the-color-of-the-siding-to-a-very_7Y-ZFd5cQoqOHKAeuc0OAw_VUKl3YIoSdijiaB1hs3Ljw.png': '/projects/custom-deck-norwood/1.png',
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/6c226308-14f1-482b-b81a-03bfed912c0f/remove-the-umbrella-on-the-right-and-add_za2mfvfETbSvV050BOGIBw_MIz0W_CwREyaUnntQkiu1Q.png': '/projects/custom-deck-norwood/3.png',

  // Finished Basement - Somerville
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/bdea88e5-a1f0-4488-98b1-5aeef61a5ef6/remove-the-lamp-and-change-white-lights-_Ts1zBaXHRvavv4YfcWYJpQ_i13CJzVnT3-nrZS3-SMr7Q.png': '/projects/finished-basement-somerville/3.png',
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/14c6e714-4463-47be-8057-1c3a6a83ac8b/this-picture-is-blurry-foggy-remove-all-_0GqiFOW7TauYYPJ4Tm6YLg_yJSsEOgmSWWMxCy05yTu5Q.png': '/projects/finished-basement-somerville/1.png',

  // Handicap Accessible Bathroom - Walpole
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/7a9fec22-1fe7-48f1-be5f-eca734cf3f00/Handicap+bathroom+walpole.png': '/projects/handicap-bathroom-walpole/1.png',

  // Bathroom Remodel - Norwood (multiple bathrooms)
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/51e28485-e88f-4516-8f7c-f558de054c8d/add-a-nice-towel_X7q_qo_nRxy8wnD4HCGs2w_Y68MObfSSR6csqDqZ4ymsQ.png': '/projects/bathroom-remodel-norwood/1.png',
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/f2d16a5e-1bf2-4197-a9df-650a55526de0/keep-everything-the-same-but-change-the-_bUn78harT_WmAiALGm13nQ_aDP3MFt4ThCUTJWaG72ghQ.png': '/projects/bathroom-remodel-norwood/3.png',
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/1a1fbe1e-5817-4ca0-9596-c8fe42800a56/chnage-the-faucet-to-match-this-faucet_wtJ-GeWJQuuesiE-BrjUkA_1-x4-aM8T_elR4XnHNcvtw.png': '/projects/bathroom-remodel-norwood/2.png',
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/f13af015-586c-4239-87dd-e15341356a32/make-this-picture-not-blurry-and-make-it_hu8UHOYGTlKeSRiT9S7Btg_7z5zd86JS8KKiSSyjCqEqw.png': '/projects/bathroom-remodel-norwood/5.png',
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/8a3a1285-9217-45d3-a71f-e5795c7e024f/add-color-complimenting-toiletries-and-a_B8KoIXg8TbWJQ_cRr_7cDQ_QfHDv70eSCOSbXADDXbd6A.png': '/projects/bathroom-remodel-norwood/6.png',
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/c49e528a-fad9-4266-8ca8-aa263cb0be90/make-this-picture-not-blurry-and-add-sim_i2rppvcqQtOkfDUySQigfQ_SBlufKoCSzKoFX_K4bAAiQ.png': '/projects/bathroom-remodel-norwood/7.png',

  // Front Entrance - Canton
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/9e061217-74c8-41b5-8c37-d87ff3152102/porch%2Boverhang%2Bafter.jpg': '/projects/front-entrance-canton/1.jpg',

  // Kitchen Remodel - Newton
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/ed9bd3b6-03db-4d2e-9c02-0062710f2a67/this-picture-is-blurry-foggy-make-it-loo_URSPYabqTjKG9UFiygVtNA_ehHy_qcRWqJyONs-IZIZA.png': '/projects/kitchen-remodel-newton/1.png',

  // Finished Basement - Dedham
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/e6f85f4c-e192-4efd-94a3-7ace1843c081/remove-the-lamps-from-the-ceiling-change_jvdHPH1QTm6zmwyWjD639w_lOlXCZoKRtGeDk9BkLZR8A.png': '/projects/finished-basement-dedham/1.png',

  // Finished Attic - Dedham
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/6984bd09-752b-4af0-bf55-8244a1bfb9b1/make-the-picture-quality-look-good-add-s_YPxxeETiR3Ki7x__qbMf-g_SODbLBxUQruHn3f13hmvQg.png': '/projects/finished-attic-dedham/1.png',

  // Kitchen Remodel - Somerville
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/0dad9ec3-b590-474b-b131-e8fef26fbc28/make-the-three-hanging-side-by-side-and-_Q0BUrRkjQZ-4zY6huYHYlw_3B333Y4fSNSFRWJGemiZxA.png': '/projects/kitchen-remodel-somerville/1.png',

  // Bay Window - Norwood
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/f1103e44-b359-4733-871f-4618753773c5/make-this-picture-not-blurry-and-make-it_cpC8pG2kRyW718uytRqlDw_PeJaHfV-RyGHlKeEBr25bQ.png': '/projects/bay-window-norwood/1.png',

  // Interior Double Door - Norwood
  'https://images.squarespace-cdn.com/content/v1/6958347f9f53aa0c28f25009/15e9f32c-b6a1-48f3-b4f7-848bf6e9a076/make-this-picture-more-clear_hZrKomFpQSqJ3Ajt_bQNWA_JrGan6yaSrKsJeVrGVIy7w.png': '/projects/double-door-norwood/1.png'
};

function updateImagePaths() {
  const projectsDataPath = path.join(__dirname, '..', 'src', 'data', 'projects-data.js');
  const featuredProjectsPath = path.join(__dirname, '..', 'src', 'components', 'FeaturedProjects', 'featured-projects-content.js');

  console.log('Updating image paths in data files...\n');

  // Update projects-data.js
  let projectsContent = fs.readFileSync(projectsDataPath, 'utf8');
  let replacements = 0;

  for (const [oldUrl, newPath] of Object.entries(urlReplacements)) {
    if (projectsContent.includes(oldUrl)) {
      projectsContent = projectsContent.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
      replacements++;
      console.log(`✓ Replaced: ${path.basename(newPath)}`);
    }
  }

  fs.writeFileSync(projectsDataPath, projectsContent);
  console.log(`\n✓ Updated projects-data.js (${replacements} replacements)`);

  // Update featured-projects-content.js
  if (fs.existsSync(featuredProjectsPath)) {
    let featuredContent = fs.readFileSync(featuredProjectsPath, 'utf8');
    let featuredReplacements = 0;

    for (const [oldUrl, newPath] of Object.entries(urlReplacements)) {
      if (featuredContent.includes(oldUrl)) {
        featuredContent = featuredContent.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
        featuredReplacements++;
      }
    }

    fs.writeFileSync(featuredProjectsPath, featuredContent);
    console.log(`✓ Updated featured-projects-content.js (${featuredReplacements} replacements)`);
  }

  console.log('\n✅ All data files updated successfully!');
}

updateImagePaths();
