// Importa el servicio de proyectos
const projectService = require('../services/project.service');

// Controlador para crear un nuevo proyecto
const createProject = async (req, res) => {
    try {
        // Extrae nombre, descripción y administrador_id del cuerpo de la solicitud
        const { nombre, descripcion, administrador_id } = req.body;
        // Crea el proyecto usando el servicio de proyectos
        const newProject = await projectService.createProject(nombre, descripcion, administrador_id);
        // Responde con código 201 y los detalles del nuevo proyecto
        res.status(201).json(newProject);
    } catch (error) {
        // En caso de error, responde con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener todos los proyectos
const getAllProjects = async (req, res) => {
    try {
        // Obtiene todos los proyectos usando el servicio
        const projects = await projectService.getAllProjects();
        // Responde con código 200 y la lista de proyectos
        res.status(200).json(projects);
    } catch (error) {
        // En caso de error, responde con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener un proyecto por su ID
const getProjectById = async (req, res) => {
    try {
        // Extrae el ID del proyecto de los parámetros de la solicitud
        const projectId = req.params.id;
        // Busca el proyecto usando el servicio
        const project = await projectService.getProjectById(projectId);
        // Si no se encuentra, responde con código 404
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        // Responde con código 200 y los detalles del proyecto
        res.status(200).json(project);
    } catch (error) {
        // En caso de error, responde con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para actualizar un proyecto
const updateProject = async (req, res) => {
    try {
        // Extrae el ID del proyecto de los parámetros y los datos a actualizar del cuerpo
        const projectId = req.params.id;
        const { nombre, descripcion } = req.body;
        // Actualiza el proyecto usando el servicio
        const updatedProject = await projectService.updateProject(projectId, nombre, descripcion);
        // Si no se encuentra, responde con código 404
        if (!updatedProject) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        // Responde con código 200 y los detalles del proyecto actualizado
        res.status(200).json(updatedProject);
    } catch (error) {
        // En caso de error, responde con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para eliminar un proyecto
const deleteProject = async (req, res) => {
    try {
        // Extrae el ID del proyecto de los parámetros
        const projectId = req.params.id;
        // Elimina el proyecto usando el servicio
        const deleted = await projectService.deleteProject(projectId);
        // Si no se encuentra, responde con código 404
        if (!deleted) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        // Responde con código 200 y un mensaje de confirmación
        res.status(200).json({ message: 'Proyecto eliminado' });
    } catch (error) {
        // En caso de error, responde con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para asignar usuarios a un proyecto
const assignUsersToProject = async (req, res) => {
    try {
        // Extrae el ID del proyecto de los parámetros y los IDs de usuarios del cuerpo
        const projectId = req.params.id;
        const { userIds } = req.body;
        // Asigna los usuarios al proyecto usando el servicio
        const updatedProject = await projectService.assignUsersToProject(projectId, userIds);
        // Responde con código 200 y los detalles del proyecto actualizado
        res.status(200).json(updatedProject);
    } catch (error) {
        // En caso de error, responde con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Controlador para remover un usuario de un proyecto
const removeUserFromProject = async (req, res) => {
    try {
        // Extrae el ID del proyecto y el ID del usuario de los parámetros
        const { id: projectId, userId } = req.params;
        // Remueve al usuario del proyecto usando el servicio
        const updatedProject = await projectService.removeUserFromProject(projectId, userId);
        // Responde con código 200 y los detalles del proyecto actualizado
        res.status(200).json(updatedProject);
    } catch (error) {
        // En caso de error, responde con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Exporta todos los controladores como un módulo
module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    assignUsersToProject,
    removeUserFromProject,
};