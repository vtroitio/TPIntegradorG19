const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/User');

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user || !(await bcryptjs.compare(req.body.password, user.password))) {
            return res.status(401).send('El correo y/o la contraseña son incorrectos');
        }

        req.session.user_id = user.id;
        req.session.user_email = user.email;
        res.status(200).send('Login successful');
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
});

router.post('/register', async (req, res) => {
    try {
        const hash = await bcryptjs.hash(req.body.password, 8);
        await User.create({ email: req.body.email, password: hash });
        res.status(200).send('Registration successful');
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;
