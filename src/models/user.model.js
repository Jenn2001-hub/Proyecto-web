const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// define el modelo usuarios en la base de datos.
const User = sequelize.define('usuarios', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true }, // "unique" que debe ser única :)
    password: { type: DataTypes.STRING, allowNull: false },
    rol_id: {type: DataTypes.INTEGER, allowNull: false, 
        references: { model: 'roles', key: 'id' }},
    administrador_id: {type: DataTypes.INTEGER, allowNull: true, field: 'administrador_id',              
        references: { model: 'usuarios', key: 'id'}
    }
}, {
    timestamps: false,                   
    tableName: 'usuarios' // asigna el nombre a la tabla en la base de datos
});


module.exports = User;