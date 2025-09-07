import React from 'react';

const JournalPreview = ({ journalUrl, htmlContent }) => {
  const renderPreview = () => {
    if (journalUrl && !htmlContent) {
      return (
        <iframe 
          src={journalUrl}
          className="preview-frame preview-frame-hover w-full border border-gray-300 rounded-md mt-2 transition-all duration-200 ease-in-out" 
          style={{ height: '600px' }}
          title="Journal Preview"
        />
      );
    } else if (htmlContent) {
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);
      return (
        <iframe 
          src={blobUrl}
          className="preview-frame preview-frame-hover w-full border border-gray-300 rounded-md mt-2 transition-all duration-200 ease-in-out" 
          style={{ height: '600px' }}
          title="Journal Preview"
        />
      );
    } else {
      return <p className="text-gray-500">Pratinjau tidak tersedia</p>;
    }
  };

  return (
    <div className="rounded-lg bg-white mb-8 transition-all duration-300 ease-in-out shadow-lg border border-gray-100 card-hover-enhanced opacity-0 animate-fadeIn">
      <div className="card-header px-6 py-4 text-white rounded-t-lg">
        <i className="bi bi-globe me-2"></i>Pratinjau Website Jurnal
      </div>
      <div className="p-6">
        {renderPreview()}
      </div>
    </div>
  );
};

export default JournalPreview;
