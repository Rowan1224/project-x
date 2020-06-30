/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Orders', {
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Customer_Credential',
        key: 'customer_id'
      }
    },
    service_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Service_Credential',
        key: 'service_id'
      }
    },
    employee_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    delivered: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    order_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    customer_address_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    payment: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    tableName: 'Orders',
    timestamps: false
  });
};
