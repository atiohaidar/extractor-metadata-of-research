/**
 * OJS (Open Journal Systems) HTML Parser
 * Extracts additional metadata from OJS-specific HTML patterns
 */

/**
 * Parse OJS HTML content to extract additional metadata
 * @param {string} htmlContent - Raw HTML content from the journal page
 * @returns {object} - Extracted metadata object
 */
export const parseOjsHtml = (htmlContent) => {
    if (!htmlContent) return {};

    const extracted = {};

    // Create a temporary DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Extract Published Date
    // Pattern: <h2 class="label">Published</h2> <div class="value"><span>2025-05-29</span></div>
    const publishedDate = extractLabelValue(doc, 'Published');
    if (publishedDate) {
        extracted.date_published = publishedDate;
    }

    // Extract Issue info
    // Pattern: <h2 class="label">Issue</h2> <div class="value">...</div>
    const issue = extractLabelValue(doc, 'Issue');
    if (issue) {
        extracted.issue = issue;
    }

    // Extract Section
    const section = extractLabelValue(doc, 'Section');
    if (section) {
        extracted.section = section;
    }

    // Extract DOI from OJS format
    // Pattern: <section class="item doi">...<span class="value"><a href="...">...</a></span>
    const doiElement = doc.querySelector('.item.doi .value a, .item.doi a[href*="doi.org"]');
    if (doiElement) {
        const doiHref = doiElement.getAttribute('href');
        const doiText = doiElement.textContent.trim();
        extracted.doi_ojs = doiHref || doiText;
    }

    // Extract Keywords from OJS format
    // Pattern: <section class="item keywords">...<span class="value">...</span>
    const keywordsSection = doc.querySelector('.item.keywords .value, .keywords .value');
    if (keywordsSection) {
        extracted.keywords_ojs = keywordsSection.textContent.trim();
    }

    // Extract How to Cite
    // Pattern: <section class="item citation">...<div class="value">...</div>
    const citationSection = doc.querySelector('.item.citation .value, .citation_format_value');
    if (citationSection) {
        extracted.how_to_cite = citationSection.textContent.trim();
    }

    // Extract Abstract from OJS format
    // Pattern: <section class="item abstract">...<p>...</p>
    const abstractSection = doc.querySelector('.item.abstract p, .abstract .value p, section.abstract p');
    if (abstractSection) {
        extracted.abstract_ojs = abstractSection.textContent.trim();
    }

    // Extract PDF/Galley links
    const pdfLinks = [];
    const galleyLinks = doc.querySelectorAll('.galleys_links a, .galley-link a, a[href*="/view/"][href*="/"]');
    galleyLinks.forEach(link => {
        const href = link.getAttribute('href');
        const text = link.textContent.trim();
        if (href && (text.toLowerCase().includes('pdf') || href.toLowerCase().includes('pdf'))) {
            pdfLinks.push({ url: href, label: text });
        }
    });
    if (pdfLinks.length > 0) {
        extracted.pdf_links = pdfLinks;
    }

    // Extract Volume/Issue from breadcrumb or other locations
    const volumeIssuePattern = /Vol\.?\s*(\d+)\s*No\.?\s*(\d+)/i;
    const pageText = doc.body ? doc.body.textContent : '';
    const volIssueMatch = pageText.match(volumeIssuePattern);
    if (volIssueMatch) {
        extracted.volume_issue = `Vol. ${volIssueMatch[1]} No. ${volIssueMatch[2]}`;
    }

    // Extract Received/Accepted dates if available
    const receivedDate = extractLabelValue(doc, 'Received');
    if (receivedDate) {
        extracted.date_received = receivedDate;
    }

    const acceptedDate = extractLabelValue(doc, 'Accepted');
    if (acceptedDate) {
        extracted.date_accepted = acceptedDate;
    }

    return extracted;
};

/**
 * Helper function to extract value from OJS label-value pattern
 * @param {Document} doc - Parsed HTML document
 * @param {string} labelText - The label text to search for
 * @returns {string|null} - The extracted value or null
 */
const extractLabelValue = (doc, labelText) => {
    // Try multiple patterns

    // Pattern 1: <h2 class="label">Label</h2> followed by <div class="value">
    const labels = doc.querySelectorAll('h2.label, .label, h3.label, h4.label');
    for (const label of labels) {
        if (label.textContent.trim().toLowerCase() === labelText.toLowerCase()) {
            // Look for next sibling with class "value"
            let sibling = label.nextElementSibling;
            while (sibling) {
                if (sibling.classList && sibling.classList.contains('value')) {
                    return sibling.textContent.trim();
                }
                sibling = sibling.nextElementSibling;
            }
            // Also check parent's next sibling
            const parent = label.parentElement;
            if (parent) {
                const valueDiv = parent.querySelector('.value');
                if (valueDiv) {
                    return valueDiv.textContent.trim();
                }
            }
        }
    }

    // Pattern 2: <section class="item {label}">...<div class="value">
    const section = doc.querySelector(`.item.${labelText.toLowerCase()} .value`);
    if (section) {
        return section.textContent.trim();
    }

    // Pattern 3: Direct label:value pattern with data attributes
    const dataLabel = doc.querySelector(`[data-label="${labelText}"], [data-field="${labelText.toLowerCase()}"]`);
    if (dataLabel) {
        return dataLabel.textContent.trim();
    }

    return null;
};

/**
 * Merge OJS-parsed metadata with existing metadata
 * OJS data only fills in missing fields, doesn't overwrite existing
 * @param {object} existingMetadata - Metadata from backend
 * @param {object} ojsMetadata - Metadata parsed from OJS HTML
 * @returns {object} - Merged metadata
 */
export const mergeOjsMetadata = (existingMetadata, ojsMetadata) => {
    if (!ojsMetadata || Object.keys(ojsMetadata).length === 0) {
        return existingMetadata;
    }

    const merged = { ...existingMetadata };

    // Map OJS fields to standard fields (only if not already present)
    const fieldMappings = {
        'date_published': 'date_published',
        'doi_ojs': 'doi',
        'keywords_ojs': 'keywords',
        'abstract_ojs': 'abstract',
        'issue': 'issue',
        'section': 'section',
        'how_to_cite': 'how_to_cite',
        'volume_issue': 'volume_issue',
        'date_received': 'date_received',
        'date_accepted': 'date_accepted'
    };

    for (const [ojsKey, standardKey] of Object.entries(fieldMappings)) {
        if (ojsMetadata[ojsKey] && !merged[standardKey]) {
            merged[standardKey] = ojsMetadata[ojsKey];
        }
    }

    // PDF links - merge with existing
    if (ojsMetadata.pdf_links && ojsMetadata.pdf_links.length > 0) {
        merged.pdf_links_ojs = ojsMetadata.pdf_links;
    }

    return merged;
};
