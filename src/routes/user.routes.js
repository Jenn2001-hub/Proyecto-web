const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller'); // Importamos el controlador de usuarios
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');
const errorHandler = require('../middlewares/error.middleware');


// Define las rutas sin repetir "/users"
router.post('/users/create', userController.createUser); // POST /api/users
router.get('/users', authenticateToken, userController.getAllUsersByAdministradorId); // GET /api/users
router.get('/users/rol/:id', authenticateToken, userController.getAllUsersByRolId); // GET /api/users/:id
router.put('/users/update/:id', authenticateToken, userController.updateUser); // PUT /api/users/:id
router.delete('/users/delete/:id', authenticateToken, userController.deleteUser); // DELETE /api/users/:id

router.use(errorHandler);// Manejo de errores

//Exportamos router
module.exports = router;