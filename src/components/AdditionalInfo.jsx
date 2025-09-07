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
          <div className="d-flex align-items-center flex-wrap">
            <a 
              href={value} 
              target="_blank" 
              rel="noopener noreferrer"
              className="me-2"
            >
              {value}
            </a>
            <CopyButton 
              text={value}
              buttonId="uri"
              className="btn btn-sm btn-outline-secondary"
              ariaLabel="Salin URL artikel"
            />
          </div>
        );
      } else {
        return (
          <a href={value} target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        );
      }
    } else if (field.isPDF) {
      return (
        <a href={value} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-success">
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
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{content}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card mb-4 fade-in">
      <div className="card-header">
        <i className="bi bi-file-text me-2"></i>Informasi Tambahan
      </div>
      <div className="card-body">
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
