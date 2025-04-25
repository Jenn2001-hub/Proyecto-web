const { sequelize } = require('./models');

async function startServer() {
  try {
    // Sincronización segura (usar {force: true} solo en desarrollo)
    await sequelize.sync({ alter: true });
    console.log('🔄 Modelos sincronizados');
    
    app.listen(3000, () => {
      console.log('🚀 Servidor en http://localhost:3000');
    });
  } catch (error) {
    console.error('❌ Error de inicio:', error);
    process.exit(1);
  }
}

startServer();