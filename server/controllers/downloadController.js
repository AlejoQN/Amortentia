const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

const downloadController = {
  exportAll: async (req, res) => {
    try {
      // 1. Configurar la cabecera de la respuesta para forzar descarga
      res.attachment('libro-recuerdos-fotos.zip');
      
      // 2. Crear el archivo ZIP usando archiver
      const archive = archiver('zip', {
        zlib: { level: 9 } // Nivel de compresión máximo
      });

      // Si hay error en el archiver, cerrar y enviar status
      archive.on('error', (err) => {
        throw err;
      });

      // Conectar el stream de salida del archivo zip a la respuesta HTTP
      archive.pipe(res);

      // 3. Añadir todas las imágenes de la carpeta uploads al zip
      const uploadDir = path.join(__dirname, '../uploads');
      if (fs.existsSync(uploadDir)) {
        // Esto añade todo el directorio 'uploads' dentro del zip en una carpeta 'fotos'
        archive.directory(uploadDir, 'fotos');
      }

      // 4. Finalizar y cerrar el stream
      await archive.finalize();

    } catch (error) {
      console.error('Error generando ZIP:', error);
      if (!res.headersSent) {
        res.status(500).json({ message: 'Error al generar el archivo de exportación' });
      }
    }
  }
};

module.exports = downloadController;
