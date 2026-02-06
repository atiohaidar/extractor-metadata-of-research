import React from 'react';
import CopyButton from './CopyButton';

const AdditionalInfo = ({ metadata }) => {
  const additionalFields = [
    { key: 'uri', label: 'URI', isLink: true },
    { key: 'doi', label: 'DOI' },
    { key: 'issn', label: 'ISSN' },
    { key: 'volume', label: 'Volume' },
    { key: 'volume_issue', label: 'Volume/Issue' },
    { key: 'issue', label: 'Issue' },
    { key: 'section', label: 'Section' },
    { key: 'keywords', label: 'Keywords' },
    { key: 'language', label: 'Language' },
    { key: 'date_published', label: 'Published', isDate: true },
    { key: 'date_received', label: 'Received', isDate: true },
    { key: 'date_accepted', label: 'Accepted', isDate: true },
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
    } else if (field.isDate) {
      // Format date with Indonesian locale
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const monthNames = [
          'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
          'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        const dayName = dayNames[date.getDay()];
        const day = date.getDate();
        const monthName = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return (
          <span>
            <span className="font-medium">{value}</span>
            <span className="text-sm text-gray-500 ms-2">
              ({dayName}, {day} {monthName} {year})
            </span>
          </span>
        );
      }
      return value;
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

        {/* How to Cite section */}
        {metadata.how_to_cite && (
          <div className="mb-4 mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h5 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <i className="bi bi-quote me-2"></i>How to Cite
            </h5>
            <p className="text-gray-700 leading-relaxed italic">{metadata.how_to_cite}</p>
            <CopyButton
              text={metadata.how_to_cite}
              buttonId="how-to-cite"
              className="mt-2 inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors duration-200"
              ariaLabel="Salin sitasi"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionalInfo;
