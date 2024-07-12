import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './src/config/sequelize.js';
import authRouter from './src/routes/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const MySQLStoreSession = MySQLStore(session);
const sessionStore = new MySQLStoreSession({}, sequelize);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));

app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
