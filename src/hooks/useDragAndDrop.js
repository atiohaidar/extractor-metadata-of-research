import { useState, useCallback, useEffect } from 'react';
import { isValidUrl, normalizeUrl } from '../utils/helpers';

export const useDragAndDrop = (onUrlDrop, onHtmlDrop) => {
  const [dragCounter, setDragCounter] = useState(0);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragCounter(prev => {
      const newCounter = prev + 1;
      if (newCounter === 1) {
        setIsDragActive(true);
        document.body.classList.add('drag-over');
      }
      return newCounter;
    });
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragCounter(prev => {
      const newCounter = prev - 1;
      if (newCounter === 0) {
        setIsDragActive(false);
        document.body.classList.remove('drag-over');
      }
      return newCounter;
    });
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragCounter(0);
    setIsDragActive(false);
    document.body.classList.remove('drag-over');

    let droppedData = e.dataTransfer.getData('text/plain') || e.dataTransfer.getData('text/uri-list');
    
    if (droppedData) {
      droppedData = droppedData.trim().replace(/[\n\r]/g, '');
      const normalizedData = normalizeUrl(droppedData);
      
      if (isValidUrl(normalizedData)) {
        onUrlDrop(normalizedData);
      } else if (droppedData.length > 50) {
        onHtmlDrop(droppedData);
      } else {
        alert('Konten yang dijatuhkan tidak tampak seperti URL atau HTML.');
      }
    } else {
      alert('Tidak ada konten valid yang dijatuhkan. Silakan coba seret tautan atau teks.');
    }
  }, [onUrlDrop, onHtmlDrop]);

  useEffect(() => {
    document.addEventListener('dragenter', handleDragEnter);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('drop', handleDrop);

    return () => {
      document.removeEventListener('dragenter', handleDragEnter);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drop', handleDrop);
      document.body.classList.remove('drag-over');
    };
  }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

  return { isDragActive };
};
