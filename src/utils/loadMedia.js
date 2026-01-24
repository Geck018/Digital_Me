/**
 * Dynamically loads all media files from the media folder
 * Scans for images and videos in public/media/
 */

// Supported image formats
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
// Supported video formats
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];

/**
 * Checks if a file is an image based on extension
 */
const isImage = (filename) => {
  const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return IMAGE_EXTENSIONS.includes(ext);
};

/**
 * Checks if a file is a video based on extension
 */
const isVideo = (filename) => {
  const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return VIDEO_EXTENSIONS.includes(ext);
};

/**
 * Loads media manifest from a JSON file
 * The manifest should be generated or manually created listing all media files
 */
export const loadMediaManifest = async () => {
  try {
    const response = await fetch('/data/media-manifest.json');
    if (!response.ok) {
      throw new Error('Media manifest not found');
    }
    const manifest = await response.json();
    return manifest;
  } catch (error) {
    console.warn('Media manifest not found, using empty gallery:', error.message);
    return { images: [], videos: [] };
  }
};

/**
 * Gets all media files using Vite's glob import
 * This works at build time to include all media files
 */
export const getAllMedia = () => {
  // Use Vite's import.meta.glob to get all media files
  // This will be processed at build time
  const images = import.meta.glob('/public/media/**/*.{jpg,jpeg,png,gif,webp,svg}', { 
    eager: true,
    import: 'default'
  });
  
  const videos = import.meta.glob('/public/media/**/*.{mp4,webm,ogg,mov,avi}', {
    eager: true,
    import: 'default'
  });

  // Convert to array of paths
  const imagePaths = Object.keys(images).map(path => 
    path.replace('/public', '')
  );
  
  const videoPaths = Object.keys(videos).map(path => 
    path.replace('/public', '')
  );

  return {
    images: imagePaths,
    videos: videoPaths,
  };
};

/**
 * Alternative: Load media dynamically from a directory listing
 * Note: This requires a server-side endpoint or build-time generation
 * Also supports loading media from CV data if it's included there
 * Supports linked media with references to projects/experiences
 */
export const loadMediaFromManifest = async (cvDataMedia = null) => {
  // If media is provided from CV data (new format with linking)
  if (cvDataMedia && Array.isArray(cvDataMedia)) {
    // New format: array of media objects with linking
    const images = cvDataMedia
      .filter(item => item.type === 'image' || (!item.type && /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(item.path)))
      .map(item => ({
        path: item.path,
        type: item.type || 'image',
        linkedTo: item.project ? { type: 'project', title: item.project } : 
                  item.experience ? { type: 'experience', title: item.experience } : null,
        caption: item.caption || '',
        alt: item.alt || item.path.split('/').pop(),
      }));
    
    const videos = cvDataMedia
      .filter(item => item.type === 'video' || /\.(mp4|webm|ogg|mov|avi)$/i.test(item.path))
      .map(item => ({
        path: item.path,
        type: item.type || 'video',
        linkedTo: item.project ? { type: 'project', title: item.project } : 
                  item.experience ? { type: 'experience', title: item.experience } : null,
        caption: item.caption || '',
        alt: item.alt || item.path.split('/').pop(),
      }));
    
    return {
      images: images.map(img => img.path),
      videos: videos.map(vid => vid.path),
      all: [...images.map(img => img.path), ...videos.map(vid => vid.path)],
      items: [...images, ...videos], // Full media items with metadata
    };
  }
  
  // Legacy format: simple arrays
  if (cvDataMedia && (cvDataMedia.images || cvDataMedia.videos)) {
    return {
      images: cvDataMedia.images || [],
      videos: cvDataMedia.videos || [],
      all: [...(cvDataMedia.images || []), ...(cvDataMedia.videos || [])],
      items: [
        ...(cvDataMedia.images || []).map(path => ({ path, type: 'image', alt: path.split('/').pop() })),
        ...(cvDataMedia.videos || []).map(path => ({ path, type: 'video', alt: path.split('/').pop() })),
      ],
    };
  }
  
  // Otherwise, try to load from separate manifest file
  const manifest = await loadMediaManifest();
  
  return {
    images: manifest.images || [],
    videos: manifest.videos || [],
    all: [...(manifest.images || []), ...(manifest.videos || [])],
    items: [
      ...(manifest.images || []).map(path => ({ path, type: 'image', alt: path.split('/').pop() })),
      ...(manifest.videos || []).map(path => ({ path, type: 'video', alt: path.split('/').pop() })),
    ],
  };
};

/**
 * Organizes media by category (screenshots, videos, etc.)
 */
export const organizeMediaByCategory = (media) => {
  const organized = {
    screenshots: [],
    videos: [],
    profile: [],
    other: [],
  };

  media.images.forEach(path => {
    if (path.includes('/screenshots/')) {
      organized.screenshots.push(path);
    } else if (path.includes('profile') || path.includes('avatar')) {
      organized.profile.push(path);
    } else {
      organized.other.push(path);
    }
  });

  media.videos.forEach(path => {
    organized.videos.push(path);
  });

  return organized;
};
