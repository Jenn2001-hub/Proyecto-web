const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const ROLES = require('../utils/constants');
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');

// Define las rutas sin repetir "/projects"
router.post('/projects/create', projectController.createProject); // Crea un nuevo proyecto, sin necesidad de token ni verificación de rol (actualmente está libre).
router.put('/projects/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.updateProject); 
router.get('/projects', authenticateToken, checkRole([ROLES.ADMIN]), projectController.getAllProjects); 
router.delete('/projects/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.deleteProject); 
router.get('/projects/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.getProjectById); 

router.post('/projects/associate', authenticateToken, checkRole([ROLES.ADMIN]), projectController.assingUsersToProject);
router.delete('/projects/disassociate', authenticateToken, checkRole([ROLES.ADMIN]), projectController.removeUserFromProject);

//Exportamos el router para usar las rutas definidas
module.exports = router;