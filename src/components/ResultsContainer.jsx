import React, { useEffect, useRef } from 'react';
import MetadataTable from './MetadataTable';
import SintaCard from './SintaCard';
import ScimagoCard from './ScimagoCard';
import AdditionalInfo from './AdditionalInfo';
import JournalPreview from './JournalPreview';

const ResultsContainer = ({ data }) => {
  const resultsRef = useRef(null);

  // Auto-scroll to results when data is loaded (like original HTML)
  useEffect(() => {
    if (data && resultsRef.current) {
      // Small delay to ensure rendering is complete
      setTimeout(() => {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [data]);

  if (!data) return null;

  const { metadata, journal_url, html_content } = data;

  const showCitationNotice = metadata.metadata_source === 'citation';
  const showWaybackNotice = metadata.wayback_url;

  return (
    <div className="fade-in" ref={resultsRef} id="results-container">
      {/* Citation Notice */}
      {showCitationNotice && (
        <div className="alert alert-info mb-4">
          <i className="bi bi-info-circle me-2"></i>
          <strong>Sumber Metadata:</strong> Metadata ini diekstrak dari meta tag citation karena metadata Dublin Core tidak tersedia.
        </div>
      )}
      
      {/* Wayback Notice */}
      {showWaybackNotice && (
        <div className="alert alert-warning mb-4">
          <i className="bi bi-clock-history me-2"></i>
          <strong>Pemberitahuan Arsip:</strong> {metadata.note}
          <a href={metadata.wayback_url} target="_blank" rel="noopener noreferrer" className="alert-link ms-2">
            Lihat versi arsip
          </a>
        </div>
      )}
      
      {/* Main Metadata Card */}
      <MetadataTable metadata={metadata} />
      
      {/* Sinta Journal Info */}
      <SintaCard metadata={metadata} />
      
      {/* SCImago Journal Info */}
      <ScimagoCard metadata={metadata} />
      
      {/* Additional Metadata Card */}
      <AdditionalInfo metadata={metadata} />

      {/* Journal Preview Card */}
      <JournalPreview journalUrl={journal_url} htmlContent={html_content} />
    </div>
  );
};

export default ResultsContainer;
