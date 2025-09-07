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
    <div 
      className="intro-overlay fixed inset-0 z-50 flex items-center justify-center" 
      style={{
        background: 'radial-gradient(800px 500px at 50% -10%, rgba(61,214,245,0.15), rgba(255,255,255,0.95) 60%)',
        backdropFilter: 'blur(4px)',
        animation: 'introFade .8s ease forwards'
      }}
      aria-hidden="true"
    >
      <div className="intro-card bg-white rounded-2xl px-7 py-6 text-center border border-blue-200 shadow-xl">
        <div className="font-bold text-2xl text-slate-800 mb-2">Selamat welkom</div>
        <div className="intro-line h-0.5 w-44 mx-auto my-4 rounded-full"></div>
        <div className="text-gray-500 text-sm">
          Letsgoo mainkan . btw thx github copilot yang sudah menemani dalam pembuatan kode ini XD✨
        </div>
      </div>
    </div>
  );
};

export default IntroOverlay;
