const user = require('./user.model'); // Importa modelo de usuario
const Project = require('./project.model'); // Importa modelo de proyecto
const userProject = require('./userProject.model'); // Importa modelo de relación usuario-proyecto

// Relación muchos a muchos entre usuarios y proyectos
user.belongsToMany(Project, { through: userProject, foreignKey: 'usuario_id', as: 'proyectos' });
Project.belongsToMany(user, { through: userProject, foreignKey: 'proyecto_id', as: 'usuarios' });

// Relación de administrador en proyectos
Project.belongsTo(user, { foreignKey: 'administrador_id', as: 'administrador' });

module.exports = { user, Project, userProject }; // Exporta modelos