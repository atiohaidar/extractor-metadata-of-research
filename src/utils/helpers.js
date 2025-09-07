export const escapeHtml = (s) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return await navigator.clipboard.writeText(text);
    }
  } catch (_) { /* ignore */ }
  
  return new Promise((resolve, reject) => {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      ok ? resolve() : reject(new Error('Copy failed'));
    } catch (e) { 
      reject(e); 
    }
  });
};

export const extractSintaIdFromUrl = (url) => {
  if (!url || typeof url !== 'string') return null;
  try {
    // Quick query param match
    const q = url.match(/[?&]id=(\d+)(?:&|$)/i);
    if (q) return q[1];
    // Ensure protocol for URL parsing
    const ensured = /^(https?:)?\/\//i.test(url) ? (url.startsWith('http') ? url : 'https:' + url) : 'https://' + url;
    const u = new URL(ensured);
    const path = u.pathname.toLowerCase();
    // Match trailing numeric segment after /journal or /journals paths
    const m = path.match(/\/(?:journal|journals)\/(?:[^\/]*\/)*(\d+)(?:\/)?$/i);
    if (m) return m[1];
    return null;
  } catch (_) {
    // Fallback direct regex on raw string
    const m = url.toLowerCase().match(/\/(?:journal|journals)\/(?:[^\/]*\/)*(\d+)(?:\/|$)/i);
    if (m) return m[1];
    return null;
  }
};

export const isValidUrl = (string) => {
  return /^(https?:\/\/|www\.)/i.test(string);
};

export const normalizeUrl = (url) => {
  if (url.startsWith('http://')) {
    return 'https://' + url.slice(7);
  }
  return url;
};
