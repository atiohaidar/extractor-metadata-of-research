import React, { useState } from 'react';

const UrlForm = ({ onSubmit, isLoading }) => {
  const [journalUrl, setJournalUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = journalUrl.trim().replace(/[\n\r]/g, '');
    
    // Convert http to https like original
    if (url.startsWith('http://')) {
      url = 'https://' + url.slice(7);
      setJournalUrl(url);
    }
    
    if (!url) return;
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          name="journal_url"
          id="journal_url"
          value={journalUrl}
          onChange={(e) => setJournalUrl(e.target.value)}
          placeholder="Masukkan URL artikel jurnal"
          required
          disabled={isLoading}
        />
      </div>
      <button type="submit" className="btn btn-primary" id="url-submit-btn" disabled={isLoading}>
        <span className="btn-text">Ekstrak Metadata</span>
        {isLoading && <span className="spinner-border spinner-border-sm ms-2" role="status"></span>}
      </button>
      <div className="mt-3">
        <small className="text-muted">
          <i className="bi bi-info-circle"></i> Jika Anda mendapatkan error 403 Forbidden, kami akan mencoba mengambil konten dari Web Archive (Wayback Machine).
          Jika itu gagal, Anda bisa mencoba menggunakan opsi "Tempel HTML" di bawah ini.
        </small>
      </div>
    </form>
  );
};

export default UrlForm;
