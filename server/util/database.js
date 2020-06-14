
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME|| 'project_x', process.env.DB_USER||'root', process.env.DB_PASS||'', {
  dialect: 'mysql',
  host: process.env.DB_CONNECTION || 'localhost',
  timestamps: false,
  dialectOptions: {
    socketPath:process.env.DB_CONNECTION
},
})

//const sequelize = new Sequelize('project_x','root','',{dialect: 'mysql',host: 'localhost'});

module.exports = sequelize;
