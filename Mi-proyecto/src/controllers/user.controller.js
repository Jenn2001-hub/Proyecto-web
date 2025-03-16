const userService = require('../services/user.service'); // Importa el servicio de usuarios

// Función para crear un usuario
exports.createUser = async (req, res) => {
    try {
        const { nombre, email, password, rol_id, administrador_id } = req.body; // Obtiene datos del cuerpo de la solicitud
        const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id); // Llama al servicio para crear el usuario
        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser }); // Respuesta exitosa con el nuevo usuario
    } catch (err) {
        res.status(500).json({ message: err.message }); // Manejo de errores
    }
};

