import React, { useState } from 'react';
import UrlForm from './UrlForm';
import HtmlForm from './HtmlForm';

const InputForm = ({ onUrlSubmit, onHtmlSubmit, isLoading }) => {
  const [activeTab, setActiveTab] = useState('url');

  return (
    <div className="rounded-lg bg-white mb-8 transition-all duration-300 ease-in-out mt-4 shadow-lg border border-gray-100 card-hover-enhanced">
      <div className="card-header px-6 py-4 text-white rounded-t-lg">
        <i className="bi bi-input-cursor me-2"></i>Input URL Jurnal atau HTML
      </div>
      <div className="p-6">
        <div className="flex border-b border-gray-200" role="tablist">
          <button 
            className={`block px-4 py-2 text-sm font-medium cursor-pointer border-b-2 border-transparent -mb-px ${
              activeTab === 'url' 
                ? 'text-green-600 border-green-600 font-bold' 
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            type="button"
            onClick={() => setActiveTab('url')}
            disabled={isLoading}
          >
            Input URL
          </button>
          <button 
            className={`block px-4 py-2 text-sm font-medium cursor-pointer border-b-2 border-transparent -mb-px ${
              activeTab === 'html' 
                ? 'text-green-600 border-green-600 font-bold' 
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            type="button"
            onClick={() => setActiveTab('html')}
            disabled={isLoading}
          >
            Tempel HTML
          </button>
        </div>
        
        <div className="mt-4">
          {/* URL Input Tab */}
          {activeTab === 'url' && (
            <div className="transition-opacity duration-300 ease-in-out">
              <UrlForm onSubmit={onUrlSubmit} isLoading={isLoading} />
            </div>
          )}
          
          {/* HTML Input Tab */}
          {activeTab === 'html' && (
            <div className="transition-opacity duration-300 ease-in-out">
              <HtmlForm onSubmit={onHtmlSubmit} isLoading={isLoading} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputForm;
