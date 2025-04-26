const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// Define las rutas sin repetir "/projects"
router.post('/', authenticateToken, projectController.createProject);            // POST /api/projects
router.get('/', authenticateToken, projectController.getAllProjects);            // GET /api/projects
router.get('/:id', authenticateToken, projectController.getProjectById);         // GET /api/projects/:id
router.put('/:id', authenticateToken, projectController.updateProject);          // PUT /api/projects/:id
router.delete('/:id', authenticateToken, projectController.deleteProject);       // DELETE /api/projects/:id
router.post('/:id/users', authenticateToken, projectController.assignUsersToProject); // POST /api/projects/:id/users
router.delete('/:id/users/:userId', authenticateToken, projectController.removeUserFromProject); // DELETE /api/projects/:id/users/:userId

module.exports = router;