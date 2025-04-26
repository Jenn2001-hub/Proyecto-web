const { Sequelize } = require('sequelize');


console.log('DB_PASSWORD:', process.env.DB_PASSWORD, 'Type:', typeof process.env.DB_PASSWORD);
// Crear una nueva instancia de Sequelize usando las variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, // Desactiva los logs de consultas SQL
    timezone: '-05:00' // Ajusta la zona horaria si es necesario
  }
);
// depuracion conexion con la base de datos 
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = sequelize;