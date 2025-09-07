import React, { useEffect, useRef } from 'react';

const ErrorAlert = ({ error, onClose }) => {
  const errorRef = useRef(null);

  // Auto-scroll to error when it appears (like original HTML)
  useEffect(() => {
    if (error && errorRef.current) {
      setTimeout(() => {
        errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [error]);

  if (!error) return null;

  return (
    <div className="p-4 mb-4 rounded-lg border bg-red-50 border-red-200 text-red-800 mt-3 relative" ref={errorRef} id="error-container">
      <span id="error-message">{error}</span>
      {onClose && (
        <button 
          type="button" 
          className="absolute top-2 right-2 w-6 h-6 opacity-50 hover:opacity-75 cursor-pointer border-0 bg-transparent text-red-600 hover:text-red-800 transition-opacity duration-200" 
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;
