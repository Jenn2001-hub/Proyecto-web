const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// define el modelo usuarios en la base de datos.
const User = sequelize.define('usuarios', {
    id: { 
        type: DataTypes.INTEGER,          
        primaryKey: true, // clave primaria
        autoIncrement: true               
    },
    nombre: { 
        type: DataTypes.STRING,           
        allowNull: false  // no permite valores nulos
    },
    email: { 
        type: DataTypes.STRING,          
        allowNull: false,                 
        unique: true // debe ser unico en la tabla
    },
    password: { 
        type: DataTypes.STRING,           
        allowNull: false  // no permite valores nulos
    },
    rol_id: {
        type: DataTypes.INTEGER,          
        allowNull: false,                 
        references: {  // clave foranea
            model: 'roles', // referencia a la tabla roles
            key: 'id'  // referencia a la columna id
        }
    },
    administrador_id: {
        type: DataTypes.INTEGER,         
        allowNull: true,    
        field: 'administrador_id',              
        references: {  // Clave foranea
            model: 'usuarios', // referencia a la tabla usuarios
            key: 'id' // referencia a la columna id
        }
    }
}, {
    timestamps: false,                   
    tableName: 'usuarios' // asigna el nombre a la tabla en la base de datos
});


module.exports = User;