const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const user = require('./user.model');

const Project = sequelize.define('proyectos',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: { type: DataTypes.STRING, allowNull:  false },
    descripcion: { type: DataTypes.STRING, allowNull:  false },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false, 
        defaultValue: DataTypes.NOW
    },
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: user, key: 'id'}
    }
},{
    timestamps: false, 
    tableName: 'proyects',
    hooks: {
        afterCreate : (project, options) =>{
            if (project.fecha_creation){
                project.fecha_creacion.setHours(project.fecha_creacion.getHours() -5);
            }
        }
    }
});

module.exports = Proyect;