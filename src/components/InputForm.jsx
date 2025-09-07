import React, { useState } from 'react';
import UrlForm from './UrlForm';
import HtmlForm from './HtmlForm';

const InputForm = ({ onUrlSubmit, onHtmlSubmit, isLoading }) => {
  const [activeTab, setActiveTab] = useState('url');

  return (
    <div className="card mt-4">
      <div className="card-header bg-secondary text-white">
        <i className="bi bi-input-cursor me-2"></i>Input URL Jurnal atau HTML
      </div>
      <div className="card-body">
        <ul className="nav nav-tabs" id="inputTabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button 
              className={`nav-link ${activeTab === 'url' ? 'active' : ''}`}
              id="url-tab"
              type="button"
              onClick={() => setActiveTab('url')}
              disabled={isLoading}
            >
              Input URL
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button 
              className={`nav-link ${activeTab === 'html' ? 'active' : ''}`}
              id="html-tab"
              type="button"
              onClick={() => setActiveTab('html')}
              disabled={isLoading}
            >
              Tempel HTML
            </button>
          </li>
        </ul>
        
        <div className="tab-content mt-3" id="inputTabContent">
          {/* URL Input Tab */}
          <div className={`tab-pane fade ${activeTab === 'url' ? 'show active' : ''}`} id="url-input" role="tabpanel">
            {activeTab === 'url' && <UrlForm onSubmit={onUrlSubmit} isLoading={isLoading} />}
          </div>
          
          {/* HTML Input Tab */}
          <div className={`tab-pane fade ${activeTab === 'html' ? 'show active' : ''}`} id="html-input" role="tabpanel">
            {activeTab === 'html' && <HtmlForm onSubmit={onHtmlSubmit} isLoading={isLoading} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
