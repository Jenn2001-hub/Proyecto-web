// Importar funciones de datos de Sequelize y tambien la instancia que se hizo en el database.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Se define el modelo de relación entre usuarios y proyectos
const UserProject = sequelize.define('usuarios_proyectos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' }
    },
    proyecto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'proyectos', key: 'id' }
    },
}, {
    timestamps: false,
    tableName: 'usuarios_proyectos',
});
// Exportamos el modelo de relación entre usuarios y proyectos
module.exports = UserProject;