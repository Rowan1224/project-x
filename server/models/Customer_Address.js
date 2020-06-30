/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Customer_Address', {
    customer_add_id: {
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
    road_no: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    house_no: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    area_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Area_Details',
        key: 'area_id'
      }
    },
    further_description: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    tableName: 'Customer_Address',
    timestamps: false
  });
};
