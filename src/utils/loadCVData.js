import { decodeData } from './encryption';

/**
 * Dynamically loads CV data from the data folder
 * Supports JSON format - just upload your CV as cv.json to public/data/
 * Can optionally include media list in the CV data itself
 * Automatically decrypts sensitive personal information
 */
export const loadCVData = async () => {

  try {
    // Try to load from public/data/cv.json
    const response = await fetch('/data/cv.json');
    
    if (!response.ok) {
      throw new Error('CV data file not found');
    }
    
    const data = await response.json();
    
    // Decrypt sensitive personal information
    if (data.personal) {
      if (data.personal.email) {
        data.personal.email = decodeData(data.personal.email);
      }
      if (data.personal.phoneNumber) {
        data.personal.phoneNumber = decodeData(data.personal.phoneNumber);
      }
      if (data.personal.whatsappNumber) {
        data.personal.whatsappNumber = decodeData(data.personal.whatsappNumber);
      }
    }
    
    // If media is included in CV data, extract it
    if (data.media) {
      // Media is already in the CV data, return as-is
      return data;
    }
    
    return data;
  } catch (error) {
    console.warn('Could not load CV data from /data/cv.json, using fallback:', error.message);
    // Fallback to default data structure
    return getDefaultCVData();
  }
};

/**
 * Default CV data structure (fallback)
 */
const getDefaultCVData = () => {
  return {
    personal: {
      name: 'Your Name',
      title: 'Your Professional Title',
      profileImage: '',
      bio: 'A passionate professional with expertise in web development, design, and technology. Always eager to learn and take on new challenges.',
      phoneNumber: '',
      whatsappNumber: '',
      email: '',
    },
    skills: [],
    experience: [],
    projects: [],
    socials: {},
  };
};

/**
 * Validates CV data structure
 */
export const validateCVData = (data) => {
  const required = ['personal'];
  const missing = required.filter(key => !data[key]);
  
  if (missing.length > 0) {
    console.warn('CV data missing required fields:', missing);
  }
  
  return data;
};
