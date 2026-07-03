import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiDownload } from 'react-icons/fi';
import AdminEntriesGrid from '../../organisms/AdminEntriesGrid/AdminEntriesGrid';
import EntryModal from '../../organisms/EntryModal/EntryModal';
import Loader from '../../atoms/Loader/Loader';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import { entriesService } from '../../../services/api';
import './AdminPage.css';

const AdminPage = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEntries = async () => {
    try {
      const data = await entriesService.getAllEntries();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching entries:', error);
      toast.error('Error al cargar las entradas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este recuerdo? Esta acción no se puede deshacer.')) {
      try {
        await entriesService.deleteEntry(id);
        toast.success('Recuerdo eliminado');
        fetchEntries(); // Recargar la lista
      } catch (error) {
        toast.error('Error al eliminar');
      }
    }
  };

  const handleView = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEntry(null), 300); // Wait for animation
  };

  const handleDownload = () => {
    toast('La función de descarga estará disponible pronto.', { icon: '🚧' });
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="font-heading">Dashboard</h1>
          <p className="text-secondary">Gestiona los recuerdos de tu libro</p>
        </div>
        
        <div className="admin-actions">
          <Button 
            variant="primary" 
            onClick={handleDownload}
            icon={<Icon icon={FiDownload} />}
          >
            Descargar Todo
          </Button>
        </div>
      </div>

      <div className="admin-stats glass-panel">
        <div className="stat-card">
          <h3>Total Recuerdos</h3>
          <div className="stat-value text-gradient-gold">{entries.length}</div>
        </div>
      </div>

      <div className="admin-content">
        <h2 className="section-title">Entradas Recientes</h2>
        
        {loading ? (
          <div className="admin-loading">
            <Loader text="Cargando recuerdos..." />
          </div>
        ) : (
          <AdminEntriesGrid 
            entries={entries} 
            onDelete={handleDelete}
            onView={handleView}
          />
        )}
      </div>

      <EntryModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        entry={selectedEntry}
      />
    </div>
  );
};

export default AdminPage;
