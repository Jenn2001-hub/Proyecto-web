const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// Define las rutas sin repetir "/users"
router.post('/', authenticateToken, userController.createUser);      // POST /api/users
router.get('/', authenticateToken, userController.getAllUsers);      // GET /api/users
router.get('/:id', authenticateToken, userController.getUserById);   // GET /api/users/:id
router.put('/:id', authenticateToken, userController.updateUser);    // PUT /api/users/:id
router.delete('/:id', authenticateToken, userController.deleteUser); // DELETE /api/users/:id

module.exports = router;