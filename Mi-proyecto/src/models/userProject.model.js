const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const userProject = sequelize.define('usuarios_proyectos',  {
    usuario_id: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references:{ model: 'usuarios', key: 'id'}
    },
    proyecto_id: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references:{ model: 'proyectos', key: 'id'}
    }
},{
    timestamps: false,
    tableName: 'usuarios_proyectos',
});

module.exports = userProject;