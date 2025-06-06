const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('../models/user.model');


const Role = sequelize.define('roles', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true } // e.g., "USER", "ADMIN"
}, {
    timestamps: false,
    tableName: 'roles'
});

Role.hasMany(User, { foreignKey: 'rol_id' });
User.belongsTo(Role, { foreignKey: 'rol_id' });

module.exports = Role;