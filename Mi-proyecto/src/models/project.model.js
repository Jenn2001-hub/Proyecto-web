const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const sequelize = require('../config/db'); // Importa instancia de Sequelize
const user = require('./user.model'); // Importa modelo de usuario

// DefinE el modelo de proyectos
const Project = sequelize.define('proyectos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // ID único
    nombre: { type: DataTypes.STRING, allowNull: false }, // Nombre del proyecto
    descripcion: { type: DataTypes.STRING, allowNull: false }, // Descripción del proyecto
    fecha_creacion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }, // Fecha de creación
    administrador_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: user, key: 'id' } } // ID del administrador
}, {
    timestamps: false, // Desactiva timestamps
    tableName: 'proyectos', // Nombre de la tabla en la base de datos
    hooks: {
        afterCreate: (project) => { // Ajusta la zona horaria después de crear un proyecto
            if (project.fecha_creacion) {
                project.fecha_creacion.setHours(project.fecha_creacion.getHours() - 5);
            }
        }
    }
});

module.exports = Project; // Exporta modelo