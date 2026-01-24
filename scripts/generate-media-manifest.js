/**
 * Script to generate media-manifest.json from files in public/media/
 * Run this script to automatically scan and update the media manifest
 * 
 * Usage: node scripts/generate-media-manifest.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MEDIA_DIR = path.join(__dirname, '../public/media');
const MANIFEST_PATH = path.join(__dirname, '../public/data/media-manifest.json');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];

function isImage(filename) {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

function isVideo(filename) {
  const ext = path.extname(filename).toLowerCase();
  return VIDEO_EXTENSIONS.includes(ext);
}

function scanDirectory(dir, basePath = '') {
  const items = [];
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name).replace(/\\/g, '/');
      
      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        items.push(...scanDirectory(fullPath, relativePath));
      } else if (entry.isFile()) {
        // Convert to web path (remove /public prefix)
        const webPath = `/media/${relativePath}`;
        
        if (isImage(entry.name)) {
          items.push({ type: 'image', path: webPath });
        } else if (isVideo(entry.name)) {
          items.push({ type: 'video', path: webPath });
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }
  
  return items;
}

function generateManifest() {
  console.log('Scanning media directory...');
  
  if (!fs.existsSync(MEDIA_DIR)) {
    console.error(`Media directory not found: ${MEDIA_DIR}`);
    process.exit(1);
  }
  
  const mediaItems = scanDirectory(MEDIA_DIR);
  
  const images = mediaItems
    .filter(item => item.type === 'image')
    .map(item => item.path)
    .sort();
  
  const videos = mediaItems
    .filter(item => item.type === 'video')
    .map(item => item.path)
    .sort();
  
  const manifest = {
    images,
    videos,
    lastUpdated: new Date().toISOString(),
  };
  
  // Ensure data directory exists
  const dataDir = path.dirname(MANIFEST_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Write manifest
  fs.writeFileSync(
    MANIFEST_PATH,
    JSON.stringify(manifest, null, 2),
    'utf8'
  );
  
  console.log(`✅ Generated media manifest:`);
  console.log(`   - ${images.length} images found`);
  console.log(`   - ${videos.length} videos found`);
  console.log(`   - Manifest saved to: ${MANIFEST_PATH}`);
}

generateManifest();
