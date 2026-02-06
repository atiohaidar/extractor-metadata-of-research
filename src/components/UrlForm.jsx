import React, { useState } from 'react';

const UrlForm = ({ onSubmit, isLoading }) => {
  const [journalUrl, setJournalUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = journalUrl.trim().replace(/[\n\r]/g, '');

    if (!url) return;

    // Convert http to https like original
    if (url.startsWith('http://')) {
      url = 'https://' + url.slice(7);
      setJournalUrl(url);
    }

    // Check if it's a valid URL pattern
    // If it doesn't look like a valid URL, just open it in a new tab
    // skip the extraction process and don't show error
    if (!/^(https?:\/\/)/i.test(url)) {
      const targetUrl = url.startsWith('www.') ? 'https://' + url : (url.includes('.') ? 'https://' + url : null);
      if (targetUrl) {
        window.open(targetUrl, '_blank');
        return;
      }
    }

    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className="w-full px-3 py-3 border border-gray-200 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:border-green-600 focus:-translate-y-0.5 focus:shadow-lg focus:shadow-green-200/25 disabled:bg-gray-100 disabled:opacity-75"
          name="journal_url"
          id="journal_url"
          value={journalUrl}
          onChange={(e) => setJournalUrl(e.target.value)}
          placeholder="Masukkan URL artikel jurnal"
          required
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        className="btn-primary inline-flex items-center justify-center px-6 py-3 font-semibold text-slate-800 border-0 transition-all duration-200 ease-in-out hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
        disabled={isLoading}
      >
        <span className="btn-text">Ekstrak Metadata</span>
        {isLoading && (
          <span className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin ms-2" role="status"></span>
        )}
      </button>
      <div className="mt-3">
        <small className="text-gray-500 text-sm">
          <i className="bi bi-info-circle"></i> Jika Anda mendapatkan error 403 Forbidden, kami akan mencoba mengambil konten dari Web Archive (Wayback Machine).
          Jika itu gagal, Anda bisa mencoba menggunakan opsi "Tempel HTML" di bawah ini.
        </small>
      </div>
    </form>
  );
};

export default UrlForm;
