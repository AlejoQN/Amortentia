import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import ParticleEffect from '../../molecules/ParticleEffect/ParticleEffect';
import AddEntryForm from '../../organisms/AddEntryForm/AddEntryForm';
import { entriesService } from '../../../services/api';
import './AddEntryPage.css';

const AddEntryPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    
    try {
      // Intentar guardar en backend real
      await entriesService.createEntry(formData);
      
      setIsSuccess(true);
      toast.success('¡Recuerdo agregado al libro con éxito!', { icon: '✨' });
      
      setTimeout(() => {
        navigate('/book');
      }, 3000);
      
    } catch (error) {
      console.error('Error de API:', error);
      toast.error('Hubo un problema guardando tu foto. Revisa tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-entry-page">
      <ParticleEffect count={20} />
      
      <div className="add-entry-header">
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => navigate('/')}
          icon={<Icon icon={FiArrowLeft} />}
          disabled={loading || isSuccess}
        >
          Volver
        </Button>
      </div>

      <div className="add-entry-content">
        <motion.div 
          className="add-entry-card glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {!isSuccess ? (
            <>
              <div className="add-entry-title-container">
                <h2 className="font-display text-gradient-gold">Dejar un Recuerdo</h2>
                <p className="font-heading text-secondary">
                  Agrega una foto especial y un mensaje para el libro.
                </p>
              </div>
              
              <AddEntryForm 
                onSubmit={handleSubmit} 
                loading={loading} 
              />
            </>
          ) : (
            <motion.div 
              className="success-state"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="success-icon">✨</div>
              <h2 className="font-display text-gradient-gold">¡Gracias!</h2>
              <p className="font-heading">Tu recuerdo ha sido guardado en el libro.</p>
              <p className="text-secondary text-sm" style={{ marginTop: '1rem' }}>
                Redirigiendo al libro...
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AddEntryPage;
