const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');

// Ruta para descargar todo el contenido
router.get('/zip', downloadController.exportAll);

module.exports = router;
