// Importación del servicio de usuarios
const userService = require('../services/user.service'); // Servicio que contiene la lógica para manejar usuarios

// Controlador para crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        // Extrae los campos necesarios del cuerpo de la solicitud
        const { nombre, email, password, rol_id, administrador_id } = req.body;
        // Validación: verifica que los campos obligatorios estén presentes
        if (!nombre || !email || !password || !rol_id) {
            return res.status(400).json({ message: 'Faltan datos requeridos' }); // Respuesta de error si faltan datos
        }
        // Crea un nuevo usuario utilizando el servicio de usuarios
        const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id);
        // Respuesta exitosa con los datos del nuevo usuario
        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
    } catch (error) {
        // Manejo de errores: devuelve el mensaje de error del servidor
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        // Obtiene la lista de todos los usuarios utilizando el servicio de usuarios
        const users = await userService.getAllUsers();
        // Respuesta exitosa con la lista de usuarios
        res.status(200).json(users);
    } catch (error) {
        // Manejo de errores: devuelve el mensaje de error del servidor
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener un usuario por su ID
const getUserById = async (req, res) => {
    try {
        // Extrae el ID del usuario desde los parámetros de la URL
        const userId = req.params.id;
        // Busca el usuario por ID utilizando el servicio de usuarios
        const user = await userService.getUserById(userId);
        // Validación: verifica si el usuario existe
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' }); // Respuesta de error si no se encuentra
        }
        // Respuesta exitosa con los datos del usuario
        res.status(200).json(user);
    } catch (error) {
        // Manejo de errores: devuelve el mensaje de error del servidor
        res.status(500).json({ message: error.message });
    }
};

// Controlador para actualizar un usuario
const updateUser = async (req, res) => {
    try {
        // Extrae el ID del usuario desde los parámetros de la URL
        const userId = req.params.id;
        // Extrae los campos a actualizar del cuerpo de la solicitud
        const { nombre, email, password, rol_id, administrador_id } = req.body;
        // Actualiza el usuario utilizando el servicio de usuarios
        const updatedUser = await userService.updateUser(userId, nombre, email, password, rol_id, administrador_id);
        // Validación: verifica si el usuario existe
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' }); // Respuesta de error si no se encuentra
        }
        // Respuesta exitosa con los datos del usuario actualizado
        res.status(200).json({ message: 'Usuario actualizado con éxito', user: updatedUser });
    } catch (error) {
        // Manejo de errores: devuelve el mensaje de error del servidor
        res.status(500).json({ message: error.message });
    }
};

// Controlador para eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        // Extrae el ID del usuario desde los parámetros de la URL
        const userId = req.params.id;
        // Elimina el usuario utilizando el servicio de usuarios
        const deletedUser = await userService.deleteUser(userId);
        // Validación: verifica si el usuario existe
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' }); // Respuesta de error si no se encuentra
        }
        // Respuesta exitosa confirmando la eliminación
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        // Manejo de errores: devuelve el mensaje de error del servidor
        res.status(500).json({ message: error.message });
    }
};

// Exporta los controladores para su uso en otros módulos
module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};