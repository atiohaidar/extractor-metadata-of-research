import React, { useState, useEffect } from 'react';
import { fetchScimagoInfo } from '../services/api';
import { extractPublicationYears, isYearMatching } from '../utils/yearUtils';

const ScimagoCard = ({ metadata }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scimagoData, setScimagoData] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Reset state when metadata changes
    setVisible(false);
    setLoading(false);
    setError(null);
    setScimagoData(null);

    const loadScimagoInfo = async () => {
      if (!metadata || !metadata.scimago_info || !metadata.scimago_info.url) return;

      setVisible(true);
      setLoading(true);
      setError(null);

      try {
        const data = await fetchScimagoInfo(metadata.scimago_info.url);
        setScimagoData(data);
      } catch (err) {
        setError(`Gagal memuat info SCImago: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadScimagoInfo();
  }, [metadata]);

  if (!visible) return null;

  const renderQuartiles = () => {
    if (!scimagoData || !Array.isArray(scimagoData.quartiles) || scimagoData.quartiles.length === 0) {
      return <span className="text-gray-500">Tidak ada data quartile.</span>;
    }

    const byYear = {};
    scimagoData.quartiles.forEach(q => {
      if (!byYear[q.year]) byYear[q.year] = [];
      byYear[q.year].push(q);
    });

    const years = Object.keys(byYear).sort();
    const pubYears = extractPublicationYears(metadata);

    return (
      <div>
        {years.map(year => {
          const highlight = isYearMatching(year, pubYears);
          
          return (
            <div key={year} className="mb-1">
              <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full me-2 ${
                highlight ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {year}
              </span>
              {byYear[year].map((q, index) => (
                <span key={index} className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full me-1">
                  {q.category}: {q.quartile}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`rounded-lg bg-white mb-8 transition-all duration-300 ease-in-out shadow-lg border border-gray-100 card-hover-enhanced opacity-0 animate-fadeIn ${visible ? 'block' : 'hidden'}`}>
      <div className="card-header px-6 py-4 text-white rounded-t-lg">
        <i className="bi bi-bar-chart-fill me-2"></i>Info Jurnal SCImago
      </div>
      <div className="p-6">
        {loading && (
          <div id="scimago-loading" className="flex items-center">
            <div className="inline-block w-4 h-4 border-2 border-blue-600 border-r-transparent rounded-full animate-spin me-2" role="status"></div>
            <span>Memuat info SCImago...</span>
          </div>
        )}
        
        {error && (
          <div id="scimago-error" className="text-red-600">{error}</div>
        )}
        
        {scimagoData && !loading && (
          <div id="scimago-content">
            <div className="mb-2 flex items-center">
              {metadata.scimago_info?.img && (
                <img 
                  id="scimago-img"
                  src={metadata.scimago_info.img} 
                  alt="SCImago Logo" 
                  style={{ height: '40px', width: 'auto', maxWidth: '80px' }}
                  className="me-3"
                />
              )}
              <div>
                <strong>Nama:</strong> <span id="scimago-name">{scimagoData.name || '-'}</span><br />
                <strong>Penerbit:</strong> <span id="scimago-publisher">{scimagoData.publisher || '-'}</span><br />
                <strong>Negara:</strong> <span id="scimago-country">{scimagoData.country || '-'}</span><br />
                <strong>Tipe Publikasi:</strong> <span id="scimago-type">{scimagoData.publicationType || '-'}</span><br />
                <strong>Homepage:</strong> {scimagoData.homepage ? (
                  <a id="scimago-homepage" href={scimagoData.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                    {scimagoData.homepage}
                  </a>
                ) : (
                  <span id="scimago-homepage">-</span>
                )}
              </div>
            </div>
            <div className="mb-2">
              <strong>Quartile per Tahun:</strong>
              <div id="scimago-quartiles" className="mt-2">
                {renderQuartiles()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScimagoCard;
