const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// Define las rutas sin repetir "/projects"
router.post('/project/create', authenticateToken, projectController.createProject); // POST /api/projects
router.get('/project', authenticateToken, projectController.getAllProjects);  // GET /api/projects
router.get('/project/:id', authenticateToken, projectController.getProjectById);  // GET /api/projects/:id
router.put('/project/update/:id', authenticateToken, projectController.updateProject); // PUT /api/projects/:id
router.delete('/project/delete/:id', authenticateToken, projectController.deleteProject); // DELETE /api/projects/:id

router.post('/project/associate', authenticateToken, projectController.assingUsersToProject); // POST /api/projects/:id/users
router.delete('/project/disassociate', authenticateToken, projectController.removeUserFromProject); // DELETE /api/projects/:id/users/:userId

//Exportamos el router para usar las rutas definidas
module.exports = router;