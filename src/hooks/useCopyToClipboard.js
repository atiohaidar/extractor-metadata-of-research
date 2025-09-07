import { useState, useCallback } from 'react';

/**
 * Hook for copy to clipboard functionality
 * @returns {Object} Object containing copy function and status
 */
export const useCopyToClipboard = () => {
  const [copyStatus, setCopyStatus] = useState({});

  const copyToClipboard = useCallback(async (text, buttonId = 'default') => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        if (!ok) throw new Error('Copy failed');
      }
      
      setCopyStatus(prev => ({ ...prev, [buttonId]: 'success' }));
      
      // Reset status after 1.2 seconds
      setTimeout(() => {
        setCopyStatus(prev => ({ ...prev, [buttonId]: null }));
      }, 1200);
      
      return true;
    } catch (error) {
      setCopyStatus(prev => ({ ...prev, [buttonId]: 'error' }));
      
      // Reset status after 1.2 seconds
      setTimeout(() => {
        setCopyStatus(prev => ({ ...prev, [buttonId]: null }));
      }, 1200);
      
      return false;
    }
  }, []);

  return { copyToClipboard, copyStatus };
};
