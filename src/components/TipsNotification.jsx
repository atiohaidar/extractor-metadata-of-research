import React, { useState, useEffect } from 'react';
import InfoAlert from './InfoAlert';

const TipsNotification = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show tips notification after a short delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <InfoAlert 
      type="info" 
      onClose={handleDismiss}
    >
      <strong>Tips!</strong> Tekan Ctrl+V di mana saja pada halaman ini untuk menempelkan konten secara otomatis, atau <strong>seret dan lepas</strong> tautan langsung ke halaman. URL akan langsung diproses, HTML akan ditempatkan di tab HTML.
    </InfoAlert>
  );
};

export default TipsNotification;
