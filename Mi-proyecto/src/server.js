const sequelize = require('./config/db'); // Importa conexión a la base de datos
const app = require('./app'); // Importa la aplicación Express
const dotenv = require('dotenv'); // Importa dotenv para variables de entorno
require('./models/associations'); // Importa asociaciones de modelos

dotenv.config(); // Carga variables de entorno

const PORT = process.env.PORT || 3000; // Define el puerto del servidor

// Conecta a la base de datos y arranca el servidor
sequelize.authenticate()
    .then(() => {
        console.log('Conectado a PostgreSQL con Sequelize'); // Mensaje de conexión exitosa
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`); // Mensaje de servidor iniciado
        });
    })
    .catch(err => console.error('Error conectando a la base de datos:', err)); // Maneja errores de conexión

// Sincroniza la base de datos
sequelize.sync({ force: false })
    .then(() => console.log('Base de datos sincronizada')) // Mensaje de sincronización exitosa
    .catch(err => console.error('Error al sincronizar la base de datos:', err)); // Maneja errores de sincronización
