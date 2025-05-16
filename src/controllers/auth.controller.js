// Importación de los servicios necesarios
const authService = require('../services/auth.service'); // Servicio para manejar la lógica de autenticacion

// Controlador para el inicio de sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await authService.loginUser(email, password);
        console.log(token)
        res.status(200).json({ message: 'inicio de sesión exitoso', token });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

// Controlador para el registro de usuarios
exports.register = async (req, res) => {
    try {
        // Extrae los campos necesarios del cuerpo de la solicitud
        const { nombre, email, password, rol_id, administrador_id } = req.body;
        // Validación: verifica que los campos obligatorios estén presentes
        if (!nombre || !email || !password || !rol_id) {
            return res.status(400).json({ message: 'Faltan datos requeridos' }); // Respuesta de error si faltan datos
        }
        // Crea un nuevo usuario usando el servicio de usuarios
        const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id);
        // Respuesta exitosa con los datos del nuevo usuario
        res.status(201).json({ message: 'Registro de usuario exitoso', user: newUser });
    } catch (err) {
        // Manejo de errores: devuelve un mensaje de error si falla el registro
        res.status(500).json({ message: err.message || 'Error al registrar el usuario' });
    }
};