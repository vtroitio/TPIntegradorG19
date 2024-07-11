const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const connection = require('../../db');

router.post('/login', (req, res) => {
    connection.query('SELECT * FROM usuarios WHERE email = ?', [req.body.email], async (error, results) => {
        if (error) throw error;

        if (results.length == 0 || !(await bcryptjs.compare(req.body.password, results[0].password))) {
            res.status(401).send('El correo y/o la contraseña son incorrectos');
        } else {
            req.session.user_id = results[0].id;
            req.session.user_email = results[0].email;
            res.status(200).send('Login successful');
        }
    });
});

router.post('/register', async (req, res) => {
    const hash = await bcryptjs.hash(req.body.password, 8);

    connection.query('INSERT INTO usuarios SET ?', { email: req.body.email, password: hash }, error => {
        if (error) throw error;
        res.status(200).send('Registration successful');
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;
