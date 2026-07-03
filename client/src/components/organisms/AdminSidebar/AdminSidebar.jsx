import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiDownload, FiSettings, FiLogOut } from 'react-icons/fi';
import Icon from '../../atoms/Icon/Icon';
import './AdminSidebar.css';

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar glass-panel">
      <div className="sidebar-header">
        <h2 className="font-display text-gradient-gold">Admin Panel</h2>
        <p className="font-heading text-sm text-secondary">Libro de Recuerdos</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink 
          to="/admin" 
          end
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <Icon icon={FiGrid} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/admin/download" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <Icon icon={FiDownload} />
          <span>Descargas</span>
        </NavLink>
        
        <NavLink 
          to="/admin/settings" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <Icon icon={FiSettings} />
          <span>Configuración</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <a href="/" className="sidebar-link logout-link">
          <Icon icon={FiLogOut} />
          <span>Volver al Libro</span>
        </a>
      </div>
    </aside>
  );
};

export default AdminSidebar;
