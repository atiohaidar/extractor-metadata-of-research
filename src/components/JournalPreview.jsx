import React from 'react';

const JournalPreview = ({ journalUrl, htmlContent }) => {
  const renderPreview = () => {
    if (journalUrl && !htmlContent) {
      return (
        <iframe 
          src={journalUrl}
          className="preview-frame" 
          title="Journal Preview"
        />
      );
    } else if (htmlContent) {
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);
      return (
        <iframe 
          src={blobUrl}
          className="preview-frame" 
          title="Journal Preview"
        />
      );
    } else {
      return <p>Pratinjau tidak tersedia</p>;
    }
  };

  return (
    <div className="card mb-4 fade-in">
      <div className="card-header">
        <i className="bi bi-globe me-2"></i>Pratinjau Website Jurnal
      </div>
      <div className="card-body">
        {renderPreview()}
      </div>
    </div>
  );
};

export default JournalPreview;
