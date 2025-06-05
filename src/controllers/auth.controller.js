// Importación de los servicios necesarios
const authService = require('../services/auth.service'); // Servicio para manejar la lógica de autenticacion
const User = require('../models/user.model');
const Role = require('../models/role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controlador para el inicio de sesión
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        const token = jwt.sign({ id: user.id, rol_id: user.rol_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controlador para el registro de usuarios
exports.register = async (req, res) => {
    try {
        const { nombre, email, password, rol_id } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ nombre, email, password: hashedPassword, rol_id });
        res.status(201).json({ message: 'Usuario registrado', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            include: [{ model: Role, attributes: ['nombre'] }]
        });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json({ message: 'Usuario encontrado', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};