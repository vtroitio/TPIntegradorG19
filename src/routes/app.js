const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/sequelize');
const productRoutes = require('./routes/products');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productRoutes);

sequelize.sync()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
