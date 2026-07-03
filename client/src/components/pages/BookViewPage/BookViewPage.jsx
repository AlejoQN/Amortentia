import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiEdit3 } from 'react-icons/fi';
import Book from '../../organisms/Book/Book';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import ParticleEffect from '../../molecules/ParticleEffect/ParticleEffect';
import Loader from '../../atoms/Loader/Loader';
import { entriesService, settingsService } from '../../../services/api';
import './BookViewPage.css';

const BookViewPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [entriesData, settingsData] = await Promise.all([
          entriesService.getVisibleEntries(),
          settingsService.getSettings()
        ]);
        
        setEntries(entriesData);
        setSettings(settingsData);
      } catch (error) {
        console.error('Error cargando del backend:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="book-view-page">
      <ParticleEffect count={30} />
      
      {/* Navegación superior */}
      <div className="book-view-header glass-panel">
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => navigate('/')}
          icon={<Icon icon={FiArrowLeft} />}
        >
          Volver
        </Button>
        <div className="book-view-title font-display text-gradient-gold">
          Recuerdos
        </div>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => navigate('/add')}
          icon={<Icon icon={FiEdit3} />}
          className="add-memory-btn"
        >
          <span className="hide-mobile">Agregar </span>Recuerdo
        </Button>
      </div>

      <div className="book-view-content">
        {loading ? (
          <div className="book-loading">
            <Loader size="lg" text="Abriendo el libro..." />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="book-container-wrapper"
          >
            <Book entries={entries} settings={settings} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookViewPage;
