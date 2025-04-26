// Importación de los servicios necesarios
const authService = require('../services/auth.service'); // Servicio para manejar la lógica de autenticación
const userService = require('../services/user.service'); // Servicio para manejar la lógica de usuarios

// Controlador para el inicio de sesión
exports.login = async (req, res) => {
    // Imprime el cuerpo de la solicitud en la consola para depuración
    console.log('Cuerpo de la solicitud:', req.body); 

    // Extrae los campos email y password del cuerpo de la solicitud
    const { email, password } = req.body;

    // Validación: verifica si el campo email está presente
    if (!email) {
        return res.status(400).json({ message: 'Debe ' }); // Respuesta de error si falta email
    }
    // Validación: verifica si el campo password está presente
    if (!password) {
        return res.status(400).json({ message: 'El campo password es requerido' }); // Respuesta de error si falta password
    }

    try {
        // Intenta autenticar al usuario usando el servicio de autenticación
        const token = await authService.loginUser(email, password); // Genera un token si las credenciales son válidas
        // Respuesta exitosa con el token
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (err) {
        // Manejo de errores: devuelve un mensaje de error si falla la autenticación
        res.status(400).json({ message: err.message || 'Error al iniciar sesión' });
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
        res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser });
    } catch (err) {
        // Manejo de errores: devuelve un mensaje de error si falla el registro
        res.status(500).json({ message: err.message || 'Error al registrar el usuario' });
    }
};