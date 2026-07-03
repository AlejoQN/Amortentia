import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../organisms/AdminSidebar/AdminSidebar';
import './AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
