import React, { useState, useEffect } from 'react';

const IntroOverlay = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem('introSeen');
      if (!seen) {
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
        }, 2300); // 1600ms delay + 700ms animation
        sessionStorage.setItem('introSeen', '1');
      }
    } catch (_) { 
      // ignore storage errors
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="intro-overlay active" aria-hidden="true">
      <div className="intro-card">
        <div className="intro-title">Selamat welkom</div>
        <div className="intro-line"></div>
        <div className="intro-sub">
          Letsgoo mainkan . btw thx github copilot yang sudah menemani dalam pembuatan kode ini XD✨
        </div>
      </div>
    </div>
  );
};

export default IntroOverlay;
