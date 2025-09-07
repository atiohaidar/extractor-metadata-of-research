import React, { useState } from 'react';

const HtmlForm = ({ onSubmit, isLoading }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [displayUrl, setDisplayUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = htmlContent.trim();
    const url = displayUrl.trim();
    
    if (!content) return;
    onSubmit(content, url);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="display_url" className="block text-sm font-medium text-gray-700 mb-1">URL Tampilan (opsional)</label>
        <input
          type="text"
          className="w-full px-3 py-3 border border-gray-200 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:border-green-600 focus:-translate-y-0.5 focus:shadow-lg focus:shadow-green-200/25 disabled:bg-gray-100 disabled:opacity-75"
          name="display_url"
          id="display_url"
          value={displayUrl}
          onChange={(e) => setDisplayUrl(e.target.value)}
          placeholder="Masukkan URL untuk tampilan (opsional)"
          disabled={isLoading}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="html_content" className="block text-sm font-medium text-gray-700 mb-1">Konten HTML</label>
        <textarea
          className="w-full px-3 py-3 border border-gray-200 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:border-green-600 focus:-translate-y-0.5 focus:shadow-lg focus:shadow-green-200/25 disabled:bg-gray-100 disabled:opacity-75"
          name="html_content"
          id="html_content"
          rows="8"
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
          placeholder="Tempelkan konten HTML lengkap di sini"
          required
          disabled={isLoading}
        ></textarea>
      </div>
      <button 
        type="submit" 
        className="btn-primary inline-flex items-center justify-center px-6 py-3 font-semibold text-slate-800 border-0 transition-all duration-200 ease-in-out hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed rounded-md" 
        disabled={isLoading}
      >
        <span className="btn-text">Ekstrak dari HTML</span>
        {isLoading && (
          <span className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin ms-2" role="status"></span>
        )}
      </button>
      <div className="mt-3">
        <small className="text-gray-500 text-sm">
          <i className="bi bi-info-circle"></i> Tempelkan kode HTML lengkap dari halaman jurnal yang ingin diekstrak metadatanya.
        </small>
      </div>
    </form>
  );
};

export default HtmlForm;
