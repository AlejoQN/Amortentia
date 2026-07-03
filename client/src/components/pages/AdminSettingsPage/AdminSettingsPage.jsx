import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiSave, FiSettings, FiType, FiMessageSquare, FiToggleRight } from 'react-icons/fi';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import Loader from '../../atoms/Loader/Loader';
import FormField from '../../molecules/FormField/FormField';
import { settingsService } from '../../../services/api';
import './AdminSettingsPage.css';

const AdminSettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    book_title: '',
    book_subtitle: '',
    is_accepting_entries: true
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingsService.getSettings();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast.error('Error al cargar la configuración');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await settingsService.updateSettings(settings);
      toast.success('Configuración guardada exitosamente', { icon: '⚙️' });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-settings-page">
      <div className="admin-page-header">
        <div>
          <h1 className="font-heading">Configuración</h1>
          <p className="text-secondary">Personaliza la apariencia y el comportamiento del libro</p>
        </div>
      </div>

      {loading ? (
        <div className="admin-loading"><Loader /></div>
      ) : (
        <div className="settings-content">
          <form className="settings-form glass-panel" onSubmit={handleSubmit}>
            <div className="settings-section">
              <h3 className="settings-section-title">
                <Icon icon={FiType} />
                Textos Principales
              </h3>
              
              <div className="settings-grid">
                <FormField 
                  label="Título del Libro (Aparece en la portada)" 
                  name="book_title"
                  value={settings.book_title}
                  onChange={handleChange}
                  placeholder="Ej. Para María"
                />
                
                <FormField 
                  type="textarea"
                  label="Subtítulo o Dedicatoria (Aparece en la primera página)" 
                  name="book_subtitle"
                  value={settings.book_subtitle}
                  onChange={handleChange}
                  placeholder="Escribe algo bonito..."
                  rows={3}
                />
              </div>
            </div>

            <div className="settings-section">
              <h3 className="settings-section-title">
                <Icon icon={FiSettings} />
                Comportamiento
              </h3>
              
              <div className="toggle-container">
                <label className="toggle-label">
                  <div className="toggle-text">
                    <strong>Recibir nuevos mensajes</strong>
                    <span>Si lo apagas, el formulario público se ocultará y nadie más podrá agregar recuerdos. Útil cuando ya vayas a imprimir el libro.</span>
                  </div>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      name="is_accepting_entries"
                      checked={settings.is_accepting_entries}
                      onChange={handleChange}
                    />
                    <span className="slider"></span>
                  </div>
                </label>
              </div>
            </div>

            <div className="settings-footer">
              <Button 
                type="submit" 
                variant="primary" 
                loading={saving}
                icon={<Icon icon={FiSave} />}
              >
                Guardar Cambios
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminSettingsPage;
