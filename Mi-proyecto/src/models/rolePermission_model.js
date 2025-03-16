const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../config/db'); // Importa instancia de Sequelize

// Define el modelo de roles_permisos
const RolePermission = sequelize.define('roles_permisos', {
    rol_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'roles', key: 'id' } }, // ID del rol
    permiso_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'permisos', key: 'id' } } // ID del permiso
}, {
    timestamps: false, // Desactiva timestamps
    tableName: 'roles_permisos', // Nombre de la tabla en la base de datos
});

module.exports = RolePermission; // Exporta modelo