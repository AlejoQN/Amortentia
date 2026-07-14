const { ZipArchive } = require('archiver');
const pool = require('../config/db');
const axios = require('axios');

const downloadController = {
  exportAll: async (req, res) => {
    try {
      res.attachment('libro-recuerdos-fotos.zip');
      
      const archive = new ZipArchive({
        zlib: { level: 9 }
      });

      archive.on('error', (err) => {
        console.error('Archive error:', err);
        if (!res.headersSent) {
          res.status(500).json({ message: 'Error generando ZIP' });
        }
      });

      archive.pipe(res);

      // Obtener todas las fotos de la DB
      const [entries] = await pool.query('SELECT photo_url FROM entries WHERE photo_url IS NOT NULL');
      
      // Descargar cada foto y añadirla al zip
      for (let i = 0; i < entries.length; i++) {
        try {
          const imageUrl = entries[i].photo_url;
          const response = await axios({
            method: 'get',
            url: imageUrl,
            responseType: 'arraybuffer'
          });
          
          // Extraer la extensión de la URL o usar jpg por defecto
          let ext = imageUrl.split('.').pop().split('?')[0];
          if (!ext || ext.length > 5 || ext.includes('/')) ext = 'jpg';
          const filename = `fotos/foto_${i + 1}.${ext}`;
          
          archive.append(Buffer.from(response.data), { name: filename });
        } catch (err) {
          console.error(`Error descargando imagen ${entries[i]?.photo_url}:`, err.message);
          // Continúa con la siguiente si una falla
        }
      }

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
