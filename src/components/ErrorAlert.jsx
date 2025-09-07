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
    <div className="alert alert-danger mt-3" ref={errorRef} id="error-container">
      <span id="error-message">{error}</span>
      {onClose && (
        <button 
          type="button" 
          className="btn-close ms-2" 
          onClick={onClose}
          aria-label="Close"
        ></button>
      )}
    </div>
  );
};

export default ErrorAlert;
