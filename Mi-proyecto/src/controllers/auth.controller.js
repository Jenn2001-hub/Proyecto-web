// importamos el servicio de auntenticacion
const authService = require('../services/auth.service');

// Controlador para el Inicio sesión
exports.login = async (req, res) => {  // "req" contiene la solicitud del cliente con sus datos y "res" sirve para enviar respuestas ha esa solicitud
    const { email, password } = req.body; // el "req.body" contiene los datos enviados por el cliente
    try{ // "try" Si no hay problema con la solicitud
        const token = await authService.loginUser(email, password);
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (err) { // "catch" Si hay problema con la solicitud
        res.status(400).json({ message: err.message});
    }
};