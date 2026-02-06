import React, { useRef, useEffect } from 'react';

const JournalPreview = ({ journalUrl, htmlContent, hasDate }) => {
  const iframeRef = useRef(null);

  const handleIframeLoad = () => {
    if (!iframeRef.current || !htmlContent) return;

    try {
      const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
      if (!iframeDoc) return;

      // Small delay to ensure styles are applied
      setTimeout(() => {
        let targetElement = null;

        // 1. Try to find Date-related labels if hasDate is true
        if (hasDate) {
          const dateLabels = ['published', 'received', 'accepted', 'diunggah', 'diterbitkan', 'diterima', 'disetujui'];
          const labels = iframeDoc.querySelectorAll('h2.label, .label, h3.label, h4.label, .item .label, .label-value .label');

          for (const label of labels) {
            const text = label.textContent.trim().toLowerCase();
            if (dateLabels.some(dl => text.includes(dl))) {
              targetElement = label;
              break;
            }
          }

          if (!targetElement) {
            targetElement = iframeDoc.querySelector('.item.published, .published, .item.received, .item.accepted, .published-date, .date-info');
          }
        }

        // 2. Fallback to Title if date not found or not requested
        if (!targetElement) {
          targetElement = iframeDoc.querySelector('h1.page_title, .title, .article-title, h1');
        }

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

          // Add a subtle highlight to show where we scrolled
          const originalTransition = targetElement.style.transition;
          const originalBg = targetElement.style.backgroundColor;

          targetElement.style.transition = 'background-color 0.5s ease';
          targetElement.style.backgroundColor = 'rgba(59, 130, 246, 0.15)';
          targetElement.style.borderRadius = '4px';

          setTimeout(() => {
            targetElement.style.backgroundColor = originalBg || 'transparent';
          }, 2000);
        }
      }, 500);
    } catch (e) {
      // Cross-origin errors might still happen even with blobs in some browsers
      console.warn("Could not scroll iframe content:", e);
    }
  };

  const renderPreview = () => {
    if (journalUrl && !htmlContent) {
      return (
        <iframe
          ref={iframeRef}
          src={journalUrl}
          className="preview-frame preview-frame-hover w-full border border-gray-300 rounded-md mt-2 transition-all duration-200 ease-in-out"
          style={{ height: '600px' }}
          title="Journal Preview"
          onLoad={handleIframeLoad}
        />
      );
    } else if (htmlContent) {
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);
      return (
        <iframe
          ref={iframeRef}
          src={blobUrl}
          className="preview-frame preview-frame-hover w-full border border-gray-300 rounded-md mt-2 transition-all duration-200 ease-in-out"
          style={{ height: '600px' }}
          title="Journal Preview"
          onLoad={handleIframeLoad}
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
