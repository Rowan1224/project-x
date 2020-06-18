/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Universal_Product_List', {
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    measure: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    company_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vat: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    tableName: 'Universal_Product_List'
  });
};
