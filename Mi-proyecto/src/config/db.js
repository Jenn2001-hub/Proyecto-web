// Importa Sequelize para interactuar con la base de datos
const { Sequelize } = require("sequelize");

// Importa dotenv para usar variables de entorno
const dotenv = require('dotenv');
dotenv.config(); // Cargar variables del archivo .env

// Crea conexión a la base de datos PostgreSQL
const sequelize = new Sequelize(
    process.env.DB_NAME,  // Nombre de la base de datos
    process.env.DB_USER,  // Usuario de la base de datos
    process.env.BD_PASSWORD,  // Contraseña de la base de datos
    {
        host: process.env.DB_HOST,  // Dirección del servidor
        dialect: 'postgres',  // Tipo de base de datos
        port: process.env.DB_PORT,  // Puerto de la base de datos
        logging: false,  // Desactivar logs en consola
        timezone: '-05:00'  // Zona horaria
    }
);

// Exporta la conexión para usarla en otros archivos
module.exports = sequelize;