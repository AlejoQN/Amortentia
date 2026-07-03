const pool = require('../config/db');

const entriesController = {
  // Obtener todas las entradas visibles (público)
  getVisibleEntries: async (req, res) => {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM entries WHERE is_visible = TRUE ORDER BY display_order ASC, created_at ASC'
      );
      
      // Transformar URLs de fotos
      const entries = rows.map(entry => ({
        ...entry,
        photoUrl: `/uploads/${entry.photo_filename}`
      }));
      
      res.json(entries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener entradas' });
    }
  },

  // Obtener TODAS las entradas (admin)
  getAllEntries: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM entries ORDER BY created_at DESC');
      
      const entries = rows.map(entry => ({
        ...entry,
        photoUrl: `/uploads/${entry.photo_filename}`
      }));
      
      res.json(entries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener todas las entradas' });
    }
  },

  // Crear nueva entrada
  createEntry: async (req, res) => {
    try {
      const { author_name, relationship, message } = req.body;
      
      if (!req.file) {
        return res.status(400).json({ message: 'La foto es requerida' });
      }

      const photo_filename = req.file.filename;
      const photo_original_name = req.file.originalname;

      const [result] = await pool.query(
        'INSERT INTO entries (author_name, relationship, message, photo_filename, photo_original_name) VALUES (?, ?, ?, ?, ?)',
        [author_name, relationship || 'Amigo/a', message, photo_filename, photo_original_name]
      );

      res.status(201).json({ 
        message: 'Entrada creada exitosamente',
        id: result.insertId 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear la entrada' });
    }
  },

  // Eliminar entrada (admin)
  deleteEntry: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Obtener el nombre del archivo para borrarlo del sistema
      const [rows] = await pool.query('SELECT photo_filename FROM entries WHERE id = ?', [id]);
      
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Entrada no encontrada' });
      }
      
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(__dirname, '../../uploads', rows[0].photo_filename);
      
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      await pool.query('DELETE FROM entries WHERE id = ?', [id]);
      
      res.json({ message: 'Entrada eliminada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar la entrada' });
    }
  }
};

module.exports = entriesController;
