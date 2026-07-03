import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEdit3 } from 'react-icons/fi';
import BookCover from '../../organisms/BookCover/BookCover';
import ParticleEffect from '../../molecules/ParticleEffect/ParticleEffect';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import Loader from '../../atoms/Loader/Loader';
import { entriesService, settingsService } from '../../../services/api';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [settings, setSettings] = useState({ 
    book_title: 'Libro de Recuerdos', 
    book_subtitle: 'Cargando...',
    is_accepting_entries: true
  });
  const [loading, setLoading] = useState(true);

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
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="home-page">
      <ParticleEffect count={40} />
      
      <div className="home-content">
        <motion.div 
          className="home-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo o elemento decorativo superior */}
          <div className="home-logo">✧</div>
          <h1>{settings.book_title}</h1>
          <p>{settings.book_subtitle}</p>
        </motion.div>

        <motion.div 
          className="home-book-section"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <BookCover settings={settings} onClick={() => navigate('/book')} />
        </motion.div>

        <motion.div 
          className="home-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate('/book')}
            className="home-main-btn"
          >
            Abrir el Libro
          </Button>
          
          {settings.is_accepting_entries && (
            <Button 
              variant="secondary" 
              onClick={() => navigate('/add')}
              icon={<Icon icon={FiEdit3} />}
            >
              Agregar un Recuerdo
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
