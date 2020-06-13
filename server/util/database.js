
const Sequelize = require('sequelize');

const sequelize = new Sequelize('project_x','root','',{dialect: 'mysql',host: 'localhost'});

module.exports = sequelize;
