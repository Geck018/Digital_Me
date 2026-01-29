/**
 * Simple encryption/decryption utility for protecting personal information
 * Uses a simple cipher with a key for encoding/decoding sensitive data
 */

// Simple encryption key (in production, this could be an env variable)
// For a CV site, this is just obfuscation - not military-grade security
const ENCRYPTION_KEY = 'marnus-cv-secure-key-2024';

/**
 * Simple XOR cipher for encoding/decoding strings
 */
function xorCipher(text, key) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

/**
 * Encode sensitive data (email, phone numbers)
 */
export function encodeData(data) {
  if (!data) return '';
  const encoded = xorCipher(data, ENCRYPTION_KEY);
  return btoa(encoded); // Base64 encode for safe JSON storage
}

/**
 * Decode sensitive data
 */
export function decodeData(encodedData) {
  if (!encodedData) return '';
  try {
    // Check if it looks like base64 encoded data
    if (encodedData.match(/^[A-Za-z0-9+/=]+$/) && encodedData.length > 10) {
      const decoded = atob(encodedData); // Base64 decode
      return xorCipher(decoded, ENCRYPTION_KEY);
    }
    // If it doesn't look encoded, return as-is (for backward compatibility)
    return encodedData;
  } catch (e) {
    // If decoding fails, return original (for backward compatibility)
    return encodedData;
  }
}

/**
 * Check if a string is encoded (starts with base64 pattern)
 */
function isEncoded(str) {
  if (!str) return false;
  // Base64 strings typically don't contain spaces and have specific patterns
  return /^[A-Za-z0-9+/=]+$/.test(str) && str.length > 10 && str !== atob(btoa(str));
}

/**
 * Smart decode - only decodes if it appears to be encoded
 */
export function smartDecode(data) {
  if (typeof data !== 'string') return data;
  // Try to decode, if it fails or looks like plain text, return as-is
  try {
    const decoded = decodeData(data);
    // If decoded looks like valid contact info, use it
    if (decoded.includes('@') || decoded.match(/^[\d\s\+\-\(\)]+$/)) {
      return decoded;
    }
  } catch (e) {
    // Not encoded, return original
  }
  return data;
}
