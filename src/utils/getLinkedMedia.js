/**
 * Gets media items linked to a specific project or experience
 * @param {Array} mediaItems - Array of media items with linking info
 * @param {string} type - 'project' or 'experience'
 * @param {string} title - Title of the project or experience
 * @returns {Array} Filtered media items
 */
export const getLinkedMedia = (mediaItems = [], type, title) => {
  if (!mediaItems || mediaItems.length === 0) return [];
  
  return mediaItems.filter(item => {
    if (!item.linkedTo) return false;
    return item.linkedTo.type === type && item.linkedTo.title === title;
  });
};

/**
 * Gets all media linked to a project
 */
export const getProjectMedia = (mediaItems, projectTitle) => {
  return getLinkedMedia(mediaItems, 'project', projectTitle);
};

/**
 * Gets all media linked to an experience
 */
export const getExperienceMedia = (mediaItems, experienceTitle) => {
  return getLinkedMedia(mediaItems, 'experience', experienceTitle);
};
