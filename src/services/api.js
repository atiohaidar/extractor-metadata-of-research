import { SERVER_URL } from '../utils/constants';

export const callAPI = async (endpoint, data) => {
  try {
    const url = `${SERVER_URL}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await response.text();
      throw new Error(`Server returned non-JSON response: ${textResponse.substring(0, 100)}`);
    }

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || `HTTP error! status: ${response.status}`);
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const extractMetadata = async (inputMode, data) => {
  return await callAPI('/api/extract-metadata', {
    input_mode: inputMode,
    ...data
  });
};

export const fetchSintaInfo = async (sintaId) => {
  const apiUrl = `https://sinta-journal-api-production.atiohaidar.workers.dev/api/journal/${encodeURIComponent(sintaId)}`;
  const resp = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const json = await resp.json();
  if (!json || json.success !== true || !json.data) {
    throw new Error(json && json.message ? json.message : 'Invalid response');
  }
  return json.data;
};

export const fetchScimagoInfo = async (url) => {
  const apiUrl = 'https://scrape.scimago.workers.dev/';
  const resp = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: url.replace(/&amp;/g, '&') })
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const json = await resp.json();
  if (!json || !json.name) throw new Error('Data SCImago tidak ditemukan');
  return json;
};

export const searchJournalIndexing = async (journalName) => {
  try {
    const apiUrl = `https://deteksi-index-jurnal-nasional-internasional.atiohaidar.workers.dev/check-journal?journal_name=${encodeURIComponent(journalName)}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    // Validate response structure
    if (!result || typeof result !== 'object') {
      throw new Error('Invalid response format');
    }

    return {
      scimago: result.scimago && result.scimago !== 'null' ? result.scimago : null,
      sinta: result.sinta && result.sinta !== 'null' ? result.sinta : null,
      usage: result.usage || null
    };
  } catch (error) {
    throw new Error(`Failed to search journal indexing: ${error.message}`);
  }
};
