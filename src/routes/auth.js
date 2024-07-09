const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const connection = require('../db'); 

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', (req, res) => {
    connection.query('SELECT * FROM usuarios WHERE email = ?', [req.body.email], async (error, results) => {
        if (error) throw error;

        if (results.length === 0 || !(await bcryptjs.compare(req.body.password, results[0].password))) {
            res.send('El correo y/o la contraseña son incorrectos');
        } else {
            req.session.user_id = results[0].id;
            req.session.user_email = results[0].email;

            res.redirect('/');
        }
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;
