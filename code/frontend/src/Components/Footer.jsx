import React from 'react';

export function Footer() {
  return (
    <footer className="w-full bg-white shadow mt-auto">
      <div className="flex w-full px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-blue-500 text-sm">
          Crée par ESPINAL, Miguelangel et GENEVEY, Coemgen
        </p>
        <img src="logoLarac.png" alt="Logo" className="mx-6 h-6" />
        <img src="logoUga.png" alt="Logo" className="mx-6 h-6" />
      </div>
    </footer>
  );
}
