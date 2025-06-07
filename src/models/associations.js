// Importamos los modelos de usuario, proyecto y el de usarios-proyectos
const User = require('./user.model');
const Project = require('./project.model');
const UserProject = require('./userProject.model');

// Relación muchos a muchos entre User y Project a través de la tabla intermedia UserProject
User.belongsToMany(Project, {
    through: UserProject,
    foreignKey: 'usuario_id',  // Asegúrate que coincida con tu modelo
    otherKey: 'proyecto_id',
    as: 'proyectos'
});

Project.belongsToMany(User, {
    through: UserProject,
    foreignKey: 'proyecto_id',  // Asegúrate que coincida con tu modelo
    otherKey: 'usuario_id',
    as: 'usuarios'
});

// Relacion de un proyecto con el administrador
Project.belongsTo(User, {
    foreignKey: 'administrador_id', // Clave foránea en la tabla Project 
    as: 'administrador'             // nombre para acceder al administrador de un proyecto
});

// Exporta los modelos para ser utilizados en otros archivos
module.exports = { User, Project, UserProject };