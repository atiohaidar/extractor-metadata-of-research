import React from 'react';

const DragOverlay = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="drag-overlay active">
      <div className="drag-message">
        <i className="bi bi-link-45deg me-2"></i>
        Seret tautan ke sini untuk dicoba ekstrak isinya XD
      </div>
    </div>
  );
};

export default DragOverlay;
