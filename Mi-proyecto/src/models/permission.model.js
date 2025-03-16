const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../config/db'); // Importa instancia de Sequelize

// DefinE el modelo de permisos
const permission = sequelize.define('permisos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // ID único
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true }, // Nombre del permiso
});

module.exports = permission; // Exporta modelo