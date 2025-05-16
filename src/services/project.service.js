const Project = require('../models/project.model'); // Modelo para interactuar con la tabla de proyectos
const User = require('../models/user.model'); // Modelo para interactuar con la tabla de usuarios

// Función para crear un nuevo proyecto
exports.createProject = async (nombre, descripcion) => {
    try {
        // Crea un nuevo proyecto en la base de datos con los datos proporcionados
        const newProject = await Project.create({
            nombre,
            descripcion,
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
        const project = await Project.findAll({
            include: [{model: User, as: 'administrador', attributes: ['id', 'nombre', 'email']},
                {model: User, as: 'usuarios', attributes: ['id', 'nombre', 'email'], through: { attributes: [] }}
            ]
        });
        return project;
    } catch (err) {
        throw new Error(`Error al obtener los proyectos: ${err.message}`);
    }
};

// Función para obtener un proyecto por su ID
exports.getProjectById = async (id) => {
    try {
        const project = await Project.findByPk(id); // Buscamos el proyecto por ID
        if (!project) {
            throw new Error('Proyecto no encontrado'); // Si no existe, lanzamos error
        }
        return project; // Devolvemos el proyecto encontrado
    } catch (err) {
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
            throw new Error('Poryecto no encontrado');
        }
        // Actualiza el proyecto
        await project.update({ nombre, descripcion, administrador_id});

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
            throw new Error('Proyecto no encontrado');
        }
        // Elimina el proyecto de la base de datos
        await project.destroy();
        // Indica que la eliminación fue exitosa
        return { message: 'Proyecto eliminado con éxito' };
    } catch (err) {
        // Lanza un error con el mensaje correspondiente si falla la eliminación
        throw new Error(`Error al eliminar el proyecto: ${err.message}`);
    }
};

// Función para asignar usuarios a un proyecto
exports.assingUsersToProject = async (data) => {
    const project = await Project.findByPk(data.projectId);
    if (!project) throw new Error('Proyecto no encontrado');
    
    const users = await User.findAll({ where: { id: data.userIds }});
    if (users.length !== data.userIds.length) throw new Error('Algunos usuarios no fueron encontrados');

    await project.addUsuarios(users);
    return await project.findByPk(data.project, {
        include: [{model: User, as: 'usuarios', attributes: ['id', 'nombre', 'email'], through: { attributes: [] }}]
    });
};

// Función para eliminar un usuario de un proyecto
exports.removeUserFromProject = async (data) => {
    const project = await Project.findByPk(data.projectId);
    if (!project) 
        throw new Error('Proyecto no encontrado'); // Verifica que el proyecto exista

    const user = await User.findByPk(data.userId);
    if (!user) 
        throw new Error('Usuario no encontrado'); // Verifica que usuario exista

    await project.removeUsuario(user); // Mediante el "removeUsuario" lo desasocia
};