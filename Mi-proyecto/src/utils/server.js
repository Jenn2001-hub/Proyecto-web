// Importación de dependencias
const dotenv = require('dotenv'); // Biblioteca para cargar variables de entorno
const path = require('path'); // Módulo para manejar rutas de archivos

// Carga las variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') }); // Resuelve la ruta al archivo .env

// Importación de configuraciones y modelos
const sequelize = require('../config/db'); // Instancia de Sequelize para la conexión a la base de datos
const app = require('./app'); // Aplicación Express configurada
require('../models/associations'); // Carga las asociaciones entre modelos

// Imprime las variables de entorno relacionadas con la base de datos para depuración
console.log({
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_PASSWORD_TYPE: typeof process.env.DB_PASSWORD
});

// Define el puerto del servidor, usa BACKEND_PORT o 3000 por defecto
const PORT = process.env.BACKEND_PORT || 3000;

// Función asíncrona para iniciar el servidor
async function startServer() {
    try {
        // Verifica la conexión con la base de datos
        await sequelize.authenticate();
        console.log('Conectado a PostgreSQL con Sequelize');

        // Sincroniza los modelos con la base de datos (sin forzar recreación de tablas)
        await sequelize.sync({ force: false });
        console.log('Base de datos sincronizada');

        // Inicia el servidor Express en el puerto especificado
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (err) {
        // Maneja errores de conexión o sincronización y los imprime en consola
        console.error('Error al conectar o sincronizar la base de datos:', err);
    }
}

// Ejecuta la función para iniciar el servidor
startServer();