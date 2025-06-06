const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { ROLES } = require('../utils/constants');
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');

// Ruta POST para crear un proyecto
router.post('/create', authenticateToken, checkRole([ROLES.ADMIN]), projectController.createProject);
router.put('/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.updateProject);
router.get('/', authenticateToken, checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getAllProjects);
router.delete('/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.deleteProject);
// router.get('/projects/user', authenticateToken, checkRole([ROLES.ADMIN]), projectController.getProjectById);
router.get('/:id', authenticateToken, checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getProjectsByUserId);

router.post('/associate', authenticateToken, checkRole([ROLES.ADMIN]), projectController.assingUsersToProject);
router.delete('/disassociate', authenticateToken, checkRole([ROLES.ADMIN]), projectController.removeUserFromProject);

// Exportamos el router para que se puedan utilizar las rutas que se hayan definido
module.exports = router;