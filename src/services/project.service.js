// Importación de modelos
const Project = require('../models/project.model'); // Modelo para interactuar con la tabla de proyectos
const User = require('../models/user.models'); // Modelo para interactuar con la tabla de usuarios
const UserProject = require('../models/userProject.model'); // Modelo para la tabla de relación usuario-proyecto

// Función para crear un nuevo proyecto
exports.createProject = async (nombre, descripcion, administrador_id) => {
    try {
        // Crea un nuevo proyecto en la base de datos con los datos proporcionados
        const newProject = await Project.create({
            nombre,
            descripcion,
            administrador_id
        });
        // Retorna el proyecto creado
        return newProject;
    } catch (err) {
        // Lanza un error con el mensaje correspondiente si falla la creación
        throw new Error(`Error al crear el proyecto: ${err.message}`);
    }
};

// Función para obtener todos los proyectos
exports.getAllProjects = async () => {
    try {
        // Obtiene todos los proyectos, incluyendo datos del administrador asociado
        return await Project.findAll({
            include: [{ model: User, as: 'administrador', attributes: ['id', 'nombre', 'email'] }]
        });
    } catch (err) {
        // Lanza un error con el mensaje correspondiente si falla la obtención
        throw new Error(`Error al obtener los proyectos: ${err.message}`);
    }
};

// Función para obtener un proyecto por su ID
exports.getProjectById = async (id) => {
    try {
        // Busca un proyecto por su ID, incluyendo administrador y usuarios asignados
        return await Project.findByPk(id, {
            include: [
                { model: User, as: 'administrador', attributes: ['id', 'nombre', 'email'] },
                { model: User, as: 'usuarios', attributes: ['id', 'nombre', 'email'] }
            ]
        });
    } catch (err) {
        // Lanza un error con el mensaje correspondiente si falla la obtención
        throw new Error(`Error al obtener el proyecto: ${err.message}`);
    }
};

// Función para actualizar un proyecto
exports.updateProject = async (id, nombre, descripcion) => {
    try {
        // Busca el proyecto por su ID
        const project = await Project.findByPk(id);
        // Validación: verifica si el proyecto existe
        if (!project) {
            return null; // Retorna null si no se encuentra el proyecto
        }
        // Actualiza los campos proporcionados (si existen)
        if (nombre) project.nombre = nombre;
        if (descripcion) project.descripcion = descripcion;
        // Guarda los cambios en la base de datos
        await project.save();
        // Retorna el proyecto actualizado
        return project;
    } catch (err) {
        // Lanza un error con el mensaje correspondiente si falla la actualización
        throw new Error(`Error al actualizar el proyecto: ${err.message}`);
    }
};

// Función para eliminar un proyecto
exports.deleteProject = async (id) => {
    try {
        // Busca el proyecto por su ID
        const project = await Project.findByPk(id);
        // Validación: verifica si el proyecto existe
        if (!project) {
            return null; // Retorna null si no se encuentra el proyecto
        }
        // Elimina el proyecto de la base de datos
        await project.destroy();
        // Retorna true para indicar que la eliminación fue exitosa
        return true;
    } catch (err) {
        // Lanza un error con el mensaje correspondiente si falla la eliminación
        throw new Error(`Error al eliminar el proyecto: ${err.message}`);
    }
};

// Función para asignar usuarios a un proyecto
exports.assignUsersToProject = async (projectId, userIds) => {
    try {
        // Busca el proyecto por su ID
        const project = await Project.findByPk(projectId);
        // Validación: verifica si el proyecto existe
        if (!project) {
            throw new Error('Proyecto no encontrado'); // Lanza error si no se encuentra el proyecto
        }
        // Crea las relaciones usuario-proyecto en la tabla UserProject
        await UserProject.bulkCreate(userIds.map(userId => ({ usuario_id: userId, proyecto_id: projectId })));
        // Retorna el proyecto con los usuarios asignados actualizados
        return await Project.findByPk(projectId, {
            include: [{ model: User, as: 'usuarios', attributes: ['id', 'nombre', 'email'] }]
        });
    } catch (err) {
        // Lanza un error con el mensaje correspondiente si falla la asignación
        throw new Error(`Error al asignar usuarios al proyecto: ${err.message}`);
    }
};

// Función para eliminar un usuario de un proyecto
exports.removeUserFromProject = async (projectId, userId) => {
    try {
        // Busca el proyecto por su ID
        const project = await Project.findByPk(projectId);
        // Validación: verifica si el proyecto existe
        if (!project) {
            throw new Error('Proyecto no encontrado'); // Lanza error si no se encuentra el proyecto
        }
        // Elimina la relación usuario-proyecto de la tabla UserProject
        await UserProject.destroy({ where: { usuario_id: userId, proyecto_id: projectId } });
        // Retorna el proyecto con los usuarios actualizados
        return await Project.findByPk(projectId, {
            include: [{ model: User, as: 'usuarios', attributes: ['id', 'nombre', 'email'] }]
        });
    } catch (err) {
        // Lanza un error con el mensaje correspondiente si falla la eliminación
        throw new Error(`Error al eliminar usuario del proyecto: ${err.message}`);
    }
};