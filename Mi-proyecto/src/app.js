const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Middleware de logging recomendado
const helmet = require('helmet'); // Seguridad básica
const app = express();

// Middlewares básicos
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logs de las peticiones

// Importar rutas
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');

// Configuración de rutas (corregido el prefijo)
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/projects', projectRoutes);

// Ruta de prueba
app.get('/api/v1/healthcheck', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API funcionando' });
});

// Manejo de errores 404
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo centralizado de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

module.exports = app;