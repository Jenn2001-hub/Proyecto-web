const sequelize = require('../config/database');

// Importa todos los modelos
const models = {
  User: require('./user.model')(sequelize),
  Role: require('./role.model')(sequelize),
  Permission: require('./permission.model')(sequelize),
  RolePermission: require('./rolePermission.model')(sequelize)
};

// Establece relaciones
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = {
  ...models,
  sequelize
};