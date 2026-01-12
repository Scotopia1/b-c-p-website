# Project Image Fetcher

This script fetches all images from the old BCP website (bcp411.com) and organizes them into project folders.

## How to Use

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the script:**
   ```bash
   npm run fetch-images
   ```

3. **The script will:**
   - Fetch the sitemap from https://www.bcp411.com/sitemap.xml
   - Parse all URLs in the sitemap
   - Visit each page and extract all images
   - Download images and save them in `public/projects/[page-name]/`
   - Each folder will contain numbered images (image-1.jpg, image-2.jpg, etc.)

## Output Structure

```
public/
└── projects/
    ├── kitchen-remodel-norwood/
    │   ├── image-1.jpg
    │   ├── image-2.jpg
    │   └── ...
    ├── adu-renovation/
    │   ├── image-1.jpg
    │   └── ...
    └── ...
```

## Notes

- The script includes delays between requests to be respectful to the server
- Images are saved with sequential numbering
- SVG files and data URLs are skipped
- Failed downloads are logged but don't stop the script
- The script automatically creates necessary directories

## Troubleshooting

If you encounter errors:
- Check your internet connection
- Verify the sitemap URL is accessible
- Ensure you have write permissions in the public folder
- Check the console output for specific error messages
