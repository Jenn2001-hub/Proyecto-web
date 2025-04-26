const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define el modelomroles_permisos en la base de datos
const RolePermission = sequelize.define('roles_permisos', {
    rol_id: {
        type: DataTypes.INTEGER,          
        allowNull: false,                 
        references: { // Clave foránea
            model: 'roles', // Referencia a la tabla roles
            key: 'id' // Referencia a la columna id
        }
    },
    permisos_id: {
        type: DataTypes.INTEGER,          
        allowNull: false,                 
        references: {                     
            model: 'permisos', // Referencia a la tabla permisos
            key: 'id' // Referencia a la columna id
        }
    }
}, {
    timestamps: false                    
});

// Exporta el modelo para ser utilizado en otros archivos.
module.exports = RolePermission;         