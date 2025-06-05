const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');
const ROLES = require('../utils/constants');
const errorHandler = require('../middlewares/error.middleware');

// Ruta para crear usuario (sin token)
router.post('/create', userController.createUser);

// Obtener usuarios por rol (ADMIN) — debe ir antes que '/:id'
router.get('/rol/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByRolId);

// Obtener todos los usuarios (restringido a ADMIN)
router.get('/', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByAdministradorId);

// Obtener usuario por id (ADMIN)
router.get('/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.getUserById);

// Actualizar usuario (ADMIN)
router.put('/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.updateUser);

// Borrar usuario (ADMIN)
router.delete('/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.deleteUser);

// Middleware de errores (debe ir al final)
router.use(errorHandler);

module.exports = router;