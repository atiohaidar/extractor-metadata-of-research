import React from 'react';
import GlowBlobs from './GlowBlobs';

const Layout = ({ children }) => {
  return (
    <>
      <GlowBlobs />
      <div className="mx-auto px-4" style={{ maxWidth: '1200px' }}>
        {children}
      </div>
    </>
  );
};

export default Layout;
