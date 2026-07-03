import React from 'react';
import { Outlet } from 'react-router-dom';
import './PublicLayout.css';

const PublicLayout = () => {
  return (
    <div className="public-layout">
      {/* El contenido de las páginas renderizará aquí */}
      <Outlet />
    </div>
  );
};

export default PublicLayout;
