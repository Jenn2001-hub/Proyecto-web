const Project = require('../models/project.model');
const User = require('../models/user.model');

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
    const project = await Project.findByPk(data.projectId);
    if (!project) throw new Error('Proyecto no encontrado');
    
    const users = await User.findAll({ where: { id: data.userIds }});
    if (users.length !== data.userIds.length) throw new Error('Algunos usuarios no fueron encontrados');

    await project.addUsuarios(users);
    return await project.reload({
        include: [
            {
                model: User,
                as: 'usuarios',
                attributes: ['id', 'nombre', 'email'],
                through: { attributes: [] }
            }
        ],
    });
};

// Se exporta el servicio para desasociar usuarios de un proyecto mediante IDs
exports.removeUserFromProject = async (data) => {
    const project = await Project.findByPk(data.projectId);
    if (!project) 
        throw new Error('Proyecto no encontrado'); // Verifica que el proyecto exista

    const user = await User.findByPk(data.userId);
    if (!user) 
        throw new Error('Usuario no encontrado'); // Verifica que usuario exista

    await project.removeUsuario(user); // Mediante el "removeUsuario" lo desasocia
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