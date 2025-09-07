import React from 'react';
import CopyButton from './CopyButton';

const AdditionalInfo = ({ metadata }) => {
  const additionalFields = [
    { key: 'uri', label: 'URI', isLink: true },
    { key: 'doi', label: 'DOI' },
    { key: 'issn', label: 'ISSN' },
    { key: 'volume', label: 'Volume' },
    { key: 'keywords', label: 'Keywords' },
    { key: 'language', label: 'Language' },
    { key: 'pdf_url', label: 'PDF', isPDF: true }
  ];

  const renderFieldValue = (field, value) => {
    if (field.isLink) {
      if (field.key === 'uri') {
        return (
          <div className="flex items-center flex-wrap">
            <a 
              href={value} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline me-2"
            >
              {value}
            </a>
            <CopyButton 
              text={value}
              buttonId="uri"
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors duration-200"
              ariaLabel="Salin URL artikel"
            />
          </div>
        );
      } else {
        return (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
            {value}
          </a>
        );
      }
    } else if (field.isPDF) {
      return (
        <a href={value} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition-colors duration-200">
          <i className="bi bi-file-pdf me-1"></i>
          View PDF
        </a>
      );
    } else {
      return value;
    }
  };

  const renderPages = () => {
    if (metadata.first_page || metadata.last_page) {
      let pages = '';
      if (metadata.first_page && metadata.last_page) {
        pages = `${metadata.first_page}-${metadata.last_page}`;
      } else if (metadata.first_page) {
        pages = metadata.first_page;
      } else if (metadata.last_page) {
        pages = metadata.last_page;
      }
      return (
        <div className="mb-3">
          <strong>Pages:</strong>
          <span className="ms-1">{pages}</span>
        </div>
      );
    }
    return null;
  };

  const renderAbstract = (title, content) => {
    if (content) {
      return (
        <div className="mb-4">
          <h5 className="text-lg font-semibold text-gray-900 mb-2">{title}</h5>
          <p className="whitespace-pre-line text-justify leading-relaxed text-gray-700">{content}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-lg bg-white mb-8 transition-all duration-300 ease-in-out shadow-lg border border-gray-100 card-hover-enhanced opacity-0 animate-fadeIn">
      <div className="card-header px-6 py-4 text-white rounded-t-lg">
        <i className="bi bi-file-text me-2"></i>Informasi Tambahan
      </div>
      <div className="p-6">
        {additionalFields.map(field => {
          if (metadata[field.key]) {
            return (
              <div key={field.key} className="mb-3">
                <strong>{field.label}:</strong>
                <span className="ms-1">{renderFieldValue(field, metadata[field.key])}</span>
              </div>
            );
          }
          return null;
        })}
        
        {renderPages()}
        {renderAbstract('English Abstract', metadata.description_en)}
        {renderAbstract('Indonesian Abstract', metadata.description_id)}
      </div>
    </div>
  );
};

export default AdditionalInfo;
