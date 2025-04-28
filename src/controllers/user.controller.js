// Importación del servicio de usuarios
const userService = require('../services/user.service'); // Servicio que contiene la lógica para manejar usuarios

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        // Se extrae los datos de la solicitud para el nuevo usuario
        const { nombre, email, password, rol_id, administrador_id } = req.body;
        // Crea un nuevo usuario
        const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id);
        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
    } catch (error) {
        // Manejo de errores: devuelve el mensaje de error del servidor
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener todos los usuarios
exports.getAllUsersByAdministradorId = async (req, res) => {
    try {
        const admin_from_token = req.user.id; // Se extrae el id del administrador del token de autenticación
        const users = await userService.getAllUsersByAdministradorId(admin_from_token, email);
        res.status(200).json( users );
    } catch (error) {
        // Manejo de errores: devuelve el mensaje de error del servidor
        res.status(500).json({ message: error.message });
    }
};

//  Controlador para obtener a los usuarios asociados a un rol
exports.getAllUsersByRolId = async (req, res) => {
    try {
        const users = await userService.getAllUsersByRolId(req.params.id);
        res.status(200).json( users );
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Controlador para actualizar un usuario
exports.updateUser = async (req, res) => {
        const id = req.params;
        const { nombre, email, rol_id, administrador_id } = req.body;
        const admin_from_token = req.user.id;
    try {
        const user = await userService.updateUser(id, nombre, email, rol_id, administrador_id, admin_from_token);
        res.status(200).json({ message: 'Usuario actualizado con éxito', user: updatedUser });
    } catch (error) {
        // Manejo de errores: devuelve el mensaje de error del servidor
        res.status(500).json({ message: error.message });
    }
};

// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const admin_from_token = req.user.id;
    try {
        const result = await userService.deleteUser(id, admin_from_token);
        res.status(200).json(result);
    } catch (err) {
        // Manejo de errores: devuelve el mensaje de error del servidor
        res.status(500).json({ message: error.message });
    }
};