// Importar el modelo de usuario y la biblioteca bcryptjs para cifrar contraseñas
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// Exportamos el servicio para crear usuarios
exports.createUser = async (nombre, email, password, rol_id, administrador_id) => {
    try {
        // verifica que el usuario no exista antes de continuar
        const userExists = await User.findOne({ where: {email}}); // El findOne es un modelo que se utiliza con sequelize. 
        if (userExists) {
            throw new Error('El usuario ya existe');
        }
        // se cifra la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        // se crea el usuario
        const newUser = await User.create({
            nombre,
            email,
            password: hashedPassword,
            rol_id,
            administrador_id
        });

        return newUser;// devuelve el usuario creado
    } catch (err) {
        console.error(err); // Agrega este console.log para ver el error
        throw new Error(`Error al crear el usuario: ${err.message}`);
    }
};

// Se exporta el servicio para obtener todos los usuarios de un administrador
exports.getAllUsersByAdministradorId = async (administrador_id, nombre, email) => {
    try {
         // whereClause para filtrar los usuarios
        const whereClause = { administrador_id };
        if (nombre) {
            whereClause.nombre = nombre;
        }
        if (email) {
            whereClause.email = email;
        }
        //buscams los usuarios que cumplan con el whereClause
        const users = await User.findAll({ where: whereClause, attributes: { exclude: ['password']}});
        return users;
    } catch {err} {
        throw new Error(`Error al obtenernlos usuarios: ${err.message}`);
    }
};

// va a obtener la lista de usuarios que tienen  un rol en especifico y se exporta el servicio
exports.getAllUsersByRolId = async (rol_id) => {
    try {
        const users = await User.findAll({ 
            where: {rol_id}, 
            attributes: { exclude: ['password']}
        });
        return users;
    } catch (err) {
        throw new Error(`Error al obtener  los usuarios: ${err.message}`);
    }
};

exports.getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] } // Excluye la contraseña
    });
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    
    return user;
  } catch (error) {
    throw new Error(`Error al buscar el usuario: ${error.message}`);
  }
};

// Se exporta el servicio para actualizar usuarios
exports.updateUser = async (id, nombre, email, rol_id, administrador_id, admin_from_token) => {
    try {
        const user = await User.findByPk(id); // va a hacer la busqueda por id || await para que complete la operacion antes de continuar
        if (user.administrador_id !== admin_from_token) {
            throw new Error('Acceso denegado, este usuario no esta bajo su administración');
        }

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (email && email !== user.email) { // va a verificar si el email es el mismo que tenia 
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

        return user;
    } catch (err) {
        throw new Error(`${err.message}`);
    }
};

// Se exporta el servicio para eliminar usuarios
exports.deleteUser = async (id, admin_from_token) => {
    try {
        const user = await User.findByPk(id);
        if (user.administrador_id !== admin_from_token) { //primero verifica que si pueda eliminarlo
            throw new Error('Acceso denegado, este ususario no esta bajo su administración');
        }

        //Verifica que el usuario exista
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        await user.destroy();//Elimina el usuario
        return { message: 'Usuario eliminado con éxito'};
    }catch (err) {
        throw new Error(`Error al eliminar el usuario: ${err.message}`);
    }
};