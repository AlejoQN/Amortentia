import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiEdit3 } from 'react-icons/fi';
import Book from '../../organisms/Book/Book';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import ParticleEffect from '../../molecules/ParticleEffect/ParticleEffect';
import Loader from '../../atoms/Loader/Loader';
import { entriesService } from '../../../services/api';
import './BookViewPage.css';

const mockEntries = [
  {
    id: 1,
    author_name: "María",
    relationship: "Mejor amiga",
    message: "¡Feliz aniversario! Qué hermoso es verlos crecer juntos. Eres una persona increíble y te mereces toda la felicidad del mundo. Recuerda siempre nuestros viajes locos y todas las aventuras que nos faltan por vivir.",
    photoUrl: "https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    author_name: "Tu hermano Carlos",
    relationship: "Hermano",
    message: "Siempre supe que encontrarías a alguien tan especial como tú. Me alegra mucho verte tan feliz. Aquí estaré siempre para ustedes, apoyándolos en cada paso que den. ¡Los quiero muchísimo!",
    photoUrl: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=1974&auto=format&fit=crop",
  }
];

const BookViewPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await entriesService.getVisibleEntries();
        // Construimos la URL completa para las imágenes si es necesario
        const formattedData = data.map(entry => ({
          ...entry,
          // Si photoUrl viene del backend (ej. /uploads/foto.jpg), le agregamos el host para React
          photoUrl: entry.photoUrl ? `http://localhost:5000${entry.photoUrl}` : entry.photoUrl
        }));
        setEntries(formattedData.length > 0 ? formattedData : mockEntries); // Fallback a mock si está vacío para la demo
      } catch (error) {
        console.error('Error cargando del backend. Usando datos de prueba:', error);
        setEntries(mockEntries);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEntries();
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
            <Book entries={entries} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookViewPage;
