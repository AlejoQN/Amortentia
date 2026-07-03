import React, { useState, useEffect } from 'react';
import { FiDownload, FiPackage, FiImage, FiFileText } from 'react-icons/fi';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import Loader from '../../atoms/Loader/Loader';
import { entriesService, downloadService } from '../../../services/api';
import './AdminDownloadPage.css';

const AdminDownloadPage = () => {
  const [stats, setStats] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await entriesService.getAllEntries();
        setStats({ total: data.length });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleDownload = () => {
    downloadService.exportZip();
  };

  return (
    <div className="admin-download-page">
      <div className="admin-page-header">
        <div>
          <h1 className="font-heading">Centro de Descargas</h1>
          <p className="text-secondary">Exporta todo el contenido para tu libro físico</p>
        </div>
      </div>

      {loading ? (
        <div className="admin-loading"><Loader /></div>
      ) : (
        <div className="download-content">
          <div className="download-card glass-panel">
            <div className="download-icon-wrapper">
              <Icon icon={FiPackage} size={48} />
            </div>
            
            <h2 className="font-display text-gradient-gold" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              Descargar Fotos
            </h2>
            
            <p className="download-description">
              Obtén un archivo ZIP que contiene únicamente todas las imágenes subidas a tu servidor en su calidad original.
            </p>

            <div className="download-stats">
              <div className="stat-item">
                <Icon icon={FiImage} />
                <span>{stats.total} Fotos disponibles</span>
              </div>
            </div>

            <Button 
              variant="primary" 
              size="lg" 
              onClick={handleDownload}
              icon={<Icon icon={FiDownload} />}
              disabled={stats.total === 0}
              className="download-btn"
            >
              {stats.total === 0 ? 'No hay recuerdos para descargar' : 'Descargar Archivo ZIP'}
            </Button>
            
            {stats.total === 0 && (
              <p style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginTop: '1rem' }}>
                Debes tener al menos un recuerdo en el libro para poder exportar.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDownloadPage;
