// Importación de dependencias
const User = require('../models/user.models'); // Modelo para interactuar con la tabla de usuarios
const bcrypt = require('bcryptjs'); // Biblioteca para encriptar contraseñas

// Función para crear un nuevo usuario
exports.createUser = async (nombre, email, password, rol_id, administrador_id) => {
    try {
        // Verifica si ya existe un usuario con el mismo email
        const userExists = await User.findOne({ where: { email } });
        // Validación: lanza un error si el usuario ya existe
        if (userExists) {
            throw new Error('El usuario ya existe');
        }
        // Encripta la contraseña con un factor de costo de 10
        const hashedPassword = await bcrypt.hash(password, 10);
        // Crea un nuevo usuario en la base de datos con los datos proporcionados
        const newUser = await User.create({
            nombre,
            email,
            password: hashedPassword,
            rol_id,
            administrador_id
        });
        // Retorna el usuario creado
        return newUser;
    } catch (err) {
        // Lanza un error con el mensaje correspondiente si falla la creación
        throw new Error(`Error al crear el usuario: ${err.message}`);
    }
};

// Función para obtener todos los usuarios
exports.getAllUsers = async () => {
    try {
        // Obtiene todos los usuarios de la base de datos
        return await User.findAll();
    } catch (err) {
        // Lanza un error con el mensaje correspondiente si falla la obtención
        throw new Error(`Error al obtener los usuarios: ${err.message}`);
    }
};

// Función para obtener un usuario por su ID
exports.getUserById = async (id) => {
    try {
        // Busca un usuario por su ID en la base de datos
        return await User.findByPk(id);
    } catch (err) {
        // Lanza un error con el mensaje correspondiente si falla la obtención
        throw new Error(`Error al obtener el usuario: ${err.message}`);
    }
};

// Función para actualizar un usuario
exports.updateUser = async (id, nombre, email, password, rol_id, administrador_id) => {
    try {
        // Busca el usuario por su ID
        const user = await User.findByPk(id);
        // Validación: verifica si el usuario existe
        if (!user) {
            return null; // Retorna null si no se encuentra el usuario
        }
        // Actualiza los campos proporcionados (si existen)
        if (nombre) user.nombre = nombre;
        if (email) user.email = email;
        // Encripta la nueva contraseña si se proporciona
        if (password) user.password = await bcrypt.hash(password, 10);
        if (rol_id) user.rol_id = rol_id;
        // Actualiza administrador_id si se proporciona (incluye null)
        if (administrador_id !== undefined) user.administrador_id = administrador_id;
        // Guarda los cambios en la base de datos
        await user.save();
        // Retorna el usuario actualizado
        return user;
    } catch (err) {
        // Lanza un error con el mensaje correspondiente si falla la actualización
        throw new Error(`Error al actualizar el usuario: ${err.message}`);
    }
};

// Función para eliminar un usuario
exports.deleteUser = async (id) => {
    try {
        // Busca el usuario por su ID
        const user = await User.findByPk(id);
        // Validación: verifica si el usuario existe
        if (!user) {
            return null; // Retorna null si no se encuentra el usuario
        }
        // Elimina el usuario de la base de datos
        await user.destroy();
        // Retorna true para indicar que la eliminación fue exitosa
        return true;
    } catch (err) {
        // Lanza un error con el mensaje correspondiente si falla la eliminación
        throw new Error(`Error al eliminar el usuario: ${err.message}`);
    }
};