import React, { useState } from 'react';
import { FiUser, FiHeart } from 'react-icons/fi';
import FormField from '../../molecules/FormField/FormField';
import FileUpload from '../../molecules/FileUpload/FileUpload';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import useFileUpload from '../../../hooks/useFileUpload';
import './AddEntryForm.css';

const AddEntryForm = ({ onSubmit, loading = false }) => {
  const fileHook = useFileUpload();
  
  const [formData, setFormData] = useState({
    author_name: '',
    relationship: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.author_name.trim()) newErrors.author_name = 'Por favor ingresa tu nombre';
    if (!formData.message.trim()) newErrors.message = 'El mensaje no puede estar vacío';
    if (!fileHook.file) fileHook.setError('Debes subir una foto');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && fileHook.file;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({
        ...formData,
        photo: fileHook.file
      });
    }
  };

  return (
    <form className="add-entry-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <FormField 
          label="Tu nombre" 
          name="author_name"
          placeholder="Ej. Carlos, Familia Gómez..." 
          value={formData.author_name}
          onChange={handleChange}
          error={errors.author_name}
          icon={<Icon icon={FiUser} />}
        />
        
        <FormField 
          label="Tu relación (opcional)" 
          name="relationship"
          placeholder="Ej. Mejor amigo, Hermano..." 
          value={formData.relationship}
          onChange={handleChange}
          error={errors.relationship}
          icon={<Icon icon={FiHeart} />}
        />
      </div>

      <FileUpload 
        fileHook={fileHook}
        error={fileHook.error}
      />

      <FormField 
        type="textarea"
        label="Tu mensaje especial" 
        name="message"
        placeholder="Escribe aquí ese mensaje que quieres dedicarle..." 
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        maxLength={500}
      />

      <div className="form-submit-container">
        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          loading={loading}
          className="submit-btn"
        >
          ✨ Agregar al Libro
        </Button>
      </div>
    </form>
  );
};

export default AddEntryForm;
