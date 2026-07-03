import React from 'react';
import { FiTool, FiDownloadCloud } from 'react-icons/fi';
import Icon from '../../atoms/Icon/Icon';

const AdminPlaceholderPage = ({ title, icon: IconComponent, description }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '60vh', textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', color: 'var(--gold-dark)', marginBottom: '1rem', opacity: 0.5 }}>
        <Icon icon={IconComponent} />
      </div>
      <h1 className="font-heading" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{title}</h1>
      <p className="text-secondary" style={{ maxWidth: '400px', lineHeight: '1.6' }}>
        {description}
      </p>
    </div>
  );
};

export default AdminPlaceholderPage;
