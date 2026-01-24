import { useCallback } from 'react';

/**
 * Custom hook for contact functionality
 * @param {string} phoneNumber - Phone number in international format (e.g., +1234567890)
 * @param {string} whatsappNumber - WhatsApp number (can be same as phoneNumber)
 * @returns {Object} Contact methods
 */
export const useContact = (phoneNumber = '', whatsappNumber = '') => {
  const callPhone = useCallback(() => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    }
  }, [phoneNumber]);

  const openWhatsApp = useCallback((message = '') => {
    if (whatsappNumber) {
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}${message ? `?text=${encodedMessage}` : ''}`;
      window.open(whatsappUrl, '_blank');
    }
  }, [whatsappNumber]);

  return {
    callPhone,
    openWhatsApp,
  };
};
