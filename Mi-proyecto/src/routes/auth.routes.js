// Importamos la biblioteca Express para crear rutas
const express = require('express');
const router = express.Router(); // Creamos una instancia de router para definir rutas
const authController = require('../controllers/auth.controller'); // Importamos el controlador de autenticación
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware'); // Middlewares que se utilizan para autenticar tokens y para verificar los roles de los usuarios
const ROLES = require('../utils/constants');


// Ruta POST para iniciar sesión
// se define la ruta POST para poder probar enviando informacion, en este caso email y contraseña
router.post('/auth/login', authenticateToken, checkRole([ROLES.ADMIN]), authController.login);

// Exportamos el router para que se puedan utilizar las rutas  que se definió
module.exports = router;