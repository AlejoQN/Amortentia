const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../config.json');

// Configuración por defecto
const defaultConfig = {
  book_title: 'Libro de Recuerdos',
  book_subtitle: 'Una colección de momentos y palabras de las personas que más te quieren.',
  is_accepting_entries: true
};

// Asegurar que el archivo exista
if (!fs.existsSync(configPath)) {
  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
}

const settingsController = {
  getSettings: (req, res) => {
    try {
      if (!fs.existsSync(configPath)) {
        return res.json(defaultConfig);
      }
      const configData = fs.readFileSync(configPath, 'utf8');
      res.json(JSON.parse(configData));
    } catch (error) {
      console.error('Error leyendo config:', error);
      res.status(500).json({ message: 'Error al obtener la configuración' });
    }
  },

  updateSettings: (req, res) => {
    try {
      const newSettings = req.body;
      
      // Leer config actual
      let currentConfig = defaultConfig;
      if (fs.existsSync(configPath)) {
        currentConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      }
      
      // Actualizar con nuevos valores
      const updatedConfig = { ...currentConfig, ...newSettings };
      
      // Guardar
      fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2));
      
      res.json({ message: 'Configuración guardada exitosamente', config: updatedConfig });
    } catch (error) {
      console.error('Error guardando config:', error);
      res.status(500).json({ message: 'Error al guardar la configuración' });
    }
  }
};

module.exports = settingsController;
