const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// Define las rutas sin repetir "/projects"
router.post('/create', authenticateToken, projectController.createProject); // POST /api/projects
router.get('/', authenticateToken, projectController.getAllProjects);  // GET /api/projects
router.get(':id', authenticateToken, projectController.getProjectById);  // GET /api/projects/:id
router.put('/update/:id', authenticateToken, projectController.updateProject); // PUT /api/projects/:id
router.delete('/delete/:id', authenticateToken, projectController.deleteProject); // DELETE /api/projects/:id

router.post('/associate', authenticateToken, projectController.assingUsersToProject); // POST /api/projects/:id/users
router.delete('/disassociate', authenticateToken, projectController.removeUserFromProject); // DELETE /api/projects/:id/users/:userId

//Exportamos el router para usar las rutas definidas
module.exports = router;