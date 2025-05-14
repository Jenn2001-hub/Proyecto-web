const jwt = require('jsonwebtoken'); // Biblioteca para manejar JSON Web Tokens
const dotenv = require('dotenv'); // Biblioteca para cargar variables de entorno
dotenv.config(); 

// Obtiene la clave secreta para firmar/verificar JWT desde las variables de entorno
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware para autenticar tokens JWT
const authenticateToken = (req, res, next) => {
    console.log('Middleware authenticateToken ejecutado'); // Depuración
    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        console.log('No se proporcionó token'); // Depuración
        return res.status(401).json({ message: 'Acceso denegado, no se proporcionó un token'});
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.log('Error al verificar token:', err); // Depuración
            return res.status(403).json({ message: 'Token no valido' });
        }
        req.user = user;
        console.log('Token verificado correctamente'); // Depuración
        next();
    });
};

// Exporta los middlewares para su uso
module.exports = {
    authenticateToken,
};