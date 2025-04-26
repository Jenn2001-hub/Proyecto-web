const express = require('express');
const authRoutes = require('../routes/auth.routes');
const userRoutes = require('../routes/user.routes');
const projectRoutes = require('../routes/project.routes');
const errorHandler = require('../middlewares/error.middleware');

const app = express();

// Middleware para parsear JSON (debe estar antes de las rutas)
app.use(express.json());

// Definir las rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// Ruta por defecto para la raíz
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Bienvenido a la API de Gestión de Proyectos',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      projects: '/api/projects'
    }
  });
});

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware de manejo de errores
app.use(errorHandler);

module.exports = app;