import { useState, useCallback } from 'react';
import { extractMetadata } from '../services/api';
import { normalizeUrl } from '../utils/helpers';

export const useJournalExtractor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const extractFromUrl = useCallback(async (url) => {
    setLoading(true);
    setError(null);
    
    try {
      const normalizedUrl = normalizeUrl(url);
      const data = await extractMetadata('url', { journal_url: normalizedUrl });
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const extractFromHtml = useCallback(async (htmlContent, displayUrl = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await extractMetadata('html', { 
        html_content: htmlContent,
        display_url: displayUrl 
      });
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    results,
    extractFromUrl,
    extractFromHtml,
    clearError
  };
};
