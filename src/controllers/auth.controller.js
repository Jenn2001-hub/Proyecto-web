// Importación de los servicios necesarios
const authService = require('../services/auth.service'); // Servicio para manejar la lógica de autenticacion

// Controlador para el inicio de sesión
exports.login = async (req, res) => {  // "req" contiene la solicitud del cliente con sus datos y "res" sirve para enviar respuestas ha esa solicitud
    const { email, password } = req.body; // el "req.body" contiene los datos enviados por el cliente
    try{ 
        const token = await authService.loginUser(email, password);
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (err) { 
        res.status(400).json({ message: err.message});
    }
};
