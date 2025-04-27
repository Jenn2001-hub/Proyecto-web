// Importamos la biblioteca Express para crear rutas
const express = require('express');
const router = express.Router(); // Creamos una instancia de router para definir rutas
const authController = require('./controllers/auth.controller'); // Importamos el controlador de autenticación


// Ruta POST para iniciar sesión
// se define la ruta POST para poder probar enviando informacion, en este caso email y contraseña
router.post('/login', authController.login);
router.post('/register', authController.register);
// Exportamos el router para que se puedan utilizar las rutas  que se definió
module.exports = router;