import React from 'react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

/**
 * Reusable copy button component
 */
const CopyButton = ({ 
  text, 
  buttonId, 
  className = "btn btn-sm btn-outline-secondary",
  label = "Salin",
  ariaLabel = "Salin teks"
}) => {
  const { copyToClipboard, copyStatus } = useCopyToClipboard();
  
  const status = copyStatus[buttonId];
  
  const handleCopy = async () => {
    await copyToClipboard(text, buttonId);
  };

  const getButtonContent = () => {
    switch (status) {
      case 'success':
        return <><i className="bi bi-clipboard-check"></i> Disalin</>;
      case 'error':
        return <><i className="bi bi-x-circle"></i> Gagal</>;
      default:
        return <><i className="bi bi-clipboard"></i> {label}</>;
    }
  };

  return (
    <button 
      type="button" 
      className={className}
      onClick={handleCopy}
      aria-label={ariaLabel}
      disabled={status === 'success' || status === 'error'}
    >
      {getButtonContent()}
    </button>
  );
};

export default CopyButton;
