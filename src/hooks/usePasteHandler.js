import { useCallback, useEffect } from 'react';
import { isValidUrl, normalizeUrl } from '../utils/helpers';

export const usePasteHandler = (onUrlPaste, onHtmlPaste) => {
  const handleKeyDown = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'v' || e.keyCode === 86)) {
      if (document.activeElement.tagName === 'INPUT' || 
          document.activeElement.tagName === 'TEXTAREA') {
        return;
      }

      const tempInput = document.createElement('textarea');
      tempInput.style.position = 'fixed';
      tempInput.style.opacity = '0';
      document.body.appendChild(tempInput);
      tempInput.focus();

      setTimeout(() => {
        let pastedContent = tempInput.value.trim().replace(/[\n\r]/g, '');
        document.body.removeChild(tempInput);
        
        if (!pastedContent) return;
        
        const normalizedContent = normalizeUrl(pastedContent);
        
        if (isValidUrl(normalizedContent)) {
          onUrlPaste(normalizedContent);
        } else if (pastedContent.length > 50) {
          onHtmlPaste(pastedContent);
        } else {
          alert("Konten yang ditempel tidak tampak seperti URL atau HTML. Silakan tempelkan langsung ke kolom yang sesuai.");
        }
      }, 100);
    }
  }, [onUrlPaste, onHtmlPaste]);

  const handlePaste = useCallback((e) => {
    if (document.activeElement.tagName === 'INPUT' || 
        document.activeElement.tagName === 'TEXTAREA') {
      return;
    }

    let pastedContent = (e.clipboardData || window.clipboardData).getData('text');
    if (!pastedContent) return;
    
    e.preventDefault();
    
    const normalizedContent = normalizeUrl(pastedContent);
    
    if (isValidUrl(normalizedContent)) {
      onUrlPaste(normalizedContent);
    } else if (pastedContent.length > 50) {
      onHtmlPaste(pastedContent);
    } else {
      alert("Konten yang ditempel tidak tampak seperti URL atau HTML. Silakan tempelkan langsung ke kolom yang sesuai.");
    }
  }, [onUrlPaste, onHtmlPaste]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('paste', handlePaste);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('paste', handlePaste);
    };
  }, [handleKeyDown, handlePaste]);
};
