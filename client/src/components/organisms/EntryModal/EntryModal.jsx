import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCalendar, FiUser, FiHeart } from 'react-icons/fi';
import Icon from '../../atoms/Icon/Icon';
import Badge from '../../atoms/Badge/Badge';
import './EntryModal.css';

const EntryModal = ({ isOpen, onClose, entry }) => {
  // Cerrar con la tecla Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !entry) return null;

  const date = new Date(entry.created_at).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div 
          className="modal-content glass-panel"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()} // Prevenir cierre al hacer clic dentro
        >
          <button className="modal-close-btn" onClick={onClose}>
            <Icon icon={FiX} size={24} />
          </button>

          <div className="modal-layout">
            <div className="modal-photo-section">
              {entry.photoUrl ? (
                <img 
                  src={entry.photoUrl} 
                  alt={`Foto de ${entry.author_name}`} 
                  className="modal-photo"
                />
              ) : (
                <div className="modal-no-photo">Sin foto</div>
              )}
            </div>

            <div className="modal-details-section">
              <div className="modal-header">
                <h2 className="font-display text-gradient-gold">{entry.author_name}</h2>
                <div className="modal-meta">
                  {entry.relationship && (
                    <Badge variant="gold">
                      <Icon icon={FiHeart} size={12} style={{ marginRight: '4px', paddingRight: '4px' }} />
                      {entry.relationship}
                    </Badge>
                  )}
                  <span className="modal-date">
                    <Icon icon={FiCalendar} size={12} style={{ marginRight: '4px' }} />
                    {date}
                  </span>
                </div>
              </div>

              <div className="modal-message-container">
                <p className="modal-message">{entry.message}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EntryModal;
