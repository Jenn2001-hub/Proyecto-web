const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.models');

// Define el modelo proyectos en la base de datos
const Proyect = sequelize.define('proyects', {
    id: { 
        type: DataTypes.INTEGER,          
        primaryKey: true, // Clave primaria
        autoIncrement: true               
    },
    nombre: { 
        type: DataTypes.STRING,           
        allowNull: false                  
    },
    descripcion: { 
        type: DataTypes.STRING,           
        allowNull: false                  
    },
    fecha_creacion: {
        type: DataTypes.DATE,             
        allowNull: false,                 
        defaultValue: DataTypes.NOW // Valor predeterminado, fecha y hora actual
    },
    administrador_id: {
        type: DataTypes.INTEGER,         
        allowNull: false, 
        field: 'administrador_id',            
        references: {  // Clave foranea
            model: User, // Referencia al modelo 'User'
            key: 'id' // Referencia a la columna 'id'
        }
    }
}, {
    timestamps: false,                    
    tableName: 'proyectos',               // asigna el nombre de la tabla en la base de datos
    hooks: {
        afterCreate: (project, options) => { // Hook que se ejecuta despues de crear un proyecto
            if (project.fecha_creacion) {    // Ajusta la zona horaria restando 5 horas
                project.fecha_creacion.setHours(project.fecha_creacion.getHours() - 5);
            }
        }
    }
});

module.exports = Proyect;