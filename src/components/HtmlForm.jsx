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
        <label htmlFor="display_url" className="form-label">URL Tampilan (opsional)</label>
        <input
          type="text"
          className="form-control"
          name="display_url"
          id="display_url"
          value={displayUrl}
          onChange={(e) => setDisplayUrl(e.target.value)}
          placeholder="Masukkan URL untuk tampilan (opsional)"
          disabled={isLoading}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="html_content" className="form-label">Konten HTML</label>
        <textarea
          className="form-control"
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
      <button type="submit" className="btn btn-primary" id="html-submit-btn" disabled={isLoading}>
        <span className="btn-text">Ekstrak dari HTML</span>
        {isLoading && <span className="spinner-border spinner-border-sm ms-2" role="status"></span>}
      </button>
      <div className="mt-3">
        <small className="text-muted">
          <i className="bi bi-info-circle"></i> Tempelkan kode HTML lengkap dari halaman jurnal yang ingin diekstrak metadatanya.
        </small>
      </div>
    </form>
  );
};

export default HtmlForm;
