// Importar funciones de datos de Sequelize y tambien la instancia que se hizo en el database.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Se define el modelo de proyecto
const Project = sequelize.define('proyectos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false }, // EL "allowNull" es para indicar si la columna es nula o no, en este caso no puede ser nula
    descripcion: { type: DataTypes.STRING, allowNull: false }, 
    fecha_creacion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }, // "defaultValue" se establece automaticamente al momento de crearla
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' } 
    }, 
    
}, {
    timestamps: false,
    tableName: 'proyectos', // especificar el nombre de la tabla en la base de datos 
    // Lo siguiente es para organizar la hora referente zona horaria de Colombia 
    hooks: {
        afterCreate: (project, options) => {
            if (project.fecha_creacion) {
                project.fecha_creacion.setHours(project.fecha_creacion.getHours()- 5);// Se restan 5 horas para cuadrar la zona horaria
            }
        }
    }
});
// Exportamos el modelo de proyectos
module.exports = Project;