// Importación de dependencias
const bcrypt = require('bcrypt'); // Biblioteca para encriptar y comparar contraseñas
const jwt = require('jsonwebtoken'); // Biblioteca para generar y verificar JSON Web Tokens
const User = require('../models/user.models'); // Modelo de usuario para interactuar con la base de datos

// Imprime el modelo User en la consola para depuración
console.log('Modelo User importado:', User); // Depuración

// Función para autenticar a un usuario
const loginUser = async (email, password) => {
    // Imprime los valores recibidos para depuración
    console.log('auth.service.js - Email recibido:', email); // Depuración
    console.log('auth.service.js - Password recibido:', password); // Depuración

    // Validación: verifica si el email está definido
    if (!email) {
        throw new Error('email is not defined'); // Lanza error si falta el email
    }
    // Validación: verifica si la contraseña está definida
    if (!password) {
        throw new Error('password is not defined'); // Lanza error si falta la contraseña
    }

    // Busca un usuario en la base de datos por su email
    const user = await User.findOne({ where: { email } });
    // Imprime el usuario encontrado para depuración
    console.log('auth.service.js - Usuario encontrado:', user); // Depuración

    // Validación: verifica si el usuario existe
    if (!user) {
        throw new Error('Usuario no encontrado'); // Lanza error si no se encuentra el usuario
    }

    // Compara la contraseña proporcionada con la almacenada (encriptada)
    const isMatch = await bcrypt.compare(password, user.password);
    // Validación: verifica si las contraseñas coinciden
    if (!isMatch) {
        throw new Error('Contraseña incorrecta'); // Lanza error si la contraseña es incorrecta
    }

    // Genera un token JWT con los datos del usuario
    const token = jwt.sign(
        { id: user.id, email: user.email, rol_id: user.rol_id }, // Payload: datos incluidos en el token
        process.env.JWT_SECRET, // Clave secreta para firmar el token
        { expiresIn: '1h' } // Tiempo de expiración del token (1 hora)
    );

    // Retorna el token generado
    return token;
};

// Exporta la función para su uso en otros módulos
module.exports = { loginUser };

module.exports = { loginUser };