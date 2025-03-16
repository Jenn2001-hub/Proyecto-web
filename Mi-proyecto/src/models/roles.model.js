const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const roles = sequelize.define('roles',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: { type: DataTypes.STRING, allowNull:  false, unique: true },
});

module.exports = roles;