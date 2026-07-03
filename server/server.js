require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Permite peticiones desde el frontend (localhost:5173)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (imágenes subidas)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
const entriesRoutes = require('./routes/entries');
const settingsRoutes = require('./routes/settings');
const downloadRoutes = require('./routes/download');

app.use('/api/entries', entriesRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/download', downloadRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
