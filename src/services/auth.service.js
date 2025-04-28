const jwt = require('jsonwebtoken'); // Libreria "jsonwebtoken" para generar token de autenticación
const bcrypt = require('bcryptjs'); // Librería "bcryptjs" para cifrar contraseñas
const dotenv = require('dotenv'); // Variables de entornos 
// importamos el modelo user y el modelo rol permisos
const  User = require ('../models/user.model');
const RolePermisssion = require('../models/rolePermission.model');

dotenv.config();//cargar variables de entorno

const SECRET_KEY = process.env.JWT_SECRET; // Obtener la clave secreta desde las claves de entorno

exports.loginUser = async (email, password) => {
    try{
        // verifica que el ususario existe 
        const user = await User.findOne({ where: {email}}); // el findOne es un modelo que se utilliza con sequelize para buscar
        if (!user) {
            throw new Error('Usuario no encontrada');
        }
        //Verificar si la contraseña es correcta 
const isPasswordValid = await bcrypt.compare(password, user.password)
if (!isPasswordValid) {
    throw new Error('Contraseña incorrecta');
}
        // consultar permisos de rol
        const rolePermissions = await RolePermisssion.findAll({
            where: { rol_id: user.rol_id },
            attributes: ['permiso_id']
        });
        
        // Extrae los permisos del resultado
        const permisos = rolePermissions.map(rp => rp.permiso_id);
        // Generar un token JWT con los datos del usuario y sus permisos
        const token = jwt.sign(
            { id: user.id, nombre: user.nombre, email: user.email, rol_id: user.rol_id, permisos },
            SECRET_KEY,
            { expiresIn: '1h'}
        );
        console.log(token); // Verifica el valor del token
        return token;
    } catch (error) {
        throw new Error(error.message || 'Error al iniciar sesión');
    }
}