const express = require('express');
const bcrypt = require('bcryptjs');
const connection = require('../../db');



const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO usuarios (email, password) VALUES (?, ?)';
        connection.query(query, [email, hashedPassword], (err, results) => {
            if (err) throw err;
            res.status(201).json({ message: 'Usuario registrado' });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Inicio de sesión
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    connection.query('SELECT * FROM usuarios WHERE email = ?', [email], async (error, results) => {
        if (error) throw error;

        if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.status(401).json({ message: 'El correo y/o la contraseña son incorrectos' });
        } else {
            req.session.user_id = results[0].id;
            req.session.user_email = results[0].email;
            req.session.user_role = results[0].role; 
            return res.status(200).json({ message: 'Login successful', role: results[0].role });
        }
    });
});

// Cerrar sesión
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;
