const express = require('express'); // Importa Express
const router = express.Router(); // Crea un enrutador
const authController = require('../controllers/auth.controller'); // Importar controlador de autenticación

// Ruta para iniciar sesión
router.post('/auth/login', authController.login);

module.exports = router; // Exporta el enrutador