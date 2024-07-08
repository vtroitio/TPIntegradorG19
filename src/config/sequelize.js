const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mouny2023_alwaysdata', 'mouny2023', 'GRUPO19', {
  host: 'mysql-mouny2023.alwaysdata.net',
  dialect: 'mysql'
});

module.exports = sequelize;
