// Importamos los modelos de usuario, proyecto y el de usarios-proyectos
const User = require('./user.model');
const Project = require('./project.model');
const UserProject = require('./userProject.model');

// Relación muchos a muchos entre User y Project a través de la tabla intermedia UserProject
User.belongsToMany(Project, {
    through: UserProject, // Tabla intermedia
    foreignkey: 'usuario_id', // Clave foranea en la tabla intermedia 
    as: 'proyectos' 
});

Project.belongsToMany(User, {
    through: UserProject,          
    foreignkey: 'proyecto_id',     
    as: 'usuarios' // nombre para acceder a los usuarios de un proyecto
});

// Relacion de un proyecto con el administrador
Project.belongsTo(User, {
    foreignKey: 'administrador_id', // Clave foránea en la tabla Project 
    as: 'administrador'             // nombre para acceder al administrador de un proyecto
});

// Exporta los modelos para ser utilizados en otros archivos
module.exports = { User, Project, UserProject };