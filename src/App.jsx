import React, { useEffect } from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import ErrorAlert from './components/ErrorAlert';
import WelcomeMessage from './components/WelcomeMessage';
import ResultsContainer from './components/ResultsContainer';
import InputForm from './components/InputForm';
import LoadingOverlay from './components/LoadingOverlay';
import DragOverlay from './components/DragOverlay';
import IntroOverlay from './components/IntroOverlay';

import { useJournalExtractor } from './hooks/useJournalExtractor';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { usePasteHandler } from './hooks/usePasteHandler';

import './styles/global.css';

function App() {
  const {
    loading,
    error,
    results,
    extractFromUrl,
    extractFromHtml,
    clearError
  } = useJournalExtractor();

  // Handle drag and drop
  const { isDragActive } = useDragAndDrop(extractFromUrl, extractFromHtml);

  // Handle paste events
  usePasteHandler(extractFromUrl, extractFromHtml);

  // Show tips notification on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!document.querySelector('.tips-notification')) {
        const notification = document.createElement('div');
        notification.className = 'alert alert-info alert-dismissible fade show tips-notification';
        notification.innerHTML = `
          <strong>Tips!</strong> Tekan Ctrl+V di mana saja pada halaman ini untuk menempelkan konten secara otomatis, atau <strong>seret dan lepas</strong> tautan langsung ke halaman. URL akan langsung diproses, HTML akan ditempatkan di tab HTML. 
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Tutup"></button>
        `;
        
        const header = document.querySelector('h1');
        if (header) {
          header.insertAdjacentElement('afterend', notification);
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleUrlSubmit = (url) => {
    extractFromUrl(url);
  };

  const handleHtmlSubmit = (htmlContent, displayUrl) => {
    extractFromHtml(htmlContent, displayUrl);
  };

  return (
    <>
      <Layout>
        <Header />
        
        <ErrorAlert error={error} onClose={clearError} />
        
        {results ? (
          <ResultsContainer data={results} />
        ) : (
          <WelcomeMessage />
        )}
        
        <InputForm 
          onUrlSubmit={handleUrlSubmit}
          onHtmlSubmit={handleHtmlSubmit}
          isLoading={loading}
        />
      </Layout>

      <LoadingOverlay isVisible={loading} />
      <DragOverlay isActive={isDragActive} />
      <IntroOverlay />
    </>
  );
}

export default App;