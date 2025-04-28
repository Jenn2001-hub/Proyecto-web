// Importa el servicio de proyectos
const projectService = require('../services/project.service');

// Controlador para crear un nuevo proyecto
exports.createProject = async (req, res) => {
    try {
        const { nombre, descripcion, administrador_id } = req.body;
        const newProject = await projectService.createProject(nombre, descripcion, administrador_id);
        res.status(201).json({message: 'Proyecto creado con exito', newProject});
    } catch (error) {
        // En caso de error, responde con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener todos los proyectos
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();
        res.status(200).json(projects);
    } catch (error) {
        // En caso de error, responde con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener un proyecto por su ID
exports.getProjectById = async (req, res) => {
    try {
        const id = req.params.id;
        const {nombre, descripcion, administrador_id}= req.body;
        const project = await projectService.updateProject(id, nombre, descripcion, administrador_id);
        return res.status(200).json({ message: 'Proyecto actualizado con exito', project });
    } catch (error) {
        // En caso de error, responde con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para actualizar un proyecto
exports.updateProject = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, descripcion, administrador_id } = req.body;
        const project = await projectService.updateProject(id, nombre, descripcion, administrador_id);
        res.status(200).json({ message: 'Proyecto actualizado con éxito', project });
    } catch (error) {
        // En caso de error, responde con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para eliminar un proyecto
exports.deleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await projectService.deleteProject(id);
        res.status(200).json({ message: 'Proyecto eliminado', deleted });
    } catch (error) {
        // En caso de error, responde con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para asignar usuarios a un proyecto
exports.assingUsersToProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const { userIds } = req.body;
        const updatedProject = await projectService.assingUsersToProject(projectId, userIds);
        res.status(200).json({message: 'Usuario asignado correctamente al proyecto', updatedProject});
    } catch (error) {
        // En caso de error, responde con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para remover un usuario de un proyecto
exports.removeUserFromProject = async (req, res) => {
    try {
        const { id: projectId, userId } = req.params;
        const updatedProject = await projectService.removeUserFromProject(projectId, userId);
        res.status(200).json({message: 'Usuario eliminado', updatedProject});
    } catch (error) {
        // En caso de error, responde con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
    }
};