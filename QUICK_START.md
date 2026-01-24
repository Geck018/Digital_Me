# Quick Start Guide

## 🚀 Get Your CV Online in 3 Steps

### Step 1: Add Your CV Data
Edit `public/data/cv.json` with your information. The file structure is already set up - just fill in your details!

### Step 2: Add Your Media
1. Drop images into `public/media/screenshots/`
2. Drop videos into `public/media/videos/`
3. Run: `npm run generate-media` to update the manifest
4. Or manually edit `public/data/media-manifest.json`

### Step 3: View Your Site
```bash
npm run dev
```
Open `http://localhost:5173` and see your CV!

## 📝 Example: Adding a New Project Screenshot

1. Save image as `public/media/screenshots/my-project.jpg`
2. Run `npm run generate-media`
3. Refresh browser → Image appears in gallery automatically!

## 📝 Example: Updating Your Bio

1. Edit `public/data/cv.json`
2. Change the `bio` field in `personal` section
3. Save → Refresh browser → Bio updates instantly!

## 🎯 Key Files

- **CV Data**: `public/data/cv.json` - Your CV information
- **Media Manifest**: `public/data/media-manifest.json` - List of all media files
- **Media Folder**: `public/media/` - Where you drop images/videos

That's it! The site is fully reactive - just update files and refresh.
