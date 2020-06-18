
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME|| 'project_x', process.env.DB_USER||'root', process.env.DB_PASS||'', {
  dialect: 'mysql',
  host: process.env.DB_CONNECTION || 'localhost',
  timestamps: false,
  dialectOptions: {
    socketPath:process.env.DB_CONNECTION
},
})

sequelize.import('../models/Area_Details');
sequelize.import('../models/Customer_Address');
sequelize.import('../models/Customer_Credential');
sequelize.import('../models/Employee');
sequelize.import('../models/Order');
sequelize.import('../models/Order_details');
sequelize.import('../models/Service_Area');
sequelize.import('../models/Service_Credential');
sequelize.import('../models/Service_Inventory');
sequelize.import('../models/Universal_Product_List');

//const sequelize = new Sequelize('project_x','root','',{dialect: 'mysql',host: 'localhost'});

module.exports = sequelize;
