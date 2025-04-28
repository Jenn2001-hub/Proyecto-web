// Importación de dependencias
const User = require('../models/user.model'); // Modelo para interactuar con la tabla de usuarios
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
exports.updateUser = async (id, nombre, email, password, rol_id, administrador_id) => {
    try {
        const user = await User.findByPk(id); // busca por id
        if (user.administrador_id !== admin_from_token) {
            throw new Error('Acceso denegado, este usuario no esta bajo su administración');
        }

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (email && email !== user.email) { // verifica si el email es el mismo que tenia 
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                throw new Error('El email ya esta en uso');
            }
        }
        await user.update({
            nombre,
            email,
            rol_id,
            administrador_id
        });
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
        if (user.administrador_id !== admin_from_token) { //primero verifica que si pueda eliminarlo
            throw new Error('Acceso denegado, este ususario no esta bajo su administración');
        }
        //Verifica que el usuario exista
        if (!user) {
            throw new Error('Usuario no encontrado');
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