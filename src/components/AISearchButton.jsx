import React, { useState } from 'react';
import { searchJournalIndexing, fetchSintaInfo, fetchScimagoInfo } from '../services/api';

const AISearchButton = ({
    journalTitle,
    onIndexingFound,
    onError,
    className = ''
}) => {
    const [isSearching, setIsSearching] = useState(false);
    const [searchResult, setSearchResult] = useState(null);

    const handleAISearch = async () => {
        if (!journalTitle || journalTitle.trim() === '') {
            onError?.('Judul jurnal tidak tersedia untuk pencarian');
            return;
        }

        setIsSearching(true);
        setSearchResult(null);

        try {
            // Step 1: Search using AI
            const aiResult = await searchJournalIndexing(journalTitle);
            setSearchResult(aiResult);

            // Step 2: Fetch detailed info if found
            const indexingData = { sinta: null, scimago: null };

            if (aiResult.sinta) {
                try {
                    // Extract Sinta ID from URL
                    const sintaMatch = aiResult.sinta.match(/\/(\d+)$/);
                    if (sintaMatch) {
                        const sintaData = await fetchSintaInfo(sintaMatch[1]);
                        indexingData.sinta = sintaData;
                    }
                } catch (error) {
                    console.warn('Failed to fetch Sinta details:', error);
                }
            }

            if (aiResult.scimago) {
                try {
                    const scimagoData = await fetchScimagoInfo(aiResult.scimago);
                    indexingData.scimago = scimagoData;
                } catch (error) {
                    console.warn('Failed to fetch Scimago details:', error);
                }
            }

            // Step 3: Notify parent component
            onIndexingFound?.({
                aiResult,
                indexingData,
                searchTimestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('AI Search failed:', error);
            onError?.(`Pencarian AI gagal: ${error.message}`);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className={`inline-block ${className}`}>
            <button
                onClick={handleAISearch}
                disabled={isSearching || !journalTitle}
                className={`
          inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${isSearching
                        ? 'bg-blue-100 text-blue-600 cursor-wait'
                        : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                    }
        `}
                title="Cari indexing jurnal menggunakan AI"
            >
                {isSearching ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mencari...
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Cari Indexing AI
                    </>
                )}
            </button>

            {searchResult && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg border text-sm">
                    <div className="flex items-center space-x-2 mb-2">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium text-gray-900">Hasil Pencarian AI</span>
                    </div>

                    <div className="space-y-1 text-gray-600">
                        {searchResult.scimago && (
                            <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span>✅ Ditemukan di Scimago</span>
                            </div>
                        )}
                        {searchResult.sinta && (
                            <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <span>✅ Ditemukan di Sinta</span>
                            </div>
                        )}
                        {!searchResult.scimago && !searchResult.sinta && (
                            <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                <span>❌ Tidak ditemukan indexing</span>
                            </div>
                        )}
                    </div>

                    {searchResult.usage && (
                        <div className="mt-2 pt-2 border-t border-gray-200 text-xs text-gray-500">
                            Cost: ${searchResult.usage.cost?.total_cost?.toFixed(4) || '0.0000'}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AISearchButton;