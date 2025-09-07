import React from 'react';

const DragOverlay = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-primary/20 z-50 pointer-events-none flex items-center justify-center">
      <div className="drag-message absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-800 px-10 py-5 rounded-lg text-lg font-bold">
        <i className="bi bi-link-45deg me-2"></i>
        Seret tautan ke sini untuk dicoba ekstrak isinya XD
      </div>
    </div>
  );
};

export default DragOverlay;
