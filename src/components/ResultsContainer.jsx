import React, { useEffect, useRef, useState } from 'react';
import MetadataTable from './MetadataTable';
import SintaCard from './SintaCard';
import ScimagoCard from './ScimagoCard';
import AdditionalInfo from './AdditionalInfo';
import JournalPreview from './JournalPreview';
import InfoAlert from './InfoAlert';

const ResultsContainer = ({ data, aiIndexingData, onIndexingFound, onIndexingError }) => {
  const resultsRef = useRef(null);
  const [dismissedAlerts, setDismissedAlerts] = useState({
    citation: false,
    wayback: false
  });
  const [localAiIndexingResult, setLocalAiIndexingResult] = useState(null);

  // Combine external aiIndexingData with local state
  const combinedAiIndexingData = aiIndexingData || localAiIndexingResult;

  // Auto-scroll to results when data is loaded (like original HTML)
  useEffect(() => {
    if (data && resultsRef.current) {
      // Small delay to ensure rendering is complete
      setTimeout(() => {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [data]);

  // Reset dismissed alerts when new data loads
  useEffect(() => {
    if (data) {
      setDismissedAlerts({
        citation: false,
        wayback: false
      });
    }
  }, [data]);

  const handleDismissAlert = (alertType) => {
    setDismissedAlerts(prev => ({
      ...prev,
      [alertType]: true
    }));
  };

  const handleIndexingFound = (result) => {
    setLocalAiIndexingResult(result);
  };

  const handleIndexingError = (error) => {
    console.error('AI Indexing Error:', error);
    // You could add a toast notification here
  };

  if (!data) return null;

  const { metadata, journal_url, html_content } = data;

  const showCitationNotice = metadata.metadata_source === 'citation' && !dismissedAlerts.citation;
  const showWaybackNotice = metadata.wayback_url && !dismissedAlerts.wayback;

  return (
    <div className="transition-opacity duration-300 ease-in-out" ref={resultsRef} id="results-container">
      {/* Citation Notice */}
      {showCitationNotice && (
        <InfoAlert
          type="info"
          icon="bi bi-info-circle"
          onClose={() => handleDismissAlert('citation')}
        >
          <strong>Sumber Metadata:</strong> Metadata ini diekstrak dari meta tag citation karena metadata Dublin Core tidak tersedia.
        </InfoAlert>
      )}

      {/* Wayback Notice */}
      {showWaybackNotice && (
        <InfoAlert
          type="warning"
          icon="bi bi-clock-history"
          onClose={() => handleDismissAlert('wayback')}
        >
          <strong>Pemberitahuan Arsip:</strong> {metadata.note}
          <a href={metadata.wayback_url} target="_blank" rel="noopener noreferrer" className="text-yellow-900 underline hover:text-yellow-700 ms-2">
            Lihat versi arsip
          </a>
        </InfoAlert>
      )}

      {/* Main Metadata Card */}
      <MetadataTable
        metadata={metadata}
        onIndexingFound={handleIndexingFound}
        onError={handleIndexingError}
        aiIndexingData={combinedAiIndexingData}
      />

      {/* Sinta Journal Info */}
      <SintaCard metadata={metadata} aiIndexingData={combinedAiIndexingData} />

      {/* SCImago Journal Info */}
      <ScimagoCard metadata={metadata} aiIndexingData={combinedAiIndexingData} />      {/* Additional Metadata Card */}
      <AdditionalInfo metadata={metadata} />

      {/* Journal Preview Card */}
      <JournalPreview journalUrl={journal_url} htmlContent={html_content} />
    </div>
  );
};

export default ResultsContainer;
