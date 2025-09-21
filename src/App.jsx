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
    aiIndexingData,
    extractFromUrl,
    extractFromHtml,
    setIndexingData,
    clearError,
    clearResults
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

  const handleIndexingFound = (indexingData) => {
    setIndexingData(indexingData);
  };

  const handleIndexingError = (error) => {
    console.error('AI Indexing error:', error);
    // You can show a toast notification here if needed
  };

  return (
    <>
      <Layout>
        <Header />
        <TipsNotification />

        <ErrorAlert error={error} onClose={clearError} />

        {results ? (
          <ResultsContainer
            data={results}
            aiIndexingData={aiIndexingData}
            onIndexingFound={handleIndexingFound}
            onIndexingError={handleIndexingError}
          />
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