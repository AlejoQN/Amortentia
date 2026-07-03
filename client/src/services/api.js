import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const entriesService = {
  // Obtener entradas para el libro público
  getVisibleEntries: async () => {
    const response = await api.get('/entries');
    return response.data;
  },

  // Obtener todas las entradas (admin)
  getAllEntries: async () => {
    const response = await api.get('/entries/all');
    return response.data;
  },

  // Crear nueva entrada (con imagen)
  createEntry: async (formData) => {
    // Cuando enviamos archivos, usamos FormData
    const data = new FormData();
    data.append('author_name', formData.author_name);
    data.append('relationship', formData.relationship);
    data.append('message', formData.message);
    data.append('photo', formData.photo);

    const response = await api.post('/entries', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Eliminar entrada
  deleteEntry: async (id) => {
    const response = await api.delete(`/entries/${id}`);
    return response.data;
  }
};

export const settingsService = {
  getSettings: async () => {
    const response = await api.get('/settings');
    return response.data;
  },
  
  updateSettings: async (settingsData) => {
    const response = await api.post('/settings', settingsData);
    return response.data;
  }
};

export const downloadService = {
  exportZip: () => {
    // Al abrir esta URL directamente en el navegador, se inicia la descarga del archivo ZIP
    window.open(`${API_URL}/download/zip`, '_blank');
  }
};

export default api;
