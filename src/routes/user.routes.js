const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller'); // Importamos el controlador de usuarios
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');
const ROLES = require('../utils/constants');
const errorHandler = require('../middlewares/error.middleware');


// Define las rutas sin repetir "/users"
router.post('/create', userController.createUser);
router.get('/', userController.getAllUsers);
router.put('/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.updateUser);
router.get('/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.getUserById); 
router.get('/', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByAdministradorId);
router.delete('delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.deleteUser);
router.get('/rol/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByRolId);

router.use(errorHandler);// Manejo de errores

//Exportamos router
module.exports = router;