import React from 'react';

const WelcomeMessage = () => {
  return (
    <div className="p-4 mb-4 rounded-lg border bg-blue-50 border-blue-200 text-blue-800">
      <i className="bi bi-info-circle-fill me-2"></i> 
      Silakan masukkan URL jurnal atau tempelkan konten HTML menggunakan formulir di bawah ini. Metadata yang diekstrak akan muncul di sini.
      <br />
      <strong>Tips:</strong> Anda juga dapat menekan <kbd className="px-1 py-0.5 text-xs font-mono bg-gray-200 text-gray-800 rounded border">Ctrl+V</kbd> di mana saja pada halaman untuk menempel dan mencari secara otomatis, atau <strong>seret dan lepas</strong> tautan langsung ke halaman!
    </div>
  );
};

export default WelcomeMessage;
