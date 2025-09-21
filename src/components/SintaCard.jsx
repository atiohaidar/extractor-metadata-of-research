import React, { useState, useEffect } from 'react';
import { fetchSintaInfo } from '../services/api';
import { extractSintaIdFromUrl } from '../utils/helpers';
import { extractPublicationYears, isYearMatching } from '../utils/yearUtils';

const SintaCard = ({ metadata, aiIndexingData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sintaData, setSintaData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [aiSintaUrl, setAiSintaUrl] = useState(null);

  useEffect(() => {
    // Reset state when metadata changes
    setVisible(false);
    setLoading(false);
    setError(null);
    setSintaData(null);
    setAiSintaUrl(null);

    const loadSintaInfo = async () => {
      // First, try to use AI indexing data if available
      if (aiIndexingData?.sinta) {
        setVisible(true);
        setAiSintaUrl(aiIndexingData.sinta);

        // Extract Sinta ID from AI-provided URL and fetch detailed info
        const sintaId = extractSintaIdFromUrl(aiIndexingData.sinta);
        if (sintaId) {
          setLoading(true);
          try {
            const data = await fetchSintaInfo(sintaId);
            setSintaData(data);
          } catch (err) {
            if (err.message.includes('HTTP 404')) {
              setError(`ID Sinta ${sintaId} tidak ditemukan`);
            } else {
              setError(`Failed to load Sinta info: ${err.message}`);
            }
          } finally {
            setLoading(false);
          }
        }
        return;
      }

      // Fallback to original metadata extraction
      if (!metadata || !metadata.sinta_link || !metadata.sinta_link.url) return;

      const sintaId = extractSintaIdFromUrl(metadata.sinta_link.url);
      if (!sintaId) return;

      setVisible(true);
      setLoading(true);
      setError(null);

      try {
        const data = await fetchSintaInfo(sintaId);
        setSintaData(data);
      } catch (err) {
        setError(`Failed to load Sinta info: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadSintaInfo();
  }, [metadata, aiIndexingData]);

  if (!visible) return null;

  const renderAccreditationHistory = () => {
    if (!sintaData || !sintaData.accreditation_history) {
      return <span className="text-gray-500">No data</span>;
    }

    const hist = sintaData.accreditation_history;
    const years = Object.keys(hist).filter(y => /^(\d{4})$/.test(y)).sort((a, b) => b.localeCompare(a));
    const pubYears = extractPublicationYears(metadata);

    if (years.length === 0) {
      return <span className="text-gray-500">No data</span>;
    }

    return (
      <div>
        {years.map(year => {
          const levelRaw = String(hist[year] || '').trim();
          const level = levelRaw.toUpperCase();
          const matched = isYearMatching(year, pubYears);

          return (
            <span
              key={year}
              className={`inline-block px-2 py-1 text-xs font-semibold rounded-full me-2 mb-2 ${matched
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
                }`}
            >
              {year}: {level}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="rounded-lg bg-white mb-8 transition-all duration-300 ease-in-out shadow-lg border border-gray-100 card-hover-enhanced opacity-0 animate-fadeIn">
      <div className="card-header px-6 py-4 text-white rounded-t-lg">
        <i className="bi bi-award me-2"></i>Info Jurnal Sinta
      </div>
      <div className="p-6">
        {loading && (
          <div id="sinta-loading" className="flex items-center">
            <div className="inline-block w-4 h-4 border-2 border-green-600 border-r-transparent rounded-full animate-spin me-2" role="status"></div>
            <span>Memuat info Sinta...</span>
          </div>
        )}

        {error && (
          <div id="sinta-error" className="text-red-600">{error}</div>
        )}

        {sintaData && !loading && (
          <div id="sinta-content">
            <div className="mb-2">
              <strong>Nama:</strong>
              <span id="sinta-name" className="ms-1">{sintaData.name || '-'}</span>
            </div>
            <div className="mb-2">
              <strong>Website:</strong>
              {sintaData.website_url ? (
                <a id="sinta-website" className="ms-1 text-blue-600 hover:text-blue-800 underline" href={sintaData.website_url} target="_blank" rel="noopener noreferrer">
                  {sintaData.website_url}
                </a>
              ) : (
                <span id="sinta-website" className="ms-1">-</span>
              )}
            </div>
            {aiSintaUrl && (
              <div className="mb-2">
                <strong>Link Sinta (AI Detected):</strong>
                <a id="ai-sinta-link" className="ms-1 text-purple-600 hover:text-purple-800 underline" href={aiSintaUrl} target="_blank" rel="noopener noreferrer">
                  {aiSintaUrl}
                </a>
              </div>
            )}
            <div className="mb-2">
              <strong>Riwayat Akreditasi:</strong>
              <div id="sinta-accreditation-history" className="mt-1">
                {renderAccreditationHistory()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SintaCard;
