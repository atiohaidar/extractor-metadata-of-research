import React, { useState, useEffect } from 'react';
import { fetchSintaInfo } from '../services/api';
import { extractSintaIdFromUrl } from '../utils/helpers';
import { extractPublicationYears, isYearMatching } from '../utils/yearUtils';

const SintaCard = ({ metadata }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sintaData, setSintaData] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const loadSintaInfo = async () => {
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
  }, [metadata]);

  if (!visible) return null;

  const renderAccreditationHistory = () => {
    if (!sintaData || !sintaData.accreditation_history) {
      return <span className="text-muted">No data</span>;
    }

    const hist = sintaData.accreditation_history;
    const years = Object.keys(hist).filter(y => /^(\d{4})$/.test(y)).sort((a,b) => b.localeCompare(a));
    const pubYears = extractPublicationYears(metadata);

    if (years.length === 0) {
      return <span className="text-muted">No data</span>;
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
              className={`badge rounded-pill ${matched ? 'text-bg-success' : 'text-bg-secondary'} me-2 mb-2`}
            >
              {year}: {level}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="card mb-4 fade-in">
      <div className="card-header">
        <i className="bi bi-award me-2"></i>Info Jurnal Sinta
      </div>
      <div className="card-body">
        {loading && (
          <div id="sinta-loading" className="d-flex align-items-center">
            <div className="spinner-border spinner-border-sm text-success me-2" role="status"></div>
            <span>Memuat info Sinta...</span>
          </div>
        )}
        
        {error && (
          <div id="sinta-error" className="text-danger">{error}</div>
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
                <a id="sinta-website" className="ms-1" href={sintaData.website_url} target="_blank" rel="noopener noreferrer">
                  {sintaData.website_url}
                </a>
              ) : (
                <span id="sinta-website" className="ms-1">-</span>
              )}
            </div>
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
