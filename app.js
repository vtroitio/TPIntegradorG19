require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const path = require('path');
const connection = require('./db');
const app = express();
const port = 3000;

// Middleware Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session Configuration
const sessionStore = new MySQLStore({}, connection);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api/users', require('./src/routes/users'));
app.use('/auth', require('./src/routes/auth'));

// Home Route
app.get('/', (req, res) => {
    if (req.session.user_id) {
        res.redirect('/inicio');
    } else {
        res.redirect('/auth/login');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
