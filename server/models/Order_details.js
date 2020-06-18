/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Order_details', {
    order_details_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Order',
        key: 'order_id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Universal_Product_List',
        key: 'product_id'
      }
    },
    qty: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    tableName: 'Order_details'
  });
};
