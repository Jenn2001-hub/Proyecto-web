const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const permission = sequelize.define('permisos',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: { type: DataTypes.STRING, allowNull:  false, unique: true },
});

module.exports = permission;