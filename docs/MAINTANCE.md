# 🔧 Project Maintenance Guide

**Journal Metadata Extractor - React Application**

This guide provides comprehensive instructions for maintaining, updating, and extending this React-based journal metadata extraction application.

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Development Setup](#development-setup)
3. [Regular Maintenance Tasks](#regular-maintenance-tasks)
4. [Code Quality & Standards](#code-quality--standards)
5. [Deployment & Releases](#deployment--releases)
6. [Troubleshooting](#troubleshooting)
7. [Adding New Features](#adding-new-features)
8. [Performance Monitoring](#performance-monitoring)
9. [Security Considerations](#security-considerations)
10. [Backup & Recovery](#backup--recovery)

---

## 🎯 Project Overview

### Architecture
- **Frontend**: React 18 + Vite + Tailwind CSS
- **State Management**: React hooks (useState, useEffect, custom hooks)
- **API Communication**: Fetch API with custom service layer
- **Deployment**: GitHub Pages via GitHub Actions
- **Styling**: Tailwind CSS + Custom CSS for complex effects

### Key Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "tailwindcss": "^3.4.10",
  "vite": "^5.3.4"
}
```

---

## 🚀 Development Setup

### Prerequisites
- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher
- **Git**: Latest version

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/atiohaidar/extractor-metadata-of-research.git
cd extractor-metadata-of-research

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:5173/extractor-metadata-of-research/
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:github # Build for GitHub Pages deployment
npm run lint         # Run ESLint
npm run preview      # Preview production build locally
```

---

## 🔄 Regular Maintenance Tasks

### Weekly Tasks

#### 1. **Dependency Updates**
```bash
# Check for outdated packages
npm outdated

# Update all dependencies (careful with major versions)
npm update

# Update specific package
npm install package-name@latest
```

#### 2. **Code Quality Check**
```bash
# Run linting
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix

# Check for unused dependencies
npx depcheck
```

#### 3. **Build Health Check**
```bash
# Test production build
npm run build

# Test GitHub Pages build
npm run build:github

# Preview built application
npm run preview
```

### Monthly Tasks

#### 1. **Security Audit**
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# For high-severity issues
npm audit fix --force
```

#### 2. **Performance Analysis**
```bash
# Analyze bundle size
npm run build
# Check dist/ folder size

# Consider adding bundle analyzer
npm install --save-dev rollup-plugin-visualizer
```

#### 3. **API Endpoint Health Check**
- Test main API: `https://api-ekstrak-web-jurnal.atiohaidar.workers.dev`
- Test Sinta API: `https://sinta-journal-api-production.atiohaidar.workers.dev`
- Test SCImago API: `https://scrape.scimago.workers.dev`

### Quarterly Tasks

#### 1. **Major Dependency Updates**
```bash
# Check for major version updates
npm outdated

# Update React (if needed)
npm install react@latest react-dom@latest

# Update Vite (if needed)
npm install vite@latest

# Update Tailwind CSS (if needed)
npm install tailwindcss@latest
```

#### 2. **Performance Review**
- Check Core Web Vitals
- Analyze bundle size growth
- Review loading times
- Test on various devices/networks

---

## 🏆 Code Quality & Standards

### File Structure Standards
```
src/
├── components/     # React components (PascalCase)
├── hooks/         # Custom hooks (camelCase, prefix 'use')
├── services/      # API services (camelCase)
├── utils/         # Utility functions (camelCase)
└── styles/        # Global styles
```

### Naming Conventions
- **Components**: PascalCase (`MetadataTable.jsx`)
- **Hooks**: camelCase with 'use' prefix (`useJournalExtractor.js`)
- **Files**: PascalCase for components, camelCase for others
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE

### Component Guidelines
```jsx
// ✅ Good component structure
import React, { useState, useEffect } from 'react';

const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initial);
  
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  const handleSomething = () => {
    // Handler logic
  };

  return (
    <div className="tailwind-classes">
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

### Styling Guidelines
- **Primary**: Use Tailwind utility classes
- **Custom**: Use `src/styles/global.css` for complex effects only
- **Naming**: Use descriptive class names for custom CSS
- **Organization**: Group related styles together

---

## 🚢 Deployment & Releases

### Automatic Deployment
The project automatically deploys to GitHub Pages when code is pushed to the `master` branch.

**Deployment URL**: `https://atiohaidar.github.io/extractor-metadata-of-research/`

### Manual Deployment Steps
```bash
# 1. Ensure all changes are committed
git add .
git commit -m "feat: description of changes"

# 2. Push to master branch
git push origin master

# 3. GitHub Actions will automatically:
#    - Run npm install
#    - Run npm run build:github
#    - Deploy to GitHub Pages
```

### Release Checklist
- [ ] All tests pass (when implemented)
- [ ] Code is linted and formatted
- [ ] Build succeeds without warnings
- [ ] All features work in production build
- [ ] Documentation is updated
- [ ] Version number is bumped (if applicable)

### Environment Configuration
```javascript
// Production API endpoints (in src/utils/constants.js)
export const SERVER_URL = "https://api-ekstrak-web-jurnal.atiohaidar.workers.dev";

// Ensure base path is set correctly for GitHub Pages
// vite.config.js
export default defineConfig({
  base: '/extractor-metadata-of-research/',
  // ...
});
```

---

## 🔍 Troubleshooting

### Common Issues

#### 1. **Build Failures**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors (if applicable)
npm run build -- --mode development
```

#### 2. **GitHub Pages Deployment Issues**
- Check `.github/workflows/deploy.yml` configuration
- Verify `base` path in `vite.config.js`
- Ensure `public/.nojekyll` file exists

#### 3. **API Connection Issues**
```javascript
// Check API endpoints in browser console
// Verify CORS settings
// Test API endpoints directly
```

#### 4. **Styling Issues**
```bash
# Rebuild Tailwind CSS
npx tailwindcss -i ./src/styles/global.css -o ./dist/output.css --watch

# Check for conflicting CSS classes
# Verify Tailwind configuration
```

### Debugging Steps
1. **Check browser console** for JavaScript errors
2. **Check network tab** for failed API requests
3. **Verify environment variables** and configuration
4. **Test in incognito mode** to rule out caching issues
5. **Check GitHub Actions logs** for deployment issues

---

## ✨ Adding New Features

This section provides comprehensive guidance for extending the application with new features. Follow these patterns to maintain consistency and code quality.

### 🏗️ Project Architecture Overview
m
Before adding features, understand the application structure:

```
src/
├── components/           # UI Components (React JSX)
│   ├── Layout.jsx       # Page layout wrapper
│   ├── Header.jsx       # Page header
│   ├── InputForm.jsx    # Main input form
│   ├── MetadataTable.jsx # Results display
│   └── index.js         # Component exports
├── hooks/               # Custom React Hooks (Business Logic)
│   ├── useJournalExtractor.js # Main data fetching
│   ├── useDragAndDrop.js     # Drag & drop functionality
│   └── index.js         # Hook exports
├── services/            # API Communication Layer
│   └── api.js          # API calls and data fetching
├── utils/              # Utility Functions & Constants
│   ├── constants.js    # App constants
│   ├── helpers.js      # Helper functions
│   └── index.js        # Utility exports
└── styles/             # Styling
    └── global.css      # Global styles + Tailwind
```

### 🎯 Feature Development Workflow

#### Step 1: Plan Your Feature
Before coding, define:
- **Purpose**: What problem does this solve?
- **Scope**: What components are affected?
- **Dependencies**: What new APIs or libraries are needed?
- **UI/UX**: How will users interact with this feature?

#### Step 2: Create Feature Branch
```bash
# Create and switch to feature branch
git checkout -b feature/your-feature-name

# Example: Adding export functionality
git checkout -b feature/export-metadata
```

---

### 🧩 Component Development

#### Creating a New Component

**1. Create the Component File**
```bash
# Navigate to components directory
cd src/components

# Create new component file
touch ExportButton.jsx
```

**2. Component Template**
```jsx
// src/components/ExportButton.jsx
import React, { useState } from 'react';

const ExportButton = ({ 
  data, 
  format = 'json', 
  onExportStart, 
  onExportComplete, 
  onError 
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      onExportStart?.(); // Optional callback

      // Export logic here
      const exportData = formatData(data, format);
      downloadFile(exportData, `metadata.${format}`);

      onExportComplete?.(); // Optional callback
    } catch (error) {
      onError?.(error); // Optional error callback
    } finally {
      setIsExporting(false);
    }
  };

  const formatData = (data, format) => {
    switch (format) {
      case 'json':
        return JSON.stringify(data, null, 2);
      case 'csv':
        return convertToCSV(data);
      default:
        return JSON.stringify(data);
    }
  };

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting || !data}
      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
    >
      {isExporting ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Exporting...
        </>
      ) : (
        <>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export {format.toUpperCase()}
        </>
      )}
    </button>
  );
};

export default ExportButton;
```

**3. Add Component Export**
```javascript
// src/components/index.js
// Add this line to existing exports
export { default as ExportButton } from './ExportButton';
```

**4. Use Component in Parent**
```jsx
// src/components/MetadataTable.jsx (example usage)
import React from 'react';
import { ExportButton } from './index'; // Import from barrel export

const MetadataTable = ({ metadata }) => {
  const handleExportStart = () => {
    console.log('Export started');
  };

  const handleExportComplete = () => {
    console.log('Export completed');
  };

  const handleExportError = (error) => {
    console.error('Export failed:', error);
  };

  return (
    <div className="rounded-lg bg-white mb-8">
      <div className="card-header p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Metadata Jurnal</h3>
          <ExportButton
            data={metadata}
            format="json"
            onExportStart={handleExportStart}
            onExportComplete={handleExportComplete}
            onError={handleExportError}
          />
        </div>
      </div>
      {/* Rest of component */}
    </div>
  );
};
```

---

### 🎣 Custom Hook Development

#### Creating Business Logic Hooks

**1. Create Hook File**
```bash
# Navigate to hooks directory
cd src/hooks

# Create new hook file
touch useExportData.js
```

**2. Hook Template**
```javascript
// src/hooks/useExportData.js
import { useState, useCallback } from 'react';

export const useExportData = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState(null);

  const exportData = useCallback(async (data, format = 'json') => {
    setIsExporting(true);
    setError(null);

    try {
      let exportContent;
      let mimeType;
      let fileExtension;

      switch (format) {
        case 'json':
          exportContent = JSON.stringify(data, null, 2);
          mimeType = 'application/json';
          fileExtension = 'json';
          break;
        
        case 'csv':
          exportContent = convertToCSV(data);
          mimeType = 'text/csv';
          fileExtension = 'csv';
          break;
        
        case 'excel':
          exportContent = await convertToExcel(data);
          mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          fileExtension = 'xlsx';
          break;

        default:
          throw new Error(`Unsupported format: ${format}`);
      }

      // Download file
      const blob = new Blob([exportContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `journal-metadata-${Date.now()}.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsExporting(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    exportData,
    isExporting,
    error,
    clearError
  };
};

// Helper function for CSV conversion
const convertToCSV = (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data for CSV conversion');
  }

  const headers = Object.keys(data);
  const values = Object.values(data).map(value => 
    Array.isArray(value) ? value.join('; ') : String(value || '')
  );

  return [
    headers.join(','),
    values.map(value => `"${value.replace(/"/g, '""')}"`).join(',')
  ].join('\n');
};

// Helper function for Excel conversion (requires additional library)
const convertToExcel = async (data) => {
  // Note: This would require installing a library like 'xlsx'
  // npm install xlsx
  
  // Example implementation:
  // import * as XLSX from 'xlsx';
  // const workbook = XLSX.utils.book_new();
  // const worksheet = XLSX.utils.json_to_sheet([data]);
  // XLSX.utils.book_append_sheet(workbook, worksheet, 'Metadata');
  // return XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
  throw new Error('Excel export not implemented - requires xlsx library');
};
```

**3. Add Hook Export**
```javascript
// src/hooks/index.js
// Add this line to existing exports
export { useExportData } from './useExportData';
```

**4. Use Hook in Component**
```jsx
// Updated ExportButton component using the hook
import React from 'react';
import { useExportData } from '../hooks';

const ExportButton = ({ data, format = 'json' }) => {
  const { exportData, isExporting, error, clearError } = useExportData();

  const handleExport = async () => {
    const success = await exportData(data, format);
    if (success) {
      // Optional: Show success message
      console.log('Export successful');
    }
  };

  return (
    <div>
      <button
        onClick={handleExport}
        disabled={isExporting || !data}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
      >
        {isExporting ? 'Exporting...' : `Export ${format.toUpperCase()}`}
      </button>
      
      {error && (
        <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          <span>Export failed: {error}</span>
          <button onClick={clearError} className="ml-2 text-red-900 hover:text-red-600">×</button>
        </div>
      )}
    </div>
  );
};
```

---

### 🌐 API Integration

#### Adding New API Endpoints

**1. Add API Function**
```javascript
// src/services/api.js
// Add new API functions to existing file

export const exportMetadataToService = async (data, format) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/export`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        data, 
        format,
        timestamp: Date.now()
      })
    });

    if (!response.ok) {
      throw new Error(`Export API error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Export failed: ${error.message}`);
  }
};

export const getExportHistory = async (userId) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/exports/${userId}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch export history: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`History fetch failed: ${error.message}`);
  }
};
```

**2. Create API Hook**
```javascript
// src/hooks/useExportAPI.js
import { useState, useCallback } from 'react';
import { exportMetadataToService, getExportHistory } from '../services/api';

export const useExportAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const exportToCloud = useCallback(async (data, format) => {
    setLoading(true);
    setError(null);

    try {
      const result = await exportMetadataToService(data, format);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHistory = useCallback(async (userId) => {
    setLoading(true);
    setError(null);

    try {
      const historyData = await getExportHistory(userId);
      setHistory(historyData);
      return historyData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    exportToCloud,
    fetchHistory,
    loading,
    error,
    history,
    clearError: () => setError(null)
  };
};
```

---

### 🛠️ Utility Functions

#### Adding Helper Functions

**1. Add to Existing Utils**
```javascript
// src/utils/helpers.js
// Add new helper functions

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const generateFilename = (metadata, format) => {
  const title = metadata.title ? 
    metadata.title.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_') : 
    'metadata';
  const timestamp = new Date().toISOString().slice(0, 10);
  return `${title}_${timestamp}.${format}`;
};

export const validateExportData = (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Export data must be a valid object');
  }
  
  if (Object.keys(data).length === 0) {
    throw new Error('Export data cannot be empty');
  }
  
  return true;
};
```

**2. Create New Utility File**
```javascript
// src/utils/exportUtils.js
export const EXPORT_FORMATS = {
  JSON: 'json',
  CSV: 'csv',
  EXCEL: 'xlsx',
  PDF: 'pdf'
};

export const EXPORT_CONFIG = {
  [EXPORT_FORMATS.JSON]: {
    mimeType: 'application/json',
    extension: 'json',
    name: 'JSON'
  },
  [EXPORT_FORMATS.CSV]: {
    mimeType: 'text/csv',
    extension: 'csv',
    name: 'CSV'
  },
  [EXPORT_FORMATS.EXCEL]: {
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    extension: 'xlsx',
    name: 'Excel'
  }
};

export const getExportConfig = (format) => {
  return EXPORT_CONFIG[format] || EXPORT_CONFIG[EXPORT_FORMATS.JSON];
};
```

**3. Update Utils Index**
```javascript
// src/utils/index.js
export * from './constants';
export * from './helpers';
export * from './yearUtils';
export * from './exportUtils'; // Add new utility
```

---

### 🎨 Styling New Components

#### Using Tailwind CSS

**1. Component-Specific Styles**
```jsx
// Use Tailwind utility classes for most styling
const ExportButton = () => {
  return (
    <div className="relative inline-block">
      <button className="
        inline-flex items-center
        px-4 py-2
        bg-gradient-to-r from-blue-500 to-blue-600
        hover:from-blue-600 hover:to-blue-700
        text-white font-medium
        rounded-lg shadow-sm
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
      ">
        Export Data
      </button>
    </div>
  );
};
```

**2. Custom CSS for Complex Effects**
```css
/* src/styles/global.css - Add to existing file */

/* Export button with custom animation */
.export-button {
  position: relative;
  overflow: hidden;
}

.export-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.export-button:hover::before {
  left: 100%;
}

/* Progress indicator for export */
.export-progress {
  background: linear-gradient(90deg, var(--primary-600), var(--accent));
  box-shadow: 0 0 14px rgba(0, 230, 118, 0.45);
  animation: progressPulse 2s infinite;
}

@keyframes progressPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

---

### 🧪 Testing New Features

#### Component Testing Template
```javascript
// tests/components/ExportButton.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ExportButton } from '../src/components';

describe('ExportButton', () => {
  const mockData = {
    title: 'Test Article',
    authors: ['Author 1', 'Author 2']
  };

  it('renders export button', () => {
    render(<ExportButton data={mockData} />);
    expect(screen.getByText(/export/i)).toBeInTheDocument();
  });

  it('handles export click', async () => {
    const onExportComplete = jest.fn();
    render(
      <ExportButton 
        data={mockData} 
        onExportComplete={onExportComplete}
      />
    );

    fireEvent.click(screen.getByText(/export/i));
    
    await waitFor(() => {
      expect(onExportComplete).toHaveBeenCalled();
    });
  });

  it('disables button when no data provided', () => {
    render(<ExportButton data={null} />);
    expect(screen.getByText(/export/i)).toBeDisabled();
  });
});
```

---

### 📦 Feature Integration Checklist

Before submitting your feature:

- [ ] **Component Created**: New component follows naming conventions
- [ ] **Hook Implemented**: Business logic separated into custom hook
- [ ] **API Integration**: New endpoints added to services layer
- [ ] **Utils Added**: Helper functions added to utils
- [ ] **Styling Applied**: Tailwind classes used, custom CSS for complex effects
- [ ] **Exports Updated**: All new modules exported in index.js files
- [ ] **Testing Added**: Unit tests for components and hooks
- [ ] **Documentation Updated**: README and maintenance guide updated
- [ ] **Error Handling**: Proper error boundaries and user feedback
- [ ] **Accessibility**: ARIA labels and keyboard navigation
- [ ] **Performance**: No unnecessary re-renders or memory leaks

### 🚀 Deployment

```bash
# 1. Test your feature locally
npm run dev

# 2. Build and test production version
npm run build
npm run preview

# 3. Commit your changes
git add .
git commit -m "feat: add export functionality"

# 4. Push feature branch
git push origin feature/export-metadata

# 5. Create pull request for review
# 6. After review, merge to master
# 7. Automatic deployment via GitHub Actions
```

### 📚 Real-World Example: Complete Feature Implementation

Here's a complete example of adding a "Bookmark Feature":

**1. Component**
```jsx
// src/components/BookmarkButton.jsx
import React from 'react';
import { useBookmarks } from '../hooks';

const BookmarkButton = ({ metadata }) => {
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(metadata.id);

  const handleToggle = () => {
    if (bookmarked) {
      removeBookmark(metadata.id);
    } else {
      addBookmark(metadata);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-full transition-colors duration-200 ${
        bookmarked 
          ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      <svg className="w-5 h-5" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    </button>
  );
};

export default BookmarkButton;
```

**2. Hook**
```javascript
// src/hooks/useBookmarks.js
import { useState, useEffect, useCallback } from 'react';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('journal-bookmarks');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  const saveBookmarks = useCallback((newBookmarks) => {
    setBookmarks(newBookmarks);
    localStorage.setItem('journal-bookmarks', JSON.stringify(newBookmarks));
  }, []);

  const addBookmark = useCallback((metadata) => {
    const bookmark = {
      id: metadata.id || Date.now().toString(),
      title: metadata.title,
      authors: metadata.authors,
      addedAt: new Date().toISOString()
    };
    
    saveBookmarks(prev => [...prev, bookmark]);
  }, [saveBookmarks]);

  const removeBookmark = useCallback((id) => {
    saveBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
  }, [saveBookmarks]);

  const isBookmarked = useCallback((id) => {
    return bookmarks.some(bookmark => bookmark.id === id);
  }, [bookmarks]);

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked
  };
};
```

This comprehensive guide should help new developers understand exactly how to add features to your project while maintaining code quality and consistency! 🚀

---

## 📊 Performance Monitoring

### Key Metrics to Monitor
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

### Monitoring Tools
```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://atiohaidar.github.io/extractor-metadata-of-research/

# Bundle size analysis
npm install --save-dev rollup-plugin-visualizer
```

### Performance Optimization Checklist
- [ ] Images are optimized and lazy-loaded
- [ ] Unused code is removed
- [ ] Components are memoized when appropriate
- [ ] Bundle size is monitored
- [ ] Critical CSS is inlined

---

## 🔒 Security Considerations

### Regular Security Tasks
```bash
# 1. Audit dependencies monthly
npm audit

# 2. Update vulnerable packages
npm audit fix

# 3. Check for sensitive data in code
grep -r "password\|secret\|key" src/
```

### Security Best Practices
- **No secrets in code**: Use environment variables
- **API security**: Validate all inputs
- **Dependencies**: Keep updated and audit regularly
- **HTTPS**: Ensure all API calls use HTTPS
- **Content Security Policy**: Consider implementing CSP headers

### Data Protection
- **User input**: Sanitize all user inputs
- **API responses**: Validate and sanitize API responses
- **Local storage**: Avoid storing sensitive data
- **Error messages**: Don't expose sensitive information

---

## 💾 Backup & Recovery

### Code Backup
- **Primary**: GitHub repository (automatic)
- **Secondary**: Local development environment
- **Branches**: Maintain feature branches for major changes

### Configuration Backup
```bash
# Important files to backup:
- package.json
- vite.config.js
- tailwind.config.js
- .github/workflows/deploy.yml
- src/utils/constants.js
```

### Recovery Procedures
```bash
# 1. Clone fresh repository
git clone https://github.com/atiohaidar/extractor-metadata-of-research.git

# 2. Restore dependencies
npm install

# 3. Verify configuration
npm run build

# 4. Test functionality
npm run dev
```

---

## 📞 Support & Resources

### Documentation
- **React**: https://react.dev/
- **Vite**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **GitHub Actions**: https://docs.github.com/en/actions

### Community Support
- **GitHub Issues**: For bug reports and feature requests
- **React Community**: https://react.dev/community
- **Stack Overflow**: Tag questions with `react`, `vite`, `tailwindcss`

### Contact Information
- **Repository**: https://github.com/atiohaidar/extractor-metadata-of-research
- **Maintainer**: @atiohaidar

---

## 📝 Maintenance Log Template

```markdown
## Maintenance Log Entry - [Date]

### Tasks Completed
- [ ] Dependency updates
- [ ] Security audit
- [ ] Performance check
- [ ] Build verification

### Issues Found
- Issue 1: Description and resolution
- Issue 2: Description and resolution

### Next Actions
- Action 1: Priority and timeline
- Action 2: Priority and timeline

### Notes
Any additional observations or recommendations.
```

---

**Last Updated**: September 7, 2025
**Version**: 1.0.0
**Maintainer**: @atiohaidar