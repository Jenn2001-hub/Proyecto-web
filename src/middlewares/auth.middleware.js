// Importación de dependencias
const jwt = require('jsonwebtoken'); // Biblioteca para manejar JSON Web Tokens
const dotenv = require('dotenv'); // Biblioteca para cargar variables de entorno
const path = require('path'); // Módulo para manejar rutas de archivos

// Carga las variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') }); // Resuelve la ruta al archivo .env

// Obtiene la clave secreta para firmar/verificar JWT desde las variables de entorno
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware para autenticar tokens JWT
const authenticateToken = (req, res, next) => {
    // Extrae el token del encabezado Authorization (formato: Bearer <token>)
    const token = req.header('Authorization')?.split(' ')[1];
    // Validación: verifica si el token está presente
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, no se proporcionó un token' }); // Respuesta de error si falta el token
    }

    // Verifica la validez del token usando la clave secreta
    jwt.verify(token, SECRET_KEY, (err, user) => {
        // Manejo de errores: si el token no es válido
        if (err) {
            return res.status(403).json({ message: 'Token no válido' }); // Respuesta de error si el token es inválido
        }
        // Asigna los datos del usuario decodificados al objeto req
        req.user = user;
        // Pasa al siguiente middleware o controlador
        next();
    });
};

// Middleware para verificar roles de usuario
const checkRole = (roles) => {
    // Retorna una función middleware que recibe una lista de roles permitidos
    return (req, res, next) => {
        // Extrae el rol_id del usuario desde los datos decodificados del token
        const { rol_id } = req.user;
        // Validación: verifica si el rol del usuario está en la lista de roles permitidos
        if (!roles.includes(rol_id)) {
            return res.status(403).json({ message: 'Acceso denegado, no tienes permisos para realizar esta acción' }); // Respuesta de error si el rol no está autorizado
        }
        // Pasa al siguiente middleware o controlador
        next();
    };
};

// Exporta los middlewares para su uso en otros módulos
module.exports = {
    authenticateToken,
    checkRole,
};