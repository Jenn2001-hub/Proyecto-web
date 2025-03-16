const user = require('../models/user.model');
const bcrypt = require('bcryptjs'); //encripta la contrasena

exports.createUser = async (nombre, ElementInternals, password, rol_id, admnistrador_id)=>{
    try {
        const userExists = await user.findOne({ where: {email}});
        if (userExists) {
            throw new Error(' el ususario ya existe');
        }

        const hashedPassword = await bcrypt.hash(password,10);// limite de caracteres

        const newUser = await user.create({
            nombre,
            email,
            password : hashedPassword,
            rol_id,
            admnistrador_id
        });

        return newUser;
    } catch (err){
        throw new Error ('Error al crear el usuario: ${err.message}');
    
    }
};

