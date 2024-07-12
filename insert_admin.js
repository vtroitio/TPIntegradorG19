import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config();
const bcrypt = require('bcryptjs');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');

    const email = 'zfatima766@gmail.com';
    const password = 'adminPassword123';
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const query = 'INSERT INTO usuarios (email, password, role) VALUES (?, ?, ?)';
    connection.query(query, [email, hashedPassword, 'admin'], (err, results) => {
        if (err) throw err;
        console.log('Administrador insertado');
        connection.end();
    });
});
