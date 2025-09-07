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
import TipsNotification from './components/TipsNotification';

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
        <TipsNotification />
        
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