import React, { useState } from 'react';
import InfoAlert from './InfoAlert';

const AIPerplexityButton = ({ journalTitle, onIndexingFound, onError, className = '' }) => {
    const [isSearching, setIsSearching] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'info') => {
        setToast({ message, type });
        // Auto-hide toast after 5 seconds
        setTimeout(() => setToast(null), 5000);
    };

    const searchWithAI = async () => {
        if (!journalTitle) {
            showToast('Judul jurnal tidak tersedia', 'error');
            onError?.('Judul jurnal tidak tersedia');
            return;
        }

        setIsSearching(true);
        try {
            // Call AI Perplexity API
            const response = await fetch(`https://deteksi-index-jurnal-nasional-internasional.atiohaidar.workers.dev/check-journal?journal_name=${encodeURIComponent(journalTitle)}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Process the response
            const indexingData = {
                sinta: (data.sinta && data.sinta !== "null") ? data.sinta : null,
                scimago: (data.scimago && data.scimago !== "null") ? data.scimago : null,
                usage: data.usage || null
            };

            // Check if we found any indexing data
            const hasSinta = indexingData.sinta !== null;
            const hasScimago = indexingData.scimago !== null;

            if (hasSinta || hasScimago) {
                const foundItems = [];
                if (hasSinta) foundItems.push('Sinta');
                if (hasScimago) foundItems.push('Scimago');
                showToast(`Berhasil menemukan data indexing: ${foundItems.join(' dan ')}`, 'success');
                // Call the callback with the indexing data
                onIndexingFound?.(indexingData);
            } else {
                // Show warning toast when no data is found
                showToast('Tidak ditemukan data indexing untuk jurnal ini', 'warning');
                // Still call the callback with null data to update the state
                onIndexingFound?.(indexingData);
            }

        } catch (error) {
            console.error('AI Perplexity search error:', error);
            showToast(`Gagal mencari dengan AI: ${error.message}`, 'error');
            onError?.(`Gagal mencari dengan AI: ${error.message}`);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <>
            {toast && (
                <div className="mb-2">
                    <InfoAlert
                        type={toast.type}
                        onClose={() => setToast(null)}
                        icon={toast.type === 'success' ? 'bi bi-check-circle-fill' : toast.type === 'error' ? 'bi bi-exclamation-triangle-fill' : 'bi bi-info-circle-fill'}
                    >
                        {toast.message}
                    </InfoAlert>
                </div>
            )}
            <button
                onClick={searchWithAI}
                disabled={isSearching}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
                title="Cari informasi indexing jurnal menggunakan AI Perplexity"
            >
                {isSearching ? (
                    <>
                        <div className="inline-block w-4 h-4 border-2 border-purple-600 border-r-transparent rounded-full animate-spin me-2"></div>
                        Mencari dengan AI...
                    </>
                ) : (
                    <>
                        <i className="bi bi-robot me-1"></i>
                        Cari Sinta dan Scimago dengan AI Perplexity
                    </>
                )}
            </button>
        </>
    );
};

export default AIPerplexityButton;