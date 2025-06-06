// Importación de dependencias
const sequelize = require('./config/db');
const app = require('./app');
const dotenv = require('dotenv'); // cargar variables de entorno

dotenv.config();
require('./models/associations'); // Carga las asociaciones entre modelos

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log('Conectado a PostgreSQL con Sequalize');
        app.listen(PORT, () => {
            console.log('Servidor corriendo en http://localhost:${PORT}');
        });
    })
    .catch(err => console.error('Error conectando a la base de datos:', err));

sequelize.sync({ force: false }).then(() => {
    console.log('Base de datos sincronizada');
}).catch(err => {
    console.error('Error al sincronizar la base de datos', err);
});
