// Importa los modelos necesarios para establecer las relaciones entre tablas.
//modelos usuario, proyecto y modelo de la tabla intermedia
const User = require('./user.models');       
const Project = require('./rolePermission.model');        
const UserProject = require('./userProject.model'); 

// Relación muchos a muchos entre User y Project a través de la tabla intermedia UserProject
User.belongsToMany(Project, {
    through: UserProject, // Tabla intermedia
    foreignkey: 'usuario_id', // Clave foranea en la tabla intermedia 
    as: 'proyectos' // nombre para acceder a los proyectos de un usuario
});

Project.belongsToMany(User, {
    through: UserProject,          
    foreignkey: 'proyecto_id',     
    as: 'usuarios' // nombre para acceder a los usuarios de un proyecto
});

// Relacion uno a muchos entre Project y User.
Project.belongsTo(User, {
    foreignKey: 'administrador_id', // Clave foránea en la tabla Project 
    as: 'administrador'             // nombre para acceder al administrador de un proyecto
});

// Exporta los modelos para ser utilizados en otros archivos
module.exports = { User, Project, UserProject };