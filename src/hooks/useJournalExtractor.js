import { useState, useCallback } from 'react';
import { extractMetadata } from '../services/api';
import { normalizeUrl } from '../utils/helpers';

export const useJournalExtractor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [aiIndexingData, setAiIndexingData] = useState(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearResults = useCallback(() => {
    setResults(null);
    setAiIndexingData(null);
  }, []);

  const setIndexingData = useCallback((data) => {
    setAiIndexingData(data);
  }, []);

  const extractFromUrl = useCallback(async (url) => {
    setLoading(true);
    setError(null);
    setResults(null); // Clear previous results immediately
    setAiIndexingData(null); // Clear AI indexing data

    const normalizedUrl = normalizeUrl(url);

    try {
      const data = await extractMetadata('url', { journal_url: normalizedUrl });
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults(null);

      // Auto-open URL in new tab on actual extraction error
      if (normalizedUrl && normalizedUrl.startsWith('http')) {
        window.open(normalizedUrl, '_blank');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const extractFromHtml = useCallback(async (htmlContent, displayUrl = '') => {
    setLoading(true);
    setError(null);
    setResults(null); // Clear previous results immediately
    setAiIndexingData(null); // Clear AI indexing data

    try {
      const data = await extractMetadata('html', {
        html_content: htmlContent,
        display_url: displayUrl
      });
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults(null);

      // Auto-open display URL in new tab on error if available
      if (displayUrl && displayUrl.startsWith('http')) {
        window.open(displayUrl, '_blank');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    results,
    aiIndexingData,
    extractFromUrl,
    extractFromHtml,
    setIndexingData,
    clearError,
    clearResults
  };
};
