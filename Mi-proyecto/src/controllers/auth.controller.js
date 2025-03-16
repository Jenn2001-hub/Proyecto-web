const authService = require('../services/auth.service'); // Importa el servicio de autenticación

// Función para iniciar sesión
exports.login = async (req, res) => {
    const { email, password } = req.body; // Obtiene email y contraseña del cuerpo de la solicitud
    try {
        const token = await authService.loginUser(email, password); // Llama al servicio para iniciar sesión
        res.status(200).json({ message: 'Inicio de sesión exitoso', token }); // Respuesta exitosa con el token
    } catch (err) {
        res.status(400).json({ message: err.message }); // Manejo de errores
    }
};