const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv'); 
const User = require('../models/user.model');
const RolePermission = require('../models/rolePermission.model');

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET; 

exports.loginUser = async (email, password) => {
    try{
        // verifica que el usuario existe
        const user = await User.findOne({ where:{email: email} }); 
        console.log(user)
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        //verificar si la contraseña es correcta 
        const hashedPassword = await bcrypt.hash(password, 10);
        const isPasswordValid = await bcrypt.compare(hashedPassword, user.password)
        if (isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }

        // Consultar permisos de rol
        const rolePermission = await RolePermission.findAll({
            where: { rol_id: user.rol_id },
            attributes: ['permiso_id']
        });

        const permisos = rolePermission.map(rp => rp.permiso_id);

        // Generar un token JWT
        const token = jwt.sign(
            { id: user.id, nombre: user.nombre, email: user.email, rol_id: user.rol_id, permisos },
            SECRET_KEY,
                {expiresIn: '1h'}
        );

        return token;
    } catch (error) {
        throw new Error(error.message || 'Error al iniciar sesión');
    }
};