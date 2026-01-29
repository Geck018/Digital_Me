/**
 * Script to encrypt sensitive personal information in cv.json
 * Run with: node scripts/encrypt-cv-data.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple encryption key (same as in encryption.js)
const ENCRYPTION_KEY = 'marnus-cv-secure-key-2024';

function xorCipher(text, key) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

function encodeData(data) {
  if (!data) return '';
  const encoded = xorCipher(data, ENCRYPTION_KEY);
  return Buffer.from(encoded).toString('base64');
}

function encryptCVData() {
  const cvPath = path.join(__dirname, '../public/data/cv.json');
  
  try {
    // Read the CV data
    const cvData = JSON.parse(fs.readFileSync(cvPath, 'utf8'));
    
    // Encrypt sensitive fields
    if (cvData.personal) {
      if (cvData.personal.email) {
        cvData.personal.email = encodeData(cvData.personal.email);
      }
      if (cvData.personal.phoneNumber) {
        cvData.personal.phoneNumber = encodeData(cvData.personal.phoneNumber);
      }
      if (cvData.personal.whatsappNumber) {
        cvData.personal.whatsappNumber = encodeData(cvData.personal.whatsappNumber);
      }
    }
    
    // Write back the encrypted data
    fs.writeFileSync(cvPath, JSON.stringify(cvData, null, 2), 'utf8');
    
    console.log('✅ Successfully encrypted personal information in cv.json');
    console.log('📧 Email encrypted');
    console.log('📞 Phone number encrypted');
    console.log('💬 WhatsApp number encrypted');
    
  } catch (error) {
    console.error('❌ Error encrypting CV data:', error.message);
    process.exit(1);
  }
}

encryptCVData();
