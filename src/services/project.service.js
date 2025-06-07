const Project = require('../models/project.model');
const User = require('../models/user.model');
const UserProject = require('../models/userProject.model');

// Se exporta el servicio para crear nuevos proyectos
exports.createProject = async (nombre, descripcion, administrador_id) => {
    try {
        const newProject = await Project.create({ // Crea al usuario con los datos dados
            nombre,
            descripcion,
            administrador_id
        });

        return newProject; // Devuelve al proyecto creado
    } catch (err) {
        throw new Error(`Error al crear el proyecto: ${err.message}`);
    }
};

// Se exporta el servicio para obtener todos los proyectos, con un administrador y sus usuarios asociados
exports.getAllProjects = async () => {
    try {
        const projects = await Project.findAll({
            include: [
                {
                    model: User,
                    as: 'administrador',
                    attributes: ['id', 'nombre', 'email']
                },
                {
                    model: User,
                    as: 'usuarios',
                    attributes: ['id', 'nombre', 'email'],
                    through: { attributes: [] }
                }
            ]
        });
        return projects;
    } catch (err) {
        throw new Error(`Error al obtener los proyectos: ${err.message}`);
    }
};

// Se exporta el servicio para obtener los proyectos por ID de usuario
exports.getProjectsByUserId = async (userId) => {
    try {
        const projectsAdmin = await Project.findAll({
            where: {
                administrador_id: userId // Filtra los proyectos donde el usuario es administrador del proyecto
            },
            include: [
                {
                    model: User,
                    as: 'administrador',
                    attributes: ['id', 'nombre', 'email']
                },
                {
                    model: User,
                    as: 'usuarios',
                    attributes: ['id', 'nombre', 'email'],
                    through: { attributes: [] }
                }
            ]
        });

        const projectsUser = await Project.findAll({
            include: [
                {
                    model: User,
                    as: 'administrador',
                    attributes: ['id', 'nombre', 'email']
                },
                {
                    model: User,
                    as: 'usuarios',
                    where: { id: userId }, // Filtra los proyectos donde el usuario está asociado
                    attributes: ['id', 'nombre', 'email'],
                    through: { attributes: [] }
                }
            ]
        });
        // Combina los proyectos donde el usuario es administrador y los proyectos donde el usuario esta asociado a dicho proyecto
        const projects = [...projectsAdmin, ...projectsUser];
        console.log(projects); // Agrega este console.log para ver qué proyectos se están obteniendo
        return projects;
    } catch (err) {
        throw new Error(`Error al obtener los proyectos: ${err.message}`);
    }
};

// Se exporta el servicio para obtener los proyectos por ID
exports.getProjectById = async (id) => {
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }
        return project;
    } catch (err) {
        throw new Error(`Error al obtener el proyecto: ${err.message}`);
    }
};


// Se exporta el sevicio para asociar usuarios a un proyecto mediante IDs
exports.assingUsersToProject = async (data) => {
    try {
        // Verificar que el proyecto exista y pertenezca al administrador
        const project = await Project.findOne({
            where: {
                id: data.proyecto_id,
                administrador_id: data.administrador_id
            }
        });
        
        if (!project) throw new Error('Proyecto no encontrado o no tienes permisos');
        
        // Verificar que el usuario existe
        const user = await User.findByPk(data.usuario_id);
        if (!user) throw new Error('Usuario no encontrado');
        
        // Asociar usuario al proyecto
        await project.addUsuario(user);
        
        return await project.reload({
            include: [
                {
                    model: User,
                    as: 'administrador',
                    attributes: ['id', 'nombre', 'email']
                },
                {
                    model: User,
                    as: 'usuarios',
                    attributes: ['id', 'nombre', 'email'],
                    through: { attributes: [] }
                }
            ]
        });
    } catch (err) {
        throw new Error(`Error al asignar usuario: ${err.message}`);
    }
};


// Se exporta el servicio para desasociar usuarios de un proyecto mediante IDs
exports.removeUserFromProject = async (data) => {
    try {
        // Validación de parámetros
        if (!data.proyecto_id || !data.usuario_id || !data.administrador_id) {
            throw new Error('Faltan parámetros requeridos');
        }

        // Verificar proyecto y permisos
        const project = await Project.findOne({
            where: {
                id: data.proyecto_id,
                administrador_id: data.administrador_id
            }
        });
        
        if (!project) {
            throw new Error('Proyecto no encontrado o no tienes permisos');
        }

        // Verificar usuario
        const user = await User.findByPk(data.usuario_id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Verificar asociación (forma más directa)
        const removed = await UserProject.destroy({
            where: {
                usuario_id: data.usuario_id,
                proyecto_id: data.proyecto_id
            }
        });

        if (removed === 0) {
            throw new Error('El usuario no estaba asociado a este proyecto');
        }
        
        return { 
            success: true,
            message: 'Usuario removido del proyecto exitosamente' 
        };
    } catch (err) {
        throw new Error(err.message);
    }
};

// Se exporta el servicio para actualizar los datos de un proyecto
exports.updateProject = async (id, nombre, descripcion, administrador_id) => {
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }

        await project.update({ // Actualiza el proyecto con los nuevo datos dados mediante el update
            nombre,
            descripcion,
            administrador_id,
        });

        return project; // Devuelve el objeto con las modificaciones
    } catch (err) {
        throw new Error(`Error al actualizar el proyecto: ${err.message}`);
    }
};


// Se exporta el servicio para eliminar un proyecto por id
exports.deleteProject = async (id) => {
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }
        
        await project.destroy();
        return { message: 'Proyecto eliminado con éxito' };
    } catch (err) {
        throw new Error(`Error al eliminar el proyecto: ${err.message}`);
    }
};