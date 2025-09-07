import React from 'react';

const SkeletonLoader = ({ rows = 5 }) => {
  return (
    <div className="w-full">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="skeleton-row">
          <div className="skeleton-cell">
            <div className="skeleton" style={{ width: '40%' }}></div>
          </div>
          <div className="skeleton-cell">
            <div className="skeleton" style={{ width: '80%' }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
