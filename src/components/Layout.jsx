import React from 'react';
import GlowBlobs from './GlowBlobs';

const Layout = ({ children }) => {
  return (
    <>
      <GlowBlobs />
      <div className="container">
        {children}
      </div>
    </>
  );
};

export default Layout;
