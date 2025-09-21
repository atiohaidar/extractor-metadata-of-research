import React from 'react';
import CopyButton from './CopyButton';
import { AIPerplexityButton } from './index';
import { generateSearchUrl, escapeHtml } from '../utils/yearUtils';

const MetadataTable = ({ metadata, onIndexingFound, onError, aiIndexingData }) => {
  if (!metadata) return null;

  const priorityFields = [
    { key: 'title', label: 'Title' },
    { key: 'authors', label: 'Authors', isArray: true },
    { key: 'type', label: 'Type' },
    { key: 'source', label: 'Source', isArray: true },
    { key: 'sinta_link', label: 'Sinta', isSpecial: true }
  ];

  const renderFieldValue = (field, value) => {
    if (field.isSpecial && field.key === 'sinta_link') {
      return (
        <>
          {value && (
            <>
              <a
                href={value.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200 mb-2"
              >
                <i className="bi bi-link-45deg me-1"></i> {value.text}
              </a>
              <div className="break-words">
                <small className="text-gray-500 text-sm">{value.url}</small>
              </div>
            </>
          )}

          {/* AI-generated Sinta link */}
          {aiIndexingData?.sinta && (
            <>
              <a
                href={aiIndexingData.sinta}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50 transition-colors duration-200 mb-2"
              >
                <i className="bi bi-robot me-1"></i> Sinta (AI Generated)
              </a>
              <div className="break-words">
                <small className="text-purple-500 text-sm">{aiIndexingData.sinta}</small>
              </div>
            </>
          )}

          {/* AI-generated Scimago link */}
          {aiIndexingData?.scimago && (
            <>
              <a
                href={aiIndexingData.scimago}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition-colors duration-200 mb-2"
              >
                <i className="bi bi-robot me-1"></i> Scimago (AI Generated)
              </a>
              <div className="break-words">
                <small className="text-green-500 text-sm">{aiIndexingData.scimago}</small>
              </div>
            </>
          )}

          {/* Show message when AI search was performed but no data found */}
          {aiIndexingData && !aiIndexingData.sinta && !aiIndexingData.scimago && (
            <div className="text-orange-600 text-sm mt-2">
              <i className="bi bi-info-circle me-1"></i>
              Data indexing tidak ditemukan melalui AI
            </div>
          )}
        </>
      );
    }

    if (field.isArray) {
      if (field.key === 'source') {
        const sources = Array.isArray(value) ? value : [value];
        return (
          <div>
            {sources.map((src, index) => (
              <div key={index} className="flex items-center flex-wrap mb-2">
                <span className="me-2">{escapeHtml(src)}</span>
                <CopyButton
                  text={src}
                  buttonId={`source-${index}`}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors duration-200 me-2"
                  ariaLabel="Salin sumber"
                />
                <a
                  className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors duration-200 me-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={generateSearchUrl(src)}
                >
                  <i className="bi bi-search me-1"></i> Cari Sinta dan Scimago di Google
                </a>
                <AIPerplexityButton
                  journalTitle={metadata?.source && Array.isArray(metadata.source) ? metadata.source[0] : metadata?.source || metadata?.title}
                  onIndexingFound={onIndexingFound}
                  onError={onError}
                  className="me-2"
                />
              </div>
            ))}
          </div>
        );
      }
      const items = Array.isArray(value) ? value : [value];
      return items.join(', ');
    }

    if (field.key === 'title') {
      return (
        <div className="flex items-center flex-wrap">
          <span className="me-2">{escapeHtml(value)}</span>
          <CopyButton
            text={value}
            buttonId="title"
            className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors duration-200"
            ariaLabel="Salin judul"
          />
        </div>
      );
    }

    return value;
  };

  return (
    <div className="rounded-lg bg-white mb-8 transition-all duration-300 ease-in-out shadow-lg border border-gray-100 card-hover-enhanced opacity-0 animate-fadeIn">
      <div className="card-header px-6 py-4 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <i className="bi bi-info-circle-fill me-2"></i>
            <span>Metadata Jurnal</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse" id="metadata-table">
            <tbody id="metadata-tbody" className="divide-y divide-gray-200">
              {priorityFields.map(field => {
                if (metadata[field.key]) {
                  return (
                    <tr key={field.key} className="transition-all duration-300 ease-in-out table-row-hover">
                      <th scope="row" className="p-3 text-left font-medium text-gray-900 bg-gray-50 align-top w-1/5">{field.label}</th>
                      <td className="p-3 align-top">{renderFieldValue(field, metadata[field.key])}</td>
                    </tr>
                  );
                }
                return null;
              })}

              {Object.keys(metadata).map(key => {
                if (key.startsWith('date_')) {
                  const dateLabel = key.replace('date_', '').charAt(0).toUpperCase() + key.replace('date_', '').slice(1);
                  return (
                    <tr key={key} className="transition-all duration-300 ease-in-out table-row-hover">
                      <th scope="row" className="p-3 text-left font-medium text-gray-900 bg-gray-50 align-top w-1/5">{dateLabel} Date</th>
                      <td className="p-3 align-top">{metadata[key]}</td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MetadataTable;
