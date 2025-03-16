const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../config/db'); // Importa instancia de Sequelize

// Define el modelo de roles
const roles = sequelize.define('roles', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // ID único
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true }, // Nombre del rol
});

module.exports = roles; // Exporta modelo