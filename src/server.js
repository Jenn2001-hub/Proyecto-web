// Importación de dependencias
const sequelize = require('./config/db');
const app = require('./app');
const dotenv = require('dotenv'); // cargar variables de entorno
const User = require('./models/user.model');
const Role = require('./models/role');

dotenv.config();
require('./models/associations'); // Carga las asociaciones entre modelos

// Define el puerto del servidor, usa BACKEND_PORT o 3000 por defecto
const PORT = process.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log('Conectado a PostgreSQL con Sequalize');
        app.listen(PORT, () => {
            console.log('Servidor corriendo en http://localhost:3000');
        });
    })
    .catch(err => console.error('Error conectando a la base de datos:', err));

sequelize.sync({ force: false }).then(() => {
    console.log('Base de datos sincronizada');
}).catch(err => {
    console.error('Error al sincronizar la base de datos', err);
});
