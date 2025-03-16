const user = require('../models/user.model'); // Importa modelo de usuario
const bcrypt = require('bcryptjs'); // Importa bcrypt para encriptar contraseñas

// Función para crear un usuario
exports.createUser = async (nombre, email, password, rol_id, administrador_id) => {
    try {
        const userExists = await user.findOne({ where: { email } }); // Verifica si el usuario ya existe
        if (userExists) throw new Error('El usuario ya existe'); // Lanza error si existe

        const hashedPassword = await bcrypt.hash(password, 10); // Encripta la contraseña

        const newUser = await user.create({ // Crea el usuario en la base de datos
            nombre,
            email,
            password: hashedPassword,
            rol_id,
            administrador_id
        });

        return newUser; // Retorna el nuevo usuario
    } catch (err) {
        throw new Error(`Error al crear el usuario: ${err.message}`); // Maneja errores
    }
};
