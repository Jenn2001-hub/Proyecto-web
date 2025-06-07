const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


// Define el modelo usuarios_proyectos en la base de datos
const userProject = sequelize.define('usuarios_proyectos', {
    usuario_id: {type: DataTypes.INTEGER, allowNull: false,                 
        references: { model: 'usuarios', key: 'id' }
    },
    proyecto_id: {type: DataTypes.INTEGER, allowNull: false,                 
        references: { model: 'proyectos', key: 'id'}
    }
}, {
    timestamps: false, 
    tableName: 'usuarios_proyectos' // asigna el nombre exacto de la tabla en la base de datos
});

// Exporta el modelo para ser utilizado en otros archivos
module.exports = userProject;