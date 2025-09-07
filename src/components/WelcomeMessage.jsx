import React from 'react';

const WelcomeMessage = () => {
  return (
    <div className="alert alert-info mb-4">
      <i className="bi bi-info-circle-fill me-2"></i> 
      Silakan masukkan URL jurnal atau tempelkan konten HTML menggunakan formulir di bawah ini. Metadata yang diekstrak akan muncul di sini.
      <br />
      <strong>Tips:</strong> Anda juga dapat menekan <kbd>Ctrl+V</kbd> di mana saja pada halaman untuk menempel dan mencari secara otomatis, atau <strong>seret dan lepas</strong> tautan langsung ke halaman!
    </div>
  );
};

export default WelcomeMessage;
