// Importación de dependencias
const User = require('../models/user.model'); // Modelo para interactuar con la tabla de usuarios
const bcrypt = require('bcryptjs'); // Biblioteca para encriptar contraseñas
const Role = require('../models/role');

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
        });
        // Retorna el usuario creado
        return newUser;
    } catch (err) {
        // Lanza un error con el mensaje correspondiente si falla la creación
        throw new Error(`Error al crear el usuario: ${err.message}`);
    }
};

// Función para obtener todos los usuarios de un administrador
exports.getAllUsersByAdministradorId = async (administrador_id, email) => {
    try {
         // whereClause para filtrar los usuarios
        const whereClause = { administrador_id };
        if (email) {
            whereClause.email = email;
        }
        //busca los usuarios que cumplan con el whereClause
        const users = await User.findAll({ where: whereClause, attributes: { exclude: ['password']}});
        return users;
    } catch {err} {
        throw new Error(`Error al obtenernlos usuarios: ${err.message}`);
    }
};

// Función para obtener un usuario por su ID
exports.getAllUsersByRolId = async (rol_id) => {
    try {
        const users = await User.findAll({ where: {rol_id}, attributes: { exclude: ['password']}});// se excluye la contraseña para no compromenter datos sensibles
        return users;
    } catch (err) {
        throw new Error(`Error al obtener  los usuarios: ${err.message}`);
    }
};

// Función para actualizar un usuario
exports.updateUser = async (id, nombre, email, rol_id) => {
    try {
        const user = await User.findByPk(id);
        
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (email && email !== user.email) {
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                throw new Error('El email ya está en uso');
            }
        }

        await user.update({
            nombre,
            email,
            rol_id
        });

        return user;
    } catch (err) {
        throw new Error(`Error al actualizar el usuario: ${err.message}`);
    }
};


// Función para eliminar un usuario
exports.deleteUser = async (userId) => { // Exportamos la función deleteUser
    try {
        const user = await User.findByPk(userId); // Buscamos el usuario por su ID
        
        if (!user) { // Si no existe...
            throw new Error('Usuario no encontrado'); // Lanzamos un error
        }

        await user.destroy(); // Eliminamos el usuario
        return { 
            success: true, // Indicamos que todo salió bien
            message: 'Usuario eliminado con éxito' 
        };

    } catch (err) {
        throw new Error(`Error al eliminar el usuario: ${err.message}`); // Lanzamos un error si algo falla
    }
};

exports.getUserById = async (userId) => { 
    const user = await User.findByPk(userId, { 
        attributes: ['id', 'nombre', 'email', 'rol_id'], 
        raw: true
    });
    if (!user) { 
        throw new Error("Usuario no encontrado"); 
    }
    return user; 
};