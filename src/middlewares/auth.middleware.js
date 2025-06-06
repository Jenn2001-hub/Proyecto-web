const jwt = require('jsonwebtoken'); // Biblioteca para manejar JSON Web Tokens
const dotenv = require('dotenv'); // Biblioteca para cargar variables de entorno
const { ROLES } = require('../utils/constants');
dotenv.config(); 

// Obtiene la clave secreta para firmar/verificar JWT desde las variables de entorno
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware para autenticar tokens JWT
const authenticateToken = (req, res, next) => {
    console.log('Middleware authenticateToken ejecutado'); // Depuración
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, no se proporcionó un token'});
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token no valido' });
        }
        req.user = user;
        console.log('Token verificado correctamente'); // Depuración
        next();
    });
};

const checkRole = (roles) => {
    return (req, res, next) => {
        const { rol_id } = req.user; // Extraemos el rol del token decodificado
        console.log(`Rol del usuario: ${rol_id}`); // Depuración
        console.log(`Roles permitidos:`, roles);
        if (!roles.includes(rol_id)) { // Comprobamos si el rol está permitido
            return res.status(403).json({ message: 'Acceso denegado, no tienes permiso para realizar esta acción',
                details:{
                    userRole:rol_id,
                    allowedRoles: roles
                }
            });
        }

        next(); // Si tiene permiso, continuamos
    };
};

// Exporta los middlewares para su uso
module.exports = {
    authenticateToken,
    checkRole
};