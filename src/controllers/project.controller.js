// Importación del servicio que maneja las operaciones de proyectos en la base de datos
const projectService = require('../services/project.service');

// Controlador para crear un nuevo proyecto
exports.createProject = async (req, res) => {
    try {
        const { nombre, descripcion, administrador_id } = req.body; // Obtiene los datos del proyecto desde la solicitud
        const newProject = await projectService.createProject(nombre, descripcion, administrador_id); // Llama al servicio para crear el proyecto
        res.status(201).json({ message: 'Proyecto creado con éxito', newProject }); // Responde con el proyecto creado
    } catch (err) {
        res.status(500).json({ message: err.message }); // Devuelve un mensaje de error si algo falla
    }
};

// Controlador para obtener todos los proyectos almacenados en la base de datos
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects({
            attributes: ['id', 'nombre', 'descripcion', 'fecha_creacion'], // Define los atributos que se devolverán
            order: [['fecha_creacion', 'DESC']] // Ordena los proyectos por fecha de creación, de más reciente a más antiguo
        });

        res.status(200).json({
            success: true,
            count: projects.length, // Muestra cuántos proyectos se encontraron
            data: projects // Devuelve la lista de proyectos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener proyectos',
            error: error.message // Devuelve un mensaje de error si ocurre un problema
        });
    }
};

// Controlador para asignar usuarios a un proyecto
exports.assingUsersToProject = async (req, res) => {
    try {
        const { usuario_id, proyecto_id } = req.body;
        const administrador_id = req.user.id; // Obtener del token
        
        const data = {
            usuario_id,
            proyecto_id,
            administrador_id
        };
        
        const project = await projectService.assingUsersToProject(data);
        res.status(200).json({ 
            success: true,
            message: 'Usuario asignado al proyecto con éxito', 
            project 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: err.message 
        });
    }
};
// Controlador para eliminar un usuario de un proyecto
exports.removeUserFromProject = async (req, res) => {
    try {
        if (!req.body.usuario_id || !req.body.proyecto_id) {
            return res.status(400).json({
                success: false,
                message: 'Se requieren usuario_id y proyecto_id'
            });
        }

        const result = await projectService.removeUserFromProject({
            usuario_id: req.body.usuario_id,
            proyecto_id: req.body.proyecto_id,
            administrador_id: req.user.id
        });
        
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Controlador para obtener un proyecto por su ID
exports.getProjectsByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        const projects = await projectService.getProjectsByUserId(userId);
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: `Error al obtener los proyectos: ${err.message}` });
    }
};

// Controlador para actualizar un proyecto existente
exports.getProjectById = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await projectService.getProjectById(id);
        res.status(200).json({ message: 'Proyecto obtenido con éxito', project });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, descripcion, administrador_id } = req.body;
        const project = await projectService.updateProject(id, nombre, descripcion, administrador_id);
        res.status(200).json({ message: 'Proyecto actualizado con éxito', project });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controlador para eliminar un proyecto por su ID
exports.deleteProject = async (req, res) => {
    try {
        const id = req.params.id; // Obtiene el ID del proyecto desde la URL
        const result = await projectService.deleteProject(id); // Llama al servicio para eliminar el proyecto
        res.status(200).json(result); // Devuelve la confirmación de eliminación
    } catch (err) {
        res.status(500).json({ message: err.message }); // Devuelve un mensaje de error si algo falla
    }
};