import { useState, useEffect } from 'react';
import { loadMediaFromManifest, organizeMediaByCategory } from '../utils/loadMedia';

/**
 * Custom hook to load and manage media files dynamically
 * Can accept media from CV data if it's included there
 */
export const useMedia = (cvDataMedia = null) => {
  const [media, setMedia] = useState({ images: [], videos: [], all: [], items: [] });
  const [organizedMedia, setOrganizedMedia] = useState({
    screenshots: [],
    videos: [],
    profile: [],
    other: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const mediaData = await loadMediaFromManifest(cvDataMedia);
        setMedia(mediaData);
        
        const organized = organizeMediaByCategory(mediaData);
        setOrganizedMedia(organized);
        
        setError(null);
      } catch (err) {
        console.error('Error loading media:', err);
        setError(err.message);
        setMedia({ images: [], videos: [], all: [], items: [] });
        setOrganizedMedia({ screenshots: [], videos: [], profile: [], other: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [cvDataMedia]);

  return { media, organizedMedia, loading, error };
};
