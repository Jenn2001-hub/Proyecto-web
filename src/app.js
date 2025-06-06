const express = require('express');
const cors = require('cors'); //habilita el acceso a la API
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');

const app = express();

// Middleware para parsear JSON (debe estar antes de las rutas)
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200', 
  methods: ['GET', 'POST', 'PUT', 'DELETE']  
}));


// Definir las rutas de la API
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', projectRoutes);

module.exports = app;