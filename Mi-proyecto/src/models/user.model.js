const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../config/db'); // Importa instancia de Sequelize

// Define el modelo de usuarios
const USER = sequelize.define('usuarios', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // ID único
    nombre: { type: DataTypes.STRING, allowNull: false }, // Nombre del usuario
    email: { type: DataTypes.STRING, allowNull: false, unique: true }, // Email del usuario
    password: { type: DataTypes.STRING, allowNull: false }, // Contraseña del usuario
    rol_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'roles', key: 'id' } }, // ID del rol
    administrador_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'usuarios', key: 'id' } } // ID del administrador
}, {
    timestamps: false, // Desactiva timestamps
    tableName: 'usuarios', // Nombre de la tabla en la base de datos
});

module.exports = USER; // Exporta modelo