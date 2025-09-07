export const SERVER_URL = "https://api-ekstrak-web-jurnal.atiohaidar.workers.dev";

export const LOADING_STEPS = [
  'Initializing request...',
  'Fetching journal page...',
  'Parsing metadata...',
  'Processing Sinta links...',
  'Preparing results...'
];

export const PRIORITY_FIELDS = [
  { key: 'title', label: 'Title' },
  { key: 'authors', label: 'Authors', isArray: true },
  { key: 'type', label: 'Type' },
  { key: 'source', label: 'Source', isArray: true },
  { key: 'sinta_link', label: 'Sinta', isSpecial: true }
];

export const ADDITIONAL_FIELDS = [
  { key: 'uri', label: 'URI', isLink: true },
  { key: 'doi', label: 'DOI' },
  { key: 'issn', label: 'ISSN' },
  { key: 'volume', label: 'Volume' },
  { key: 'keywords', label: 'Keywords' },
  { key: 'language', label: 'Language' },
  { key: 'pdf_url', label: 'PDF', isPDF: true }
];
