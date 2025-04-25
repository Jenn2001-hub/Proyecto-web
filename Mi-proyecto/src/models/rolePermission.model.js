const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importación directa

// Verificación de instancia (debugging)
console.log('Tipo de sequelize:', typeof sequelize);
console.log('¿Define disponible?', 'define' in sequelize);

const RolePermission = sequelize.define('roles_permisos', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'roles',
      key: 'id'
    }
  },
  permission_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'permisos',
      key: 'id'
    }
  }
}, {
  tableName: 'roles_permisos',
  timestamps: false
});

module.exports = RolePermission;