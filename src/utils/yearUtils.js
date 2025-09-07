/**
 * Extract publication years from metadata
 * @param {Object} metadata - The metadata object
 * @returns {Set} Set of publication years
 */
export const extractPublicationYears = (metadata) => {
  const pubYears = new Set();
  
  if (!metadata) return pubYears;
  
  try {
    Object.keys(metadata).forEach(key => {
      if (key.startsWith('date') || key.startsWith('date_') || key === 'year') {
        const val = String(metadata[key] || '');
        const matches = val.match(/\b(19|20)\d{2}\b/g);
        if (matches) {
          matches.forEach(year => pubYears.add(year));
        }
      }
    });
  } catch (error) {
    console.warn('Error extracting publication years:', error);
  }
  
  return pubYears;
};

/**
 * Check if a year matches any publication years
 * @param {string|number} year - Year to check
 * @param {Set} publicationYears - Set of publication years
 * @returns {boolean} True if year matches
 */
export const isYearMatching = (year, publicationYears) => {
  return publicationYears.has(String(year));
};

/**
 * Escape HTML string to prevent XSS
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
export const escapeHtml = (str) => {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/**
 * Generate Google search URL for Sinta and SCImago
 * @param {string} source - The source/journal name to search
 * @returns {string} Google search URL
 */
export const generateSearchUrl = (source) => {
  const query = encodeURIComponent(`(site:sinta.* OR site:scimagojr.com) ${source}`);
  return `https://www.google.com/search?q=${query}`;
};
