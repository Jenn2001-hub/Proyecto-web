const dotenv = require('dotenv'); // Importa dotenv para usar variables de entorno

dotenv.config(); // Carga variables del archivo .env

// Exporta un objeto con las variables de entorno necesarias
module.exports = {
    PORT: process.env.PORT, // Puerto del servidor
    DB_NAME: process.env.DB_NAME, // Nombre de la base de datos
    DB_USER: process.env.DB_USER, // Usuario de la base de datos
    DB_PASSWORD: process.env.DB_PASSWORD, // Contraseña de la base de datos
    DB_HOST: process.env.DB_HOST, // Dirección del servidor de la base de datos
    DB_PORT: process.env.DB_PORT, // Puerto de la base de datos
    JWT_SECRET: process.env.JWT_SECRET, // Clave secreta para JWT (autenticación)
};