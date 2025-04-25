// Asegúrate de usar esta estructura exacta
const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: console.log, // Habilita temporalmente para debugging
    define: {
      timestamps: false
    }
  }
);

// Verificación de conexión inmediata
db.authenticate()
  .then(() => console.log('✅ Conexión a PostgreSQL establecida'))
  .catch(err => console.error('❌ Error de conexión:', err));

module.exports = db; // Exporta DIRECTAMENTE la instancia