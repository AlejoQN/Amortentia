const express = require('express');
const router = express.Router();
const entriesController = require('../controllers/entriesController');
const upload = require('../middleware/upload');

// Rutas Públicas
router.get('/', entriesController.getVisibleEntries);
router.post('/', upload.single('photo'), entriesController.createEntry);

// Rutas Admin
router.get('/all', entriesController.getAllEntries);
router.delete('/:id', entriesController.deleteEntry);

// NOTA: Para producción, las rutas de admin deberían tener middleware de autenticación

module.exports = router;
