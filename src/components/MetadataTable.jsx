import React from 'react';
import CopyButton from './CopyButton';
import { generateSearchUrl, escapeHtml } from '../utils/yearUtils';

const MetadataTable = ({ metadata }) => {
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
          <a 
            href={value.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-primary mb-2"
          >
            <i className="bi bi-link-45deg"></i> {value.text}
          </a>
          <div className="text-break">
            <small className="text-muted">{value.url}</small>
          </div>
        </>
      );
    }
    
    if (field.isArray) {
      if (field.key === 'source') {
        const sources = Array.isArray(value) ? value : [value];
        return (
          <div>
            {sources.map((src, index) => (
              <div key={index} className="d-flex align-items-center flex-wrap mb-2">
                <span className="me-2">{escapeHtml(src)}</span>
                <CopyButton 
                  text={src}
                  buttonId={`source-${index}`}
                  className="btn btn-sm btn-outline-secondary me-2"
                  ariaLabel="Salin sumber"
                />
                <a 
                  className="btn btn-sm btn-outline-secondary" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href={generateSearchUrl(src)}
                >
                  <i className="bi bi-search"></i> Cari Sinta dan Scimago di Google
                </a>
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
        <div className="d-flex align-items-center flex-wrap">
          <span className="me-2">{escapeHtml(value)}</span>
          <CopyButton 
            text={value}
            buttonId="title"
            className="btn btn-sm btn-outline-secondary"
            ariaLabel="Salin judul"
          />
        </div>
      );
    }
    
    return value;
  };

  return (
    <div className="card mb-4 fade-in">
      <div className="card-header">
        <i className="bi bi-info-circle-fill me-2"></i>Metadata Jurnal
      </div>
      <div className="card-body">
        <table className="table table-striped" id="metadata-table">
          <tbody id="metadata-tbody">
            {priorityFields.map(field => {
              if (metadata[field.key]) {
                return (
                  <tr key={field.key}>
                    <th scope="row" style={{ width: '20%' }}>{field.label}</th>
                    <td>{renderFieldValue(field, metadata[field.key])}</td>
                  </tr>
                );
              }
              return null;
            })}
            
            {Object.keys(metadata).map(key => {
              if (key.startsWith('date_')) {
                const dateLabel = key.replace('date_', '').charAt(0).toUpperCase() + key.replace('date_', '').slice(1);
                return (
                  <tr key={key}>
                    <th scope="row" style={{ width: '20%' }}>{dateLabel} Date</th>
                    <td>{metadata[key]}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MetadataTable;
