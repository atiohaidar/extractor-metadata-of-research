import React from 'react';

const InfoAlert = ({ 
  type = 'info', 
  children, 
  onClose, 
  icon,
  dismissible = true 
}) => {
  const getAlertStyles = () => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getCloseButtonStyles = () => {
    switch (type) {
      case 'info':
        return 'text-blue-600 hover:text-blue-800';
      case 'warning':
        return 'text-yellow-600 hover:text-yellow-800';
      case 'success':
        return 'text-green-600 hover:text-green-800';
      case 'error':
        return 'text-red-600 hover:text-red-800';
      default:
        return 'text-blue-600 hover:text-blue-800';
    }
  };

  return (
    <div className={`p-4 mb-4 rounded-lg border relative ${getAlertStyles()}`}>
      {icon && <i className={`${icon} me-2`}></i>}
      <div className={dismissible ? 'pr-8' : ''}>
        {children}
      </div>
      {dismissible && onClose && (
        <button 
          type="button" 
          className={`absolute top-2 right-2 w-6 h-6 opacity-50 hover:opacity-75 cursor-pointer border-0 bg-transparent transition-opacity duration-200 ${getCloseButtonStyles()}`}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default InfoAlert;
