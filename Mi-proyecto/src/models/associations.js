const user = require('./user.model');
const Project = require('./project.model');
const userProject = requre('./userProject.model');

//relacion muchos a muchos
user.belongsToMany(Project, { through: userProject, foreignKey: 'usuario_id', as: 'proyectos'});
Project.belongsToMany( user, { through: userProject, foreignKey: 'proyecto_id', as: 'usuarios'});

//reslacion de administrador
Project.belongsToMany( user, { through: userProject, foreignKey: 'administrador_id', as: 'adminstrador'});

module.exports = { user, Project, userProject};