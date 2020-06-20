/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Service_Inventory', {
    inventory_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    service_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Service_Credential',
        key: 'service_id'
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
    limit: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    tableName: 'Service_Inventory',
    timestamps: false
  });
};
