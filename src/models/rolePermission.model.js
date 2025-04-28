const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define el modelomroles_permisos en la base de datos
const RolePermission = sequelize.define('roles_permisos', {
    rol_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'roles', key: 'id' }},
    permiso_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'permisos', key: 'id' }}
}, {
    timestamps: false,
    tableName: 'roles_permisos',                    
});

// Exporta el modelo para ser utilizado en otros archivos.
module.exports = RolePermission;         