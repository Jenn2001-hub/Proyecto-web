const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../config/db'); // Importa instancia de Sequelize

// Define el modelo de usuarios_proyectos
const userProject = sequelize.define('usuarios_proyectos', {
    usuario_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'usuarios', key: 'id' } }, // ID del usuario
    proyecto_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'proyectos', key: 'id' } } // ID del proyecto
}, {
    timestamps: false, // Desactiva timestamps
    tableName: 'usuarios_proyectos', // Nombre de la tabla en la base de datos
});

module.exports = userProject; // Exporta modelo