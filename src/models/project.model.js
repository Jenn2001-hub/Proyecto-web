const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define el modelo proyectos en la base de datos
const Project = sequelize.define('proyectos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false }, // EL "allowNull" es para indicar si la columna es nula o no, en este caso no puede ser nula
    descripcion: { type: DataTypes.STRING, allowNull: false }, 
    fecha_creacion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }, // "defaultValue" se establece automaticamente al momento de crearla
}, {
    timestamps: false,                    
    tableName: 'proyectos', // especificar el nombre de la tabla en la base de datos 
    underscored:true, //para usar columnas con guion bajo
    hooks: {
        afterCreate: (project, options) => { // Hook que se ejecuta despues de crear un proyecto
            if (project.fecha_creacion) {    // Ajusta la zona horaria restando 5 horas
                project.fecha_creacion.setHours(project.fecha_creacion.getHours() - 5);
            }
        }
    }
});

module.exports = Project;