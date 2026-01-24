import { useState, useEffect, useCallback } from 'react';
import { loadCVData, validateCVData } from '../utils/loadCVData';

/**
 * Custom hook to load and manage CV data dynamically
 */
export const useCVData = () => {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCVData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await loadCVData();
      const validated = validateCVData(data);
      setCvData(validated);
      setError(null);
      return validated;
    } catch (err) {
      console.error('Error loading CV data:', err);
      setError(err.message);
      // Set fallback data
      const fallback = await loadCVData();
      const validated = validateCVData(fallback);
      setCvData(validated);
      return validated;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCVData();
  }, [fetchCVData]);

  return { cvData, loading, error };
};
