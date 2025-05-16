const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller'); // Importamos el controlador de usuarios
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');
const ROLES = require('../utils/constants');
const errorHandler = require('../middlewares/error.middleware');


// Define las rutas sin repetir "/users"
router.post('/users/create', userController.createUser);
router.put('/users/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.updateUser);
router.get('/users/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.getUserById); 
router.get('/users', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByAdministradorId);
router.delete('/users/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.deleteUser);
router.get('/users/rol/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByRolId);

router.use(errorHandler);// Manejo de errores

//Exportamos router
module.exports = router;